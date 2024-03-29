import dayjs from "dayjs";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const transactionsRouter = createTRPCRouter({
  getAllTransactions: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.transaction.findMany();
  }),

  getTransactionById: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const transaction = await ctx.prisma.transaction.findFirst({
        where: {
          userId: ctx.session.user.id,
          id: input,
        },
      });

      if (!transaction) throw "Bad Transaction Id";

      const budgetName =
        (await ctx.prisma.budget
          .findFirst({
            where: {
              id: transaction.budgetId,
              userId: ctx.session.user.id,
            },
          })
          .then((result) => result?.name)) || "";

      const accountName =
        (await ctx.prisma.bankAccount
          .findFirst({
            where: {
              id: transaction.accountId,
              userId: ctx.session.user.id,
            },
          })
          .then((result) => result?.name)) || "";

      return { ...transaction, budgetName, accountName };
    }),

  getThisWeeksTransactions: protectedProcedure.query(async ({ ctx }) => {
    //makes monday start of week
    const startOfWeek = dayjs().startOf("week").add(1, "day");
    const endOfWeek = dayjs().endOf("week").add(1, "day");

    const weeksTransactionData = await ctx.prisma.transaction.findMany({
      where: {
        date: {
          lte: endOfWeek.endOf("day").toISOString(),
          gte: startOfWeek.toISOString(),
        },
      },
    });

    return Promise.all(
      weeksTransactionData.map(async (transaction) => {
        const newTransaction = {
          id: transaction.id,
          amount: Number(transaction.amount),
          date: String(transaction.date),
          name: transaction.name,
          budgetId: transaction.budgetId,
          accountId: transaction.accountId,
          accountName: "",
          userName: "",
          accountUserId: transaction.userId,
          budgetName: "",
        };

        newTransaction.accountName = (await ctx.prisma.bankAccount
          .findUnique({
            where: {
              id: transaction.accountId,
            },
          })
          .then((data) => data?.name)) as string;

        newTransaction.userName = (await ctx.prisma.user
          .findUnique({
            where: {
              id: transaction.userId,
            },
          })
          .then((data) => data?.name)) as string;

        newTransaction.budgetName = (await ctx.prisma.budget
          .findUnique({
            where: {
              id: transaction.budgetId,
            },
          })
          .then((data) => data?.name)) as string;

        return newTransaction;
      })
    );
  }),

  getTransactionsInBetweenDates: protectedProcedure
    .input(
      z.object({
        startDate: z.string(),
        endDate: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const transactions = await ctx.prisma.transaction.findMany({
        where: {
          userId: ctx.session.user.id,
          date: {
            lte: dayjs(input.endDate).endOf("day").toISOString(),
            gte: input.startDate,
          },
        },
      });

      return Promise.all(
        transactions.map(async (transaction) => {
          const budgetName =
            (await ctx.prisma.budget
              .findFirst({
                where: {
                  id: transaction.budgetId,
                  userId: ctx.session.user.id,
                },
              })
              .then((result) => result?.name)) || "";

          const accountName =
            (await ctx.prisma.bankAccount
              .findFirst({
                where: {
                  id: transaction.accountId,
                  userId: ctx.session.user.id,
                },
              })
              .then((result) => result?.name)) || "";

          return { ...transaction, budgetName, accountName };
        })
      );
    }),

  makeTransactions: protectedProcedure
    .input(
      z.array(
        z.object({
          amount: z.number(),
          accountId: z.string(),
          userId: z.string(),
          budgetId: z.string(),
          name: z.string(),
          date: z.date(),
        })
      )
    )
    .mutation(async ({ ctx, input }) => {
      for (const transaction of input) {
        const { amount, accountId, budgetId, name } = transaction;

        const account = await ctx.prisma.bankAccount.findUnique({
          where: {
            id: accountId,
          },
        });

        const accountBalanceAfterTransaction =
          Number(account?.amount) + Number(amount);

        const isValidTransaction = accountBalanceAfterTransaction >= 0;

        if (!isValidTransaction) {
          return "Insufficient Funds";
        }

        if (accountId === "" || budgetId === "" || name === "") {
          return "Missing Fields";
        }

        ctx.prisma.bankAccount
          .update({
            where: { id: accountId },
            data: {
              amount: accountBalanceAfterTransaction,
            },
          })
          .catch((error) => console.log(error));

        ctx.prisma.transaction
          .create({ data: transaction })
          .catch((error) => console.log(error));
      }
    }),

  editTransaction: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        amount: z.number(),
        accountId: z.string(),
        userId: z.string(),
        budgetId: z.string(),
        name: z.string(),
        date: z.date(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const oldTransaction = await ctx.prisma.transaction.findUnique({
        where: {
          id: input.id,
        },
      });

      const account = await ctx.prisma.bankAccount.findUnique({
        where: {
          id: input.accountId,
        },
      });

      const oldTransactionAmount = Number(oldTransaction?.amount);

      const oldAccountBalance = Number(account?.amount);

      const newTransactionAmount =
        oldTransactionAmount >= 0
          ? oldAccountBalance - oldTransactionAmount
          : oldAccountBalance + Math.abs(oldTransactionAmount);

      const accountBalanceAfterTransaction =
        newTransactionAmount + input.amount;

      const isValidTransaction = accountBalanceAfterTransaction >= 0;

      if (!isValidTransaction) {
        return "Insufficient Funds";
      }

      ctx.prisma.bankAccount
        .update({
          where: { id: input.accountId },
          data: {
            amount: accountBalanceAfterTransaction,
          },
        })
        .catch((error) => console.log(error));

      ctx.prisma.transaction
        .update({
          where: {
            id: input.id,
          },
          data: {
            name: input.name,
            amount: input.amount,
            accountId: input.accountId,
            userId: input.userId,
            budgetId: input.budgetId,
            date: input.date,
          },
        })
        .catch((error) => console.log(error));
    }),

  deleteTransaction: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const transaction = await ctx.prisma.transaction.findUnique({
        where: {
          id: input,
        },
      });

      const refundAmount = Number(transaction?.amount) * -1;

      const account = await ctx.prisma.bankAccount.findUnique({
        where: {
          id: transaction?.accountId,
        },
      });

      const accountBalanceAfterTransaction =
        Number(account?.amount) + refundAmount;

      const isValidTransaction = accountBalanceAfterTransaction >= 0;

      if (!isValidTransaction) {
        return "Insufficient Funds";
      }

      ctx.prisma.bankAccount
        .update({
          where: { id: transaction?.accountId },
          data: {
            amount: accountBalanceAfterTransaction,
          },
        })
        .catch((error) => console.log(error));

      ctx.prisma.transaction
        .delete({
          where: { id: input },
        })
        .catch((error) => console.log(error));
    }),
});
