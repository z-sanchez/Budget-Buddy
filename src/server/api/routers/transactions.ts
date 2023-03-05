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

    const transactions = await ctx.prisma.transaction.findMany();

    return transactions.filter(({ date }) => {
      const transactionDate = dayjs(date);

      return (
        transactionDate.isAfter(prevSunday) &&
        transactionDate.isBefore(nextSunday)
      );
    });
  }),
});
