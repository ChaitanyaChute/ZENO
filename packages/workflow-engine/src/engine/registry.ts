import { NodeType } from "@repo/database/client";
import type { NodeExecutor } from "../types/index.js";
import { discordExecutor } from "../executors/discord.js";
import { slackExecutor } from "../executors/slack.js";
import { httpRequestExecutor } from "../executors/http-request.js";
import { openAiExecutor } from "../executors/openai.js";
import { geminiExecutor } from "../executors/gemini.js";
import { anthropicExecutor } from "../executors/anthropic.js";
import { telegramExecutor } from "../executors/telegram.js";

const passthroughExecutor: NodeExecutor = async ({ context }) => context;

export const executorRegistry: Record<NodeType, NodeExecutor> = {
  [NodeType.INITIAL]: passthroughExecutor,
  [NodeType.MANUAL_TRIGGER]: passthroughExecutor,
  [NodeType.GOOGLE_FORM_TRIGGER]: passthroughExecutor,
  [NodeType.STRIPE_TRIGGER]: passthroughExecutor,
  [NodeType.HTTP_REQUEST]: httpRequestExecutor as NodeExecutor,
  [NodeType.DISCORD]: discordExecutor as NodeExecutor,
  [NodeType.SLACK]: slackExecutor as NodeExecutor,
  [NodeType.OPENAI]: openAiExecutor as NodeExecutor,
  [NodeType.GEMINI]: geminiExecutor as NodeExecutor,
  [NodeType.ANTHROPIC]: anthropicExecutor as NodeExecutor,
  [NodeType.TELEGRAM_ACTION]: telegramExecutor as NodeExecutor,
  [NodeType.GMAIL]: passthroughExecutor,
  [NodeType.NOTION_ACTION]: passthroughExecutor,
  [NodeType.GOOGLE_DOCS_ACTION]: passthroughExecutor,
  [NodeType.POSTGRES_ACTION]: passthroughExecutor,
  [NodeType.MONGO_ACTION]: passthroughExecutor,
  [NodeType.RAZORPAY_ACTION]: passthroughExecutor,
};

export const getExecutor = (type: NodeType): NodeExecutor => {
  const executor = executorRegistry[type];
  if (!executor) {
    return passthroughExecutor;
  }

  return executor;
};
