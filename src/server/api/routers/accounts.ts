import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const accountsRouter = createTRPCRouter({
  getAllAccounts: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.accounts.findMany();
  }),
});
