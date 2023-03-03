import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const budgetsRouter = createTRPCRouter({
  getAllBudgets: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.budgets.findMany();
  }),

  getAllLongTermBudgets: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.longTerm.findMany();
  }),
});
