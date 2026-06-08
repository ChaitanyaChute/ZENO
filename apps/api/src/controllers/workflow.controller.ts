import { z } from "zod";
import { requireSession } from "../lib/auth.js";
import { requiredParam, toNumber } from "../lib/http.js";
import {
  createWorkflow,
  executeWorkflow,
  getWorkflow,
  listWorkflows,
  removeWorkflow,
  updateWorkflow,
  updateWorkflowName,
} from "../services/workflow.service.js";
import type { Request, Response } from "express";
import { PAGINATION } from "@repo/shared/constants";

const nodeSchema = z.object({
  id: z.string(),
  type: z.string().nullish(),
  position: z.object({ x: z.number(), y: z.number() }),
  data: z.record(z.string(), z.any()).optional(),
});

const edgeSchema = z.object({
  source: z.string(),
  target: z.string(),
  sourceHandle: z.string().nullish(),
  targetHandle: z.string().nullish(),
});

export const workflowController = {
  list: async (request: Request, response: Response) => {
    const session = await requireSession(request);
    const data = await listWorkflows(session.user.id, {
      page: toNumber(request.query.page, PAGINATION.DEFAULT_PAGE),
      pageSize: toNumber(request.query.pageSize, PAGINATION.DEFAULT_PAGE_SIZE),
      search: typeof request.query.search === "string" ? request.query.search : "",
    });

    response.json(data);
  },

  create: async (request: Request, response: Response) => {
    const session = await requireSession(request);
    const data = await createWorkflow(session.user.id);

    response.status(201).json(data);
  },

  get: async (request: Request, response: Response) => {
    const session = await requireSession(request);
    const data = await getWorkflow(
      session.user.id,
      requiredParam(request.params.id, "id"),
    );

    response.json(data);
  },

  remove: async (request: Request, response: Response) => {
    const session = await requireSession(request);
    const data = await removeWorkflow(
      session.user.id,
      requiredParam(request.params.id, "id"),
    );

    response.json(data);
  },

  update: async (request: Request, response: Response) => {
    const session = await requireSession(request);
    const input = z.object({
      nodes: z.array(nodeSchema),
      edges: z.array(edgeSchema),
    }).parse(request.body);
    const data = await updateWorkflow(
      session.user.id,
      requiredParam(request.params.id, "id"),
      input,
    );

    response.json(data);
  },

  updateName: async (request: Request, response: Response) => {
    const session = await requireSession(request);
    const input = z.object({ name: z.string().min(1) }).parse(request.body);
    const data = await updateWorkflowName(
      session.user.id,
      requiredParam(request.params.id, "id"),
      input.name,
    );

    response.json(data);
  },

  execute: async (request: Request, response: Response) => {
    const session = await requireSession(request);
    const data = await executeWorkflow(
      session.user.id,
      requiredParam(request.params.id, "id"),
    );

    response.json(data);
  },
};
