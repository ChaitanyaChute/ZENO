import { NodeType } from "@repo/database/client";
import type { NodeExecutor } from "../types/index.js";

const passthroughExecutor: NodeExecutor = async ({ context }) => context;

export const executorRegistry: Record<NodeType, NodeExecutor> = {
  [NodeType.INITIAL]: passthroughExecutor,
  [NodeType.MANUAL_TRIGGER]: passthroughExecutor,
  [NodeType.HTTP_REQUEST]: passthroughExecutor,
  [NodeType.GOOGLE_FORM_TRIGGER]: passthroughExecutor,
  [NodeType.STRIPE_TRIGGER]: passthroughExecutor,
  [NodeType.GEMINI]: passthroughExecutor,
  [NodeType.ANTHROPIC]: passthroughExecutor,
  [NodeType.OPENAI]: passthroughExecutor,
  [NodeType.DISCORD]: passthroughExecutor,
  [NodeType.SLACK]: passthroughExecutor,
};

export const getExecutor = (type: NodeType): NodeExecutor => {
  const executor = executorRegistry[type];
  if (!executor) {
    throw new Error(`No executor found for node type: ${type}`);
  }

  return executor;
};
