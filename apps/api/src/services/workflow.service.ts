import type { Edge, Node } from "@xyflow/react";
import { generateSlug } from "random-word-slugs";
import prisma, { type Prisma } from "@repo/database/client";
import { PAGINATION } from "@repo/shared/constants";
import { NodeType } from "@repo/shared/types";
import { sendWorkflowExecution } from "@repo/queue";

export type WorkflowListInput = {
  page?: number;
  pageSize?: number;
  search?: string;
};

export type WorkflowUpdateInput = {
  nodes: Array<{
    id: string;
    type?: string | null;
    position: { x: number; y: number };
    data?: Record<string, unknown>;
  }>;
  edges: Array<{
    source: string;
    target: string;
    sourceHandle?: string | null;
    targetHandle?: string | null;
  }>;
};

export const executeWorkflow = async (userId: string, id: string) => {
  const workflow = await prisma.workflow.findUniqueOrThrow({
    where: { id, userId },
  });

  await sendWorkflowExecution({ workflowId: id });

  return workflow;
};

export const createWorkflow = (userId: string) => {
  return prisma.workflow.create({
    data: {
      name: generateSlug(3),
      userId,
      nodes: {
        create: {
          type: NodeType.INITIAL,
          position: { x: 0, y: 0 },
          name: NodeType.INITIAL,
        },
      },
    },
  });
};

export const removeWorkflow = (userId: string, id: string) => {
  return prisma.workflow.delete({
    where: { id, userId },
  });
};

export const updateWorkflow = async (
  userId: string,
  id: string,
  input: WorkflowUpdateInput,
) => {
  const workflow = await prisma.workflow.findUniqueOrThrow({
    where: { id, userId },
  });

  return prisma.$transaction(async (tx) => {
    await tx.node.deleteMany({
      where: { workflowId: id },
    });

    await tx.node.createMany({
      data: input.nodes.map((node) => ({
        id: node.id,
        workflowId: id,
        name: node.type || "unknown",
        type: node.type as NodeType,
        position: node.position,
        data: (node.data || {}) as Prisma.InputJsonValue,
      })),
    });

    await tx.connection.createMany({
      data: input.edges.map((edge) => ({
        workflowId: id,
        fromNodeId: edge.source,
        toNodeId: edge.target,
        fromOutput: edge.sourceHandle || "main",
        toInput: edge.targetHandle || "main",
      })),
    });

    await tx.workflow.update({
      where: { id },
      data: { updatedAt: new Date() },
    });

    return workflow;
  });
};

export const updateWorkflowName = (userId: string, id: string, name: string) => {
  return prisma.workflow.update({
    where: { id, userId },
    data: { name },
  });
};

export const getWorkflow = async (userId: string, id: string) => {
  const workflow = await prisma.workflow.findUniqueOrThrow({
    where: { id, userId },
    include: { nodes: true, connections: true },
  });

  const nodes: Node[] = workflow.nodes.map((node) => ({
    id: node.id,
    type: node.type,
    position: node.position as { x: number; y: number },
    data: (node.data as Record<string, unknown>) || {},
  }));

  const edges: Edge[] = workflow.connections.map((connection) => ({
    id: connection.id,
    source: connection.fromNodeId,
    target: connection.toNodeId,
    sourceHandle: connection.fromOutput,
    targetHandle: connection.toInput,
  }));

  return {
    id: workflow.id,
    name: workflow.name,
    nodes,
    edges,
  };
};

export const listWorkflows = async (userId: string, input: WorkflowListInput) => {
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
    prisma.workflow.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      where,
      orderBy: { updatedAt: "desc" },
    }),
    prisma.workflow.count({ where }),
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
