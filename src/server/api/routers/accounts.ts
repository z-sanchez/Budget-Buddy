import { createTRPCRouter, protectedProcedure } from "../trpc";

export const accountsRouter = createTRPCRouter({
  getAllAccounts: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.accounts.findMany();
  }),
  getTotalBalance: protectedProcedure.query(async ({ ctx }) => {
    const accounts = await ctx.prisma.accounts.findMany().catch((err) => {
      throw err;
    });

    return accounts.reduce((total, account) => {
      return (total += Number(account.amount));
    }, 0);
  }),
});
