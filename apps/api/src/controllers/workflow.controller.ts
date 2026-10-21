import { z } from "zod";
import crypto from "crypto";
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

  generate: async (request: Request, response: Response) => {
    const session = await requireSession(request);
    const workflowId = requiredParam(request.params.id, "id");
    const input = z.object({ prompt: z.string().min(1) }).parse(request.body);

    try {
      const { generateWorkflowFromPrompt, generateLayout } = await import("@repo/workflow-engine/nlp");
      
      // 1. Generate workflow from LLM
      const generated = await generateWorkflowFromPrompt(input.prompt);

      if (generated.clarification_needed && generated.clarification_needed.length > 0) {
        // If there are also some valid nodes, return both
        if (generated.nodes.length > 0) {
          const layoutedNodes = generateLayout(generated.nodes, generated.connections);
          
          const idMap = new Map<string, string>();
          for (const n of layoutedNodes) {
            idMap.set(n.id, crypto.randomUUID());
          }

          const nodes = layoutedNodes.map((n: any) => ({
            id: idMap.get(n.id)!, type: n.type, position: n.position, data: n.data,
          }));
          const edges = generated.connections
            .map((c: any) => ({
              source: idMap.get(c.sourceNodeId)!, target: idMap.get(c.targetNodeId)!, sourceHandle: null, targetHandle: null,
            }))
            .filter((c: any) => c.source && c.target);
            
          const data = await updateWorkflow(session.user.id, workflowId, { nodes, edges });
          return response.json({ 
            ...data, 
            clarification_needed: generated.clarification_needed 
          });
        }
        return response.json({ 
          clarification_needed: generated.clarification_needed 
        });
      }

      if (generated.nodes.length === 0) {
        return response.json({ 
          clarification_needed: ["I couldn't determine the right nodes for your workflow. Could you provide more detail?"] 
        });
      }

      // 2. Generate Layout
      const layoutedNodes = generateLayout(generated.nodes, generated.connections);

      // Map AI IDs to real UUIDs to prevent global unique constraint violations
      const idMap = new Map<string, string>();
      for (const n of layoutedNodes) {
        idMap.set(n.id, crypto.randomUUID());
      }

      // 3. Format to React Flow / Prisma schema
      const nodes = layoutedNodes.map((n: any) => ({
        id: idMap.get(n.id)!,
        type: n.type,
        position: n.position,
        data: n.data,
      }));
      
      const edges = generated.connections
        .map((c: any) => ({
          source: idMap.get(c.sourceNodeId)!,
          target: idMap.get(c.targetNodeId)!,
          sourceHandle: null,
          targetHandle: null,
        }))
        .filter((c: any) => c.source && c.target);

      // 4. Save
      const data = await updateWorkflow(session.user.id, workflowId, { nodes, edges });

      response.json(data);
    } catch (error: any) {
      console.error("[Generate Controller] Error:", error);
      response.status(500).json({ 
        error: error?.message || "Failed to generate workflow" 
      });
    }
  },
};
