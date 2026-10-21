import type { NodeExecutor } from "../types/index.js";
import { resolveTemplate } from "../utils/template.js";
import { getDecryptedCredential } from "./helpers.js";

interface AnthropicNodeData {
  variableName?: string;
  credentialId?: string;
  model?: string;
  systemPrompt?: string;
  userPrompt?: string;
}

export const anthropicExecutor: NodeExecutor<AnthropicNodeData> = async ({
  data,
  nodeId,
  userId,
  credentialId,
  context,
  step,
}) => {
  const variableName = data.variableName || "myAnthropic";
  const userPromptRaw = data.userPrompt || "";
  const systemPromptRaw = data.systemPrompt || "";
  const model = data.model || "claude-3-5-sonnet-20241022";

  if (!userPromptRaw) {
    throw new Error(`Anthropic node (${nodeId}) is missing a user prompt`);
  }

  const effectiveCredentialId = data.credentialId || credentialId;
  const apiKey =
    (await getDecryptedCredential(userId, effectiveCredentialId)) ||
    process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    throw new Error(`Anthropic node (${nodeId}) has no API key configured`);
  }

  const resolvedUserPrompt = resolveTemplate(userPromptRaw, context);
  const resolvedSystemPrompt = systemPromptRaw ? resolveTemplate(systemPromptRaw, context) : undefined;

  const responseText = await step.run(`anthropic-${nodeId}`, async () => {
    const body: Record<string, unknown> = {
      model,
      max_tokens: 1024,
      messages: [{ role: "user", content: resolvedUserPrompt }],
    };

    if (resolvedSystemPrompt) {
      body.system = resolvedSystemPrompt;
    }

    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Anthropic API error (${res.status}): ${err}`);
    }

    const json = await res.json();
    const content = json.content?.[0];
    return content?.text || "";
  });

  return {
    ...context,
    [variableName]: {
      text: responseText,
      model,
    },
  };
};
