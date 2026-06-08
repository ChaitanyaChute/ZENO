// import type { SearchParams } from "nuqs";
// import { Suspense } from "react";
// import { ErrorBoundary } from "react-error-boundary";
// import {
//   ExecutionsContainer,
//   ExecutionsError,
//   ExecutionsList,
//   ExecutionsLoading,
// } from "@/components/executions/executions";
// import { executionsParamsLoader } from "@/features/executions/server/params-loader";
// import { prefetchExecutions } from "@/features/executions/server/prefetch";
// import { requireAuth } from "@/lib/auth/auth-utils";
// import { HydrateClient } from "@/lib/trpc/server";

// type Props = {
//   searchParams: Promise<SearchParams>;
// };

// const Page = async ({ searchParams }: Props) => {
//   await requireAuth();

//   const params = await executionsParamsLoader(searchParams);
//   prefetchExecutions(params);

//   return (
//     <ExecutionsContainer>
//       <HydrateClient>
//         <ErrorBoundary fallback={<ExecutionsError />}>
//           <Suspense fallback={<ExecutionsLoading />}>
//             <ExecutionsList />
//           </Suspense>
//         </ErrorBoundary>
//       </HydrateClient>
//     </ExecutionsContainer>
//   );
// };

// export default Page;


import type { SearchParams } from "nuqs";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import {
  ExecutionsError,
  ExecutionsList,
  ExecutionsLoading,
} from "@/components/executions/executions";
import { requireAuth } from "@/lib/auth/auth-utils";
type Props = {
  searchParams: Promise<SearchParams>;
};

const Page = async () => {
  //await requireAuth();

  return (
        <ErrorBoundary fallback={<ExecutionsError />}>
          <Suspense fallback={<ExecutionsLoading />}>
            <ExecutionsList />
          </Suspense>
        </ErrorBoundary>
      
  );
};

export default Page;
