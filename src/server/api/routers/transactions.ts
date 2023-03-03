import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const transactionsRouter = createTRPCRouter({
  getAllTransactions: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.transaction.findMany();
  }),
});
