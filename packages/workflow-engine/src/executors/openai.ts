import OpenAI from "openai";
import type { NodeExecutor } from "../types/index.js";
import { resolveTemplate } from "../utils/template.js";
import { getDecryptedCredential } from "./helpers.js";

interface OpenAiNodeData {
  variableName?: string;
  credentialId?: string;
  model?: string;
  systemPrompt?: string;
  userPrompt?: string;
}

export const openAiExecutor: NodeExecutor<OpenAiNodeData> = async ({
  data,
  nodeId,
  userId,
  credentialId,
  context,
  step,
}) => {
  const variableName = data.variableName || "myOpenAi";
  const userPromptRaw = data.userPrompt || "";
  const systemPromptRaw = data.systemPrompt || "";
  const model = data.model || "gpt-4o-mini";

  if (!userPromptRaw) {
    throw new Error(`OpenAI node (${nodeId}) is missing a user prompt`);
  }

  const effectiveCredentialId = data.credentialId || credentialId;
  const apiKey =
    (await getDecryptedCredential(userId, effectiveCredentialId)) ||
    process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error(`OpenAI node (${nodeId}) has no API key configured`);
  }

  const resolvedUserPrompt = resolveTemplate(userPromptRaw, context);
  const resolvedSystemPrompt = systemPromptRaw ? resolveTemplate(systemPromptRaw, context) : "";

  const responseText = await step.run(`openai-${nodeId}`, async () => {
    const openai = new OpenAI({ apiKey });
    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [];

    if (resolvedSystemPrompt) {
      messages.push({ role: "system", content: resolvedSystemPrompt });
    }
    messages.push({ role: "user", content: resolvedUserPrompt });

    const completion = await openai.chat.completions.create({
      model,
      messages,
    });

    return completion.choices[0]?.message?.content || "";
  });

  return {
    ...context,
    [variableName]: {
      text: responseText,
      model,
    },
  };
};
