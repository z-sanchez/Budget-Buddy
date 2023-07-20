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

  getBudgetData: protectedProcedure
    .input(z.string())
    .query(({ ctx, input }) => {
      return ctx.prisma.budget.findFirst({
        where: {
          id: input,
        },
      });
    }),

  updateMonthBudget: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        color: z.string(),
        amount: z.number(),
        longTerm: z.number(),
        account: z.string(),
        balance: z.number(),
        userId: z.string(),
        dashboard: z.number(),
        icon: z.string(),
        month: z.number(),
        message: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.budget
        .update({
          where: {
            id: input.id,
          },
          data: {
            ...input,
          },
        })
        .catch((err) => console.log(err));
    }),
});
