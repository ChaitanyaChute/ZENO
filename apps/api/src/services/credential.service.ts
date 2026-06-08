import prisma from "@repo/database/client";
import { PAGINATION } from "@repo/shared/constants";
import { CredentialType } from "@repo/shared/types";
import { encrypt } from "../lib/encryption.js";

export type CredentialListInput = {
  page?: number;
  pageSize?: number;
  search?: string;
};

export type CredentialInput = {
  name: string;
  type: CredentialType;
  value: string;
};

export const createCredential = (userId: string, input: CredentialInput) => {
  return prisma.credential.create({
    data: {
      name: input.name,
      userId,
      type: input.type,
      value: encrypt(input.value),
    },
  });
};

export const removeCredential = (userId: string, id: string) => {
  return prisma.credential.delete({
    where: { id, userId },
  });
};

export const updateCredential = (
  userId: string,
  id: string,
  input: CredentialInput,
) => {
  return prisma.credential.update({
    where: { id, userId },
    data: {
      name: input.name,
      type: input.type,
      value: encrypt(input.value),
    },
  });
};

export const getCredential = (userId: string, id: string) => {
  return prisma.credential.findUniqueOrThrow({
    where: { id, userId },
  });
};

export const listCredentials = async (
  userId: string,
  input: CredentialListInput,
) => {
  const page = input.page ?? PAGINATION.DEFAULT_PAGE;
  const pageSize = input.pageSize ?? PAGINATION.DEFAULT_PAGE_SIZE;
  const search = input.search ?? "";

  const where = {
    userId,
    name: {
      contains: search,
      mode: "insensitive" as const,
    },
  };

  const [items, totalCount] = await Promise.all([
    prisma.credential.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      where,
      orderBy: { updatedAt: "desc" },
    }),
    prisma.credential.count({ where }),
  ]);

  const totalPages = Math.ceil(totalCount / pageSize);

  return {
    items,
    page,
    pageSize,
    totalCount,
    totalPages,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  };
};

export const listCredentialsByType = (userId: string, type: CredentialType) => {
  return prisma.credential.findMany({
    where: { type, userId },
    orderBy: { updatedAt: "desc" },
  });
};
