import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const budgetsRouter = createTRPCRouter({
  getAllBudgets: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.budgets.findMany();
  }),

  getAllLongTermBudgets: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.longTerm.findMany();
  }),
});
