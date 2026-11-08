import { systemRouter } from "./_core/systemRouter";
import { router } from "./_core/trpc";

export const appRouter = router({
  // Add public API routers here as the portfolio grows.
  system: systemRouter,
});

export type AppRouter = typeof appRouter;
