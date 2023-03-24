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
    const nextSunday = today.add(daysToNextSunday, "day");
    const prevSunday = today.subtract(daysToPreviousSunday + 1, "day");

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
          accountId: z.number(),
          userId: z.number(),
          budgetId: z.number(),
          name: z.string(),
          date: z.string(),
        })
      )
    )
    .mutation(({ ctx, input }) => {
      ctx.prisma.transaction
        .createMany({ data: input })
        .catch((error) => console.log(error));
    }),
});
