// import { InitialNode } from "@/components/initial-node";
// import { NodeType } from "@repo/database/generated/prisma";
// import type { NodeTypes } from "@xyflow/react";

// import { HttpRequestNode } from "@/components/executions/http-request/node";
// import { ManualTriggerNode } from "@/components/triggers/manual-trigger/node";
// import { GoogleFormTrigger } from "@/components/triggers/google-form-trigger/node";
// import { StripeTriggerNode } from "@/components/triggers/stripe-trigger/node";
// import { GeminiNode } from "@/components/executions/gemini/node";
// import { OpenAiNode } from "@/components/executions/openai/node";
// import { AnthropicNode } from "@/components/executions/anthropic/node";
// import { DiscordNode } from "@/components/executions/discord/node";
// import { SlackNode } from "@/components/executions/slack/node";

// export const nodeComponents : NodeTypes = {
//   [NodeType.INITIAL]: InitialNode,
//   [NodeType.HTTP_REQUEST]: HttpRequestNode,
//   [NodeType.MANUAL_TRIGGER]: ManualTriggerNode,
//   [NodeType.GOOGLE_FORM_TRIGGER]: GoogleFormTrigger,
//   [NodeType.STRIPE_TRIGGER]: StripeTriggerNode,
//   [NodeType.GEMINI]: GeminiNode,
//   [NodeType.OPENAI]: OpenAiNode,
//   [NodeType.ANTHROPIC]: AnthropicNode,
//   [NodeType.DISCORD]: DiscordNode,
//   [NodeType.SLACK]: SlackNode,
// } as const satisfies NodeTypes;

// export type RegisteredNodeType = keyof typeof nodeComponents;



import { InitialNode } from "@/components/initial-node";
import type { NodeTypes } from "@xyflow/react";

import { HttpRequestNode } from "@/components/executions/http-request/node";
import { ManualTriggerNode } from "@/components/triggers/manual-trigger/node";
import { GoogleFormTrigger } from "@/components/triggers/google-form-trigger/node";
import { StripeTriggerNode } from "@/components/triggers/stripe-trigger/node";
import { GeminiNode } from "@/components/executions/gemini/node";
import { OpenAiNode } from "@/components/executions/openai/node";
import { AnthropicNode } from "@/components/executions/anthropic/node";
import { DiscordNode } from "@/components/executions/discord/node";
import { SlackNode } from "@/components/executions/slack/node";
import { NotionNode } from "@/components/executions/notion/node";
import { GmailNode } from "@/components/executions/gmail/node";
import { GoogleDocsNode } from "@/components/executions/google-docs/node";
import { PostgreSQLNode } from "@/components/executions/postgresql/node";
import { RazorpayNode } from "@/components/executions/razorpay/node";
import { TelegramNode } from "@/components/executions/telegram/node";
import { MongoDBNode } from "@/components/executions/mongodb/node";

const NodeType = {
  INITIAL: "INITIAL",
  HTTP_REQUEST: "HTTP_REQUEST",
  MANUAL_TRIGGER: "MANUAL_TRIGGER",
  GOOGLE_FORM_TRIGGER: "GOOGLE_FORM_TRIGGER",
  STRIPE_TRIGGER: "STRIPE_TRIGGER",
  GEMINI: "GEMINI",
  OPENAI: "OPENAI",
  ANTHROPIC: "ANTHROPIC",
  DISCORD: "DISCORD",
  SLACK: "SLACK",
  GMAIL: "GMAIL",
  NOTION: "NOTION",
  TELEGRAM: "TELEGRAM",
  POSTGRESQL: "POSTGRESQL",
  MONGODB: "MONGODB",
  GOOGLE_DOCS: "GOOGLE_DOCS", 
  RAZORPAY: "RAZORPAY",
} as const;

export const nodeComponents: NodeTypes = {
  [NodeType.INITIAL]: InitialNode,
  [NodeType.HTTP_REQUEST]: HttpRequestNode,
  [NodeType.MANUAL_TRIGGER]: ManualTriggerNode,
  [NodeType.GOOGLE_FORM_TRIGGER]: GoogleFormTrigger,
  [NodeType.STRIPE_TRIGGER]: StripeTriggerNode,
  [NodeType.GEMINI]: GeminiNode,
  [NodeType.OPENAI]: OpenAiNode,
  [NodeType.ANTHROPIC]: AnthropicNode,
  [NodeType.DISCORD]: DiscordNode,
  [NodeType.SLACK]: SlackNode, 
  [NodeType.GMAIL]: GmailNode, 
  [NodeType.NOTION]: NotionNode, 
  [NodeType.TELEGRAM]: TelegramNode, 
  [NodeType.POSTGRESQL]: PostgreSQLNode, 
  [NodeType.MONGODB]: MongoDBNode, 
  [NodeType.GOOGLE_DOCS]: GoogleDocsNode, 
  [NodeType.RAZORPAY]: RazorpayNode, 

};

export type RegisteredNodeType = keyof typeof nodeComponents;