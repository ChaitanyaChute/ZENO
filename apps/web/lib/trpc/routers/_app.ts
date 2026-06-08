// import { createTRPCRouter } from '../init';
// import { workflowsRouter } from '@/features/workflows/server/routers';
// import { credentialsRouter } from '@/features/credentials/server/routers';
// import { executionsRouter } from '@/features/executions/server/routers';

// export const appRouter = createTRPCRouter({
//   workflows: workflowsRouter,
//   credentials: credentialsRouter,
//   executions: executionsRouter,
// });
// // export type definition of API
// export type AppRouter = typeof appRouter;


import { createTRPCRouter } from "../init";

// import { workflowsRouter } from "@/lib/routers/workflow/routers";
// import { credentialsRouter } from "@/lib/routers/credentials/routers";
// import { executionsRouter } from "@/lib/routers/execution/routers";

export const appRouter = createTRPCRouter({
  // workflows: workflowsRouter,
  // credentials: credentialsRouter,
  // executions: executionsRouter,
});

export type AppRouter = typeof appRouter;