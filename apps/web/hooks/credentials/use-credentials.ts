// import { useTRPC } from "@/lib/trpc/client"
// import { useMutation, useQuery, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
// import { toast } from "sonner";
// import { useCredentialsParams } from "./use-credentials-params";
// import { CredentialType } from "@repo/database/generated/prisma";

// /**
//  * Hook to fetch all credentials using suspense
//  */
// export const useSuspenseCredentials = () => {
//   const trpc = useTRPC();
//   const [params] = useCredentialsParams();
  
//   return useSuspenseQuery(trpc.credentials.getMany.queryOptions(params));
// };

// /**
//  * Hook to create a new credentials
//  */
// export const useCreateCredential = () => {
//   const queryClient = useQueryClient();
//   const trpc = useTRPC();

//   return useMutation(
//     trpc.credentials.create.mutationOptions({
//       onSuccess: (data) => {
//         toast.success(`Credential "${data.name}" created`);
//         queryClient.invalidateQueries(
//           trpc.credentials.getMany.queryOptions({}),
//         );
//       },
//       onError: (error) => {
//         toast.error(`Failed to create credential: ${error.message}`);
//       },
//     }),
//   );
// };

// /**
//  * Hook to remove a credential
//  */
// export const useRemoveCredential = () => {
//   const trpc = useTRPC();
//   const queryClient = useQueryClient();

//   return useMutation(
//     trpc.credentials.remove.mutationOptions({
//       onSuccess: (data) => {
//         toast.success(`Credential "${data.name}" removed`);
//         queryClient.invalidateQueries(trpc.credentials.getMany.queryOptions({}));
//         queryClient.invalidateQueries(
//           trpc.credentials.getOne.queryFilter({ id: data.id }),
//         );
//       }
//     })
//   )
// }

// /**
//  * Hook to fetch a single credential using suspense
//  */
// export const useSuspenseCredential = (id: string) => {
//   const trpc = useTRPC();
//   return useSuspenseQuery(trpc.credentials.getOne.queryOptions({ id }));
// };

// /**
//  * Hook to update a credential
//  */
// export const useUpdateCredential = () => {
//   const queryClient = useQueryClient();
//   const trpc = useTRPC();

//   return useMutation(
//     trpc.credentials.update.mutationOptions({
//       onSuccess: (data) => {
//         toast.success(`Credential "${data.name}" saved`);
//         queryClient.invalidateQueries(
//           trpc.credentials.getMany.queryOptions({}),
//         );
//         queryClient.invalidateQueries(
//           trpc.credentials.getOne.queryOptions({ id: data.id }),
//         );
//       },
//       onError: (error) => {
//         toast.error(`Failed to save credential: ${error.message}`);
//       },
//     }),
//   );
// };

// /**
//  * Hook to fetch credentials by type
//  */
// export const useCredentialsByType = (type: CredentialType) => {
//   const trpc = useTRPC();
//   return useQuery(trpc.credentials.getByType.queryOptions({ type }));
// };


"use client";

import { useEffect, useState } from "react";

export const CredentialType = {
  OPENAI: "OPENAI",
  ANTHROPIC: "ANTHROPIC",
  GEMINI: "GEMINI",
} as const;

export type CredentialType =
  (typeof CredentialType)[keyof typeof CredentialType];

export type Credential = {
  id: string;
  name: string;
  type: CredentialType;
  value: string;
  createdAt: string;
  updatedAt: string;
};

const STORAGE_KEY = "zeno_credentials";

const getCredentials = (): Credential[] => {
  if (typeof window === "undefined") return [];

  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) return [];

  return JSON.parse(data);
};

const saveCredentials = (credentials: Credential[]) => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(credentials)
  );
};

export const useSuspenseCredentials = () => {
  const [items, setItems] = useState<Credential[]>([]);

  useEffect(() => {
    setItems(getCredentials());
  }, []);

  return {
    data: {
      items,
      page: 1,
      totalPages: 1,
    },
    isFetching: false,
  };
};

export const useSuspenseCredential = (id: string) => {
  const credentials = getCredentials();

  const credential =
    credentials.find((c) => c.id === id);

  return {
    data: credential,
  };
};

export const useCreateCredential = () => {
  return {
    isPending: false,

    mutateAsync: async (
      values: Omit<
        Credential,
        "id" | "createdAt" | "updatedAt"
      >
    ) => {
      const credentials = getCredentials();

      const newCredential: Credential = {
        ...values,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      credentials.push(newCredential);

      saveCredentials(credentials);

      return newCredential;
    },
  };
};

export const useUpdateCredential = () => {
  return {
    isPending: false,

    mutateAsync: async (
      values: Credential
    ) => {
      const credentials = getCredentials();

      const updated = credentials.map((c) =>
        c.id === values.id
          ? {
              ...values,
              updatedAt: new Date().toISOString(),
            }
          : c
      );

      saveCredentials(updated);

      return values;
    },
  };
};

export const useRemoveCredential = () => {
  return {
    isPending: false,

    mutate: ({ id }: { id: string }) => {
      const credentials = getCredentials();

      saveCredentials(
        credentials.filter(
          (credential) => credential.id !== id
        )
      );

      window.location.reload();
    },
  };
};

export const useCredentialsByType = (
  type: CredentialType
) => {
  const [data, setData] = useState<Credential[]>([]);

  useEffect(() => {
    const credentials = getCredentials();

    setData(
      credentials.filter(
        (credential) =>
          credential.type === type
      )
    );
  }, [type]);

  return {
    data,
    isLoading: false,
  };
};