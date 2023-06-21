import { createTRPCRouter, protectedProcedure } from "../trpc";

export const bankAccountsRouter = createTRPCRouter({
  getAllBankAccounts: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.bankAccount.findMany();
  }),
  getTotalBalance: protectedProcedure.query(async ({ ctx }) => {
    const bankAccounts = await ctx.prisma.bankAccount
      .findMany()
      .catch((err) => {
        throw err;
      });

    return bankAccounts
      .reduce((total, account) => {
        return (total += Number(account.amount));
      }, 0)
      .toFixed(2);
  }),
});
