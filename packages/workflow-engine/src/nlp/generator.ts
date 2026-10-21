import OpenAI from "openai";

let apiKey = process.env.OPENAI_API_KEY;
let baseURL: string | undefined = undefined;
let model = "gpt-4o";

if (process.env.GROQ_API_KEY) {
  apiKey = process.env.GROQ_API_KEY;
  baseURL = "https://api.groq.com/openai/v1";
  model = "llama-3.3-70b-versatile";
} else if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "your-gemini-api-key-here") {
  apiKey = process.env.GEMINI_API_KEY;
  baseURL = "https://generativelanguage.googleapis.com/v1beta/openai/";
  model = "gemini-2.0-flash";
}

const openai = new OpenAI({
  apiKey,
  baseURL,
});

// ---- Types (no Zod, just plain TS) ----
export interface GeneratedNode {
  id: string;
  type: string;
  name: string;
  data: Record<string, any>;
}

export interface GeneratedConnection {
  sourceNodeId: string;
  targetNodeId: string;
}

export interface GenerationResult {
  nodes: GeneratedNode[];
  connections: GeneratedConnection[];
  clarification_needed?: string[];
}

// ---- Generator ----
export async function generateWorkflowFromPrompt(prompt: string): Promise<GenerationResult> {
  if (!apiKey || apiKey === "your-openai-api-key-here") {
    throw new Error("No API key found. Please set GROQ_API_KEY, GEMINI_API_KEY, or OPENAI_API_KEY in your .env file.");
  }

  const systemPrompt = `You are an expert workflow automation architect.
Your job is to translate a user's plain English request into a structured workflow DAG (Directed Acyclic Graph).

Available Node Types (YOU CAN ONLY USE THESE):
- MANUAL_TRIGGER: Runs the workflow manually. Config: {}
- GOOGLE_FORM_TRIGGER: Runs when a Google Form is submitted. Config: { "formId": "string" (optional) }
- STRIPE_TRIGGER: Runs when a Stripe event occurs. Config: { "eventType": "string" }
- HTTP_REQUEST: Makes an HTTP request. Config: { "method": "GET" | "POST", "url": "string" }
- GEMINI: Generate text using Gemini. Config: { "prompt": "string" }
- OPENAI: Generate text using OpenAI. Config: { "prompt": "string" }
- ANTHROPIC: Generate text using Claude. Config: { "prompt": "string" }
- DISCORD: Send a Discord message. Config: { "channelId": "string", "message": "string" }
- SLACK: Send a Slack message. Config: { "channelId": "string", "message": "string" }
- GMAIL: Send an email using Gmail. Config: { "to": "string", "subject": "string", "body": "string" }
- NOTION_ACTION: Create and update Notion pages. Config: { "databaseId": "string", "content": "string" }
- GOOGLE_DOCS_ACTION: Create and update Google Docs. Config: { "documentId": "string", "content": "string" }
- POSTGRES_ACTION: Execute PostgreSQL queries. Config: { "table": "string", "operation": "INSERT" | "UPSERT" | "UPDATE", "columns": ["col1", "col2"] }
- RAZORPAY_ACTION: Create payments and manage transactions. Config: { "amount": "number", "currency": "string" }
- TELEGRAM_ACTION: Send Telegram messages. Config: { "chatId": "string", "message": "string" }
- MONGO_ACTION: Read and write MongoDB documents. Config: { "collection": "string", "operation": "INSERT" | "UPSERT" }

Instructions:
1. Build the workflow using ONLY the Available Node Types listed above.
2. If the user asks for an integration NOT in the list, DO NOT invent a node type. Instead, set "nodes" to an empty array and add a message to "clarification_needed" explaining which integrations are not yet supported.
3. Do NOT ask the user for configuration details like channel IDs, table names, emails, or credentials. This tool is for non-technical users who will provide these on a separate settings page later. Just use empty strings or generic placeholders for missing data in the node's "data" object.
4. The first node should be the trigger. Connect nodes sequentially using "connections".

You MUST respond with ONLY a valid JSON object (no markdown, no explanation) in this exact format:
{
  "nodes": [
    { "id": "node_1", "type": "DISCORD", "name": "Discord Trigger", "data": { "channelId": "general", "message": "" } },
    { "id": "node_2", "type": "POSTGRES_ACTION", "name": "Save to Postgres", "data": { "table": "messages", "operation": "INSERT" } }
  ],
  "connections": [
    { "sourceNodeId": "node_1", "targetNodeId": "node_2" }
  ],
  "clarification_needed": []
}`;

  try {
    console.log(`[NLP Generator] Calling ${model} at ${baseURL || "OpenAI default"}...`);

    const response = await openai.chat.completions.create({
      model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt },
      ],
      response_format: { type: "json_object" },
      temperature: 0.2,
    });

    let contentStr = response.choices[0]?.message?.content;
    if (!contentStr) {
      throw new Error("Empty response from LLM.");
    }

    console.log("[NLP Generator] Raw LLM response:", contentStr);

    // Strip markdown fences if LLM wraps output
    contentStr = contentStr.trim();
    if (contentStr.startsWith("```")) {
      contentStr = contentStr.replace(/^```(?:json)?\s*/, "").replace(/\s*```$/, "");
    }

    const parsed = JSON.parse(contentStr.trim());

    // Normalize to safe defaults
    const result: GenerationResult = {
      nodes: Array.isArray(parsed.nodes) ? parsed.nodes : [],
      connections: Array.isArray(parsed.connections) ? parsed.connections : [],
      clarification_needed: Array.isArray(parsed.clarification_needed) ? parsed.clarification_needed : [],
    };

    console.log("[NLP Generator] Parsed result:", JSON.stringify(result, null, 2));

    return result;
  } catch (error: any) {
    console.error("[NLP Generator] Error:", error?.message || error);
    if (error?.response?.data) {
      console.error("[NLP Generator] API Response:", JSON.stringify(error.response.data, null, 2));
    }
    throw error;
  }
}
