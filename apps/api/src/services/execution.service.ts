import prisma from "@repo/database/client";
import { PAGINATION } from "@repo/shared/constants";

export type ExecutionListInput = {
  page?: number;
  pageSize?: number;
};

export const getExecution = (userId: string, id: string) => {
  return prisma.execution.findUniqueOrThrow({
    where: {
      id,
      workflow: { userId },
    },
    include: {
      workflow: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
};

export const listExecutions = async (
  userId: string,
  input: ExecutionListInput,
) => {
  const page = input.page ?? PAGINATION.DEFAULT_PAGE;
  const pageSize = input.pageSize ?? PAGINATION.DEFAULT_PAGE_SIZE;

  const where = {
    workflow: { userId },
  };

  const [items, totalCount] = await Promise.all([
    prisma.execution.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      where,
      orderBy: { startedAt: "desc" },
      include: {
        workflow: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    }),
    prisma.execution.count({ where }),
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
