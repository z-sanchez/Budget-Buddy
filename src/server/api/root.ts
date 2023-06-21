import { createTRPCRouter } from "./trpc";
import { exampleRouter } from "./routers/example";
import { budgetsRouter } from "./routers/budgets";
import { transactionsRouter } from "./routers/transactions";
import { userRouter } from "./routers/users";
import { bankAccountsRouter } from "./routers/bankAccounts";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  budgets: budgetsRouter,
  user: userRouter,
  transactions: transactionsRouter,
  bankAccounts: bankAccountsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
