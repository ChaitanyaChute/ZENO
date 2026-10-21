import { z } from "zod";
import { NodeType } from "@repo/shared/types";

// Base interface for all node definitions in the registry
export interface NodeDefinition<TData extends z.ZodTypeAny = z.ZodTypeAny> {
  type: NodeType;
  description: string;
  schema: TData;
  execute: (credentialId: string | null, data: z.infer<TData>, inputs: any) => Promise<any>;
}

// ---------------------------------------------------------------------------
// 1. POSTGRES ACTION
// ---------------------------------------------------------------------------
const PostgresActionData = z.object({
  table: z.string().describe("The name of the table to modify"),
  columns: z.array(z.string()).optional().describe("Columns to insert or update"),
  operation: z.enum(["INSERT", "UPSERT", "UPDATE"]).describe("The database operation to perform"),
});

export const PostgresActionDef: NodeDefinition<typeof PostgresActionData> = {
  type: NodeType.POSTGRES_ACTION,
  description: "Inserts, updates, or upserts data into a PostgreSQL database.",
  schema: PostgresActionData,
  execute: async (credentialId, data, inputs) => {
    console.log(`Executing Postgres Action: ${data.operation} on table ${data.table}`);
    // Real implementation would use 'pg' with the decrypted credential
    return { success: true, table: data.table, operation: data.operation };
  },
};

// ---------------------------------------------------------------------------
// 2. MONGO ACTION
// ---------------------------------------------------------------------------
const MongoActionData = z.object({
  collection: z.string().describe("The name of the collection to modify"),
  operation: z.enum(["INSERT", "UPSERT"]).describe("The database operation to perform"),
});

export const MongoActionDef: NodeDefinition<typeof MongoActionData> = {
  type: NodeType.MONGO_ACTION,
  description: "Inserts or upserts data into a MongoDB collection.",
  schema: MongoActionData,
  execute: async (credentialId, data, inputs) => {
    console.log(`Executing Mongo Action: ${data.operation} on collection ${data.collection}`);
    // Real implementation would use 'mongodb' with the decrypted credential
    return { success: true, collection: data.collection, operation: data.operation };
  },
};

// ---------------------------------------------------------------------------
// 3. GOOGLE FORM TRIGGER
// ---------------------------------------------------------------------------
const GoogleFormTriggerData = z.object({
  formId: z.string().optional().describe("Optional ID of the form"),
});

export const GoogleFormTriggerDef: NodeDefinition<typeof GoogleFormTriggerData> = {
  type: NodeType.GOOGLE_FORM_TRIGGER,
  description: "Triggers the workflow when a new Google Form response is submitted.",
  schema: GoogleFormTriggerData,
  execute: async (credentialId, data, inputs) => {
    // Triggers pass their webhook payload as inputs
    return inputs;
  },
};

// ---------------------------------------------------------------------------
// 4. DISCORD
// ---------------------------------------------------------------------------
const DiscordData = z.object({
  channelId: z.string().describe("The ID of the Discord channel to send the message to"),
  message: z.string().describe("The content of the message to send"),
});

export const DiscordDef: NodeDefinition<typeof DiscordData> = {
  type: NodeType.DISCORD,
  description: "Sends a message to a Discord channel.",
  schema: DiscordData,
  execute: async (credentialId, data, inputs) => {
    // Real implementation calls discord channel executor
    return { success: true };
  },
};

// ---------------------------------------------------------------------------
// REGISTRY EXPORTS
// ---------------------------------------------------------------------------
export const NodeRegistry: Record<string, NodeDefinition> = {
  [NodeType.POSTGRES_ACTION]: PostgresActionDef,
  [NodeType.MONGO_ACTION]: MongoActionDef,
  [NodeType.GOOGLE_FORM_TRIGGER]: GoogleFormTriggerDef,
  [NodeType.DISCORD]: DiscordDef,
  // Add other nodes here as needed
};

export const registeredNodeTypes = Object.keys(NodeRegistry) as NodeType[];

// Generate the discriminated union schema dynamically for the LLM Tool Call
export const NodeToolSchema = z.discriminatedUnion("type", [
  z.object({
    id: z.string().describe("A temporary unique identifier for this node (e.g. 'node_1')"),
    type: z.literal(NodeType.POSTGRES_ACTION),
    name: z.string().describe("A human-readable name for this node"),
    data: PostgresActionData,
  }),
  z.object({
    id: z.string().describe("A temporary unique identifier for this node (e.g. 'node_2')"),
    type: z.literal(NodeType.MONGO_ACTION),
    name: z.string().describe("A human-readable name for this node"),
    data: MongoActionData,
  }),
  z.object({
    id: z.string().describe("A temporary unique identifier for this node (e.g. 'node_3')"),
    type: z.literal(NodeType.GOOGLE_FORM_TRIGGER),
    name: z.string().describe("A human-readable name for this node"),
    data: GoogleFormTriggerData,
  }),
  z.object({
    id: z.string().describe("A temporary unique identifier for this node (e.g. 'node_4')"),
    type: z.literal(NodeType.DISCORD),
    name: z.string().describe("A human-readable name for this node"),
    data: DiscordData,
  }),
  // For production, we can programmatically build this array if we want,
  // but explicitly defining the union helps Zod infer exact types.
]);

export const WorkflowGenerationSchema = z.object({
  nodes: z.array(NodeToolSchema).default([]).describe("The list of nodes in the workflow"),
  connections: z.array(
    z.object({
      sourceNodeId: z.string().describe("The ID of the source node"),
      targetNodeId: z.string().describe("The ID of the target node"),
    })
  ).default([]).describe("How the nodes connect to each other"),
  clarification_needed: z.array(z.string()).optional()
    .describe("If the user's prompt is ambiguous, provide a list of questions to ask the user instead of guessing."),
});
