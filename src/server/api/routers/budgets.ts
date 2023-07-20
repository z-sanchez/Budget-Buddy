import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const budgetsRouter = createTRPCRouter({
  getAllBudgets: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.budget.findMany();
  }),

  getAllLongTermBudgets: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.longTermBudget.findMany();
  }),

  getMonthsBudgets: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      const monthsBudgets = await ctx.prisma.budget.findMany({
        where: {
          userId: userId,
          month: Number(input),
        },
      });

      return Promise.all(monthsBudgets);
    }),
});
