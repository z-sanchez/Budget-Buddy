import dayjs from "dayjs";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const transactionsRouter = createTRPCRouter({
  getAllTransactions: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.transaction.findMany();
  }),

  getThisWeeksTransactions: protectedProcedure.query(async ({ ctx }) => {
    const today = dayjs();
    const daysToNextSunday = 7 - today.day();
    const daysToPreviousSunday = today.day();

    const nextSunday = today.add(daysToNextSunday, "day").startOf("day");
    const prevSunday = today
      .subtract(daysToPreviousSunday, "day")
      .startOf("day");

    const weeksTransactionData = await ctx.prisma.transaction.findMany({
      where: {
        date: {
          lte: nextSunday.toISOString(),
          gte: prevSunday.toISOString(),
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

        newTransaction.accountName = (await ctx.prisma.accounts
          .findUnique({
            where: {
              id: transaction.accountId,
            },
          })
          .then((data) => data?.name)) as string;

        newTransaction.userName = (await ctx.prisma.users
          .findUnique({
            where: {
              id: transaction.userId,
            },
          })
          .then((data) => data?.name)) as string;

        newTransaction.budgetName = (await ctx.prisma.budgets
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

  makeTransactions: protectedProcedure
    .input(
      z.array(
        z.object({
          amount: z.number(),
          accountId: z.number().gt(0),
          userId: z.number().gt(0),
          budgetId: z.number().gt(0),
          name: z.string(),
          date: z.date(),
        })
      )
    )
    .mutation(({ ctx, input }) => {
      ctx.prisma.transaction
        .createMany({ data: input })
        .catch((error) => console.log(error));
    }),

  editTransaction: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        amount: z.number(),
        accountId: z.number().gt(0),
        userId: z.number().gt(0),
        budgetId: z.number().gt(0),
        name: z.string(),
        date: z.date(),
      })
    )
    .mutation(({ ctx, input }) => {
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
    .input(z.number())
    .mutation(({ ctx, input }) => {
      ctx.prisma.transaction
        .delete({
          where: { id: input },
        })
        .catch((error) => console.log(error));
    }),
});
