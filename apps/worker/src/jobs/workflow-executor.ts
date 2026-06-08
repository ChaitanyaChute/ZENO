import { NonRetriableError } from "inngest";
import prisma, { ExecutionStatus, NodeType } from "@repo/database/client";
import { getExecutor } from "@repo/workflow-engine/engine";
import { topologicalSort } from "@repo/workflow-engine/utils";
import { anthropicChannel } from "@repo/integrations/anthropic";
import { discordChannel } from "@repo/integrations/discord";
import { geminiChannel } from "@repo/integrations/gemini";
import { googleFormTriggerChannel } from "@repo/integrations/google/form-trigger";
import { httpRequestChannel } from "@repo/integrations/http-request";
import { manualTriggerChannel } from "@repo/integrations/manual-trigger";
import { openAiChannel } from "@repo/integrations/openai";
import { slackChannel } from "@repo/integrations/slack";
import { stripeTriggerChannel } from "@repo/integrations/stripe/trigger";
import { inngest } from "../client.js";

export const executeWorkflow = inngest.createFunction(
  {
    id: "execute-workflow",
    retries: process.env.NODE_ENV === "production" ? 3 : 0,
    onFailure: async ({ event }) => {
      return prisma.execution.update({
        where: { inngestEventId: event.data.event.id },
        data: {
          status: ExecutionStatus.FAILED,
          error: event.data.error.message,
          errorStack: event.data.error.stack,
        },
      });
    },
  },
  {
    event: "workflows/execute.workflow",
    channels: [
      httpRequestChannel(),
      manualTriggerChannel(),
      googleFormTriggerChannel(),
      stripeTriggerChannel(),
      geminiChannel(),
      openAiChannel(),
      anthropicChannel(),
      discordChannel(),
      slackChannel(),
    ],
  },
  async (runContext) => {
    const { event, step } = runContext;
    const publish = (runContext as typeof runContext & {
      publish?: (...args: never[]) => Promise<unknown>;
    }).publish;
    const inngestEventId = event.id;
    const workflowId = event.data.workflowId;

    if (!inngestEventId || !workflowId) {
      throw new NonRetriableError("Event ID or workflow ID is missing");
    }

    await step.run("create-execution", async () => {
      return prisma.execution.create({
        data: {
          workflowId,
          inngestEventId,
        },
      });
    });

    const sortedNodes = await step.run("prepare-workflow", async () => {
      const workflow = await prisma.workflow.findUniqueOrThrow({
        where: { id: workflowId },
        include: {
          nodes: true,
          connections: true,
        },
      });

      return topologicalSort(workflow.nodes, workflow.connections);
    });

    const userId = await step.run("find-user-id", async () => {
      const workflow = await prisma.workflow.findUniqueOrThrow({
        where: { id: workflowId },
        select: {
          userId: true,
        },
      });

      return workflow.userId;
    });

    let workflowContext = event.data.initialData || {};

    for (const node of sortedNodes) {
      const executor = getExecutor(node.type as NodeType);
      workflowContext = await executor({
        data: node.data as Record<string, unknown>,
        nodeId: node.id,
        userId,
        context: workflowContext,
        step,
        publish: (publish ?? (async () => undefined)) as never,
      });
    }

    await step.run("update-execution", async () => {
      return prisma.execution.update({
        where: { inngestEventId, workflowId },
        data: {
          status: ExecutionStatus.SUCCESS,
          completedAt: new Date(),
          output: workflowContext,
        },
      });
    });

    return {
      workflowId,
      result: workflowContext,
    };
  },
);
