// import { useTRPC } from "@/lib/trpc/client"
// import { useSuspenseQuery } from "@tanstack/react-query";
// import { useExecutionsParams } from "./use-executions-params";

// /**
//  * Hook to fetch all executions using suspense
//  */
// export const useSuspenseExecutions = () => {
//   const trpc = useTRPC();
//   const [params] = useExecutionsParams();
  
//   return useSuspenseQuery(trpc.executions.getMany.queryOptions(params));
// };

// /**
//  * Hook to fetch a single execution using suspense
//  */
// export const useSuspenseExecution = (id: string) => {
//   const trpc = useTRPC();
//   return useSuspenseQuery(trpc.executions.getOne.queryOptions({ id }));
// };



/**
 * Hook to fetch all executions using suspense
 */
/**
 * Frontend-only mock hooks
 */

export const useSuspenseExecutions = () => {
  return {
    data: {
      items: [],
      page: 1,
      totalPages: 1,
    },
    isFetching: false,
  };
};

export const useSuspenseExecution = (_id: string) => {
  return {
    data: {} as any,
    isFetching: false,
  };
};

