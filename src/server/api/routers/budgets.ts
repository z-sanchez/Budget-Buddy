import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const budgetsRouter = createTRPCRouter({
  getAllBudgets: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.budget.findMany();
  }),

  getAllLongTermBudgets: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.longTermBudget.findMany();
  }),
});
