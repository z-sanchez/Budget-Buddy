import { createTRPCRouter } from "./trpc";
import { exampleRouter } from "./routers/example";
import { budgetsRouter } from "./routers/budgets";
import { transactionsRouter } from "./routers/transactions";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  budgets: budgetsRouter,
  transactions: transactionsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
