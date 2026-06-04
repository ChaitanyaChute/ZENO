"use client";

/**
 * Minimal tRPC-compatible client stub.
 *
 * The web app does not have a full tRPC backend wired up yet.
 * This shim exposes the same API surface (`trpc.X.Y.useQuery()`) so that
 * components compile and render without errors, returning empty/loading states
 * until a real tRPC router is connected.
 */

interface Credential {
  id: string;
  title: string;
  platform: string;
}

interface UseQueryResult<T> {
  data: T;
  isLoading: boolean;
  error: null;
}

function makeUseQuery<T>(defaultValue: T) {
  return function useQuery(): UseQueryResult<T> {
    return { data: defaultValue, isLoading: false, error: null };
  };
}

export const trpc = {
  credentials: {
    getAll: {
      useQuery: makeUseQuery<Credential[]>([]),
    },
  },
} as const;
