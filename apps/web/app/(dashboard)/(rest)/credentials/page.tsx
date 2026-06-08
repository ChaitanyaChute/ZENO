import type { SearchParams } from "nuqs";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import {
  CredentialsContainer,
  CredentialsError,
  CredentialsList,
  CredentialsLoading,
} from "@/components/credentials/credentials";

// import { credentialsParamsLoader } from "@/components/credentials/server/params-loader";
// import { prefetchCredentials } from "@/components/credentials/server/prefetch";

import { requireAuth } from "@/lib/auth/auth-utils";

// import { HydrateClient } from "@/trpc/server";

type Props = {
  searchParams: Promise<SearchParams>;
};

const Page = async ({ searchParams }: Props) => {
  await requireAuth();

  // Parse URL search params on server
  // const params = await credentialsParamsLoader(searchParams);

  // Prefetch credentials on server and store in React Query cache
  // prefetchCredentials(params);

  return (
    <CredentialsContainer>
      {/* Hydrates the prefetched cache from server to client */}
      {/* <HydrateClient> */}
      <ErrorBoundary fallback={<CredentialsError />}>
        <Suspense fallback={<CredentialsLoading />}>
          <CredentialsList />
        </Suspense>
      </ErrorBoundary>
      {/* </HydrateClient> */}
    </CredentialsContainer>
  );
};

export default Page;