import type { NodeExecutor } from "../types/index.js";
import { resolveTemplate } from "../utils/template.js";
import { getDecryptedCredential } from "./helpers.js";

interface GeminiNodeData {
  variableName?: string;
  credentialId?: string;
  model?: string;
  systemPrompt?: string;
  userPrompt?: string;
}

export const geminiExecutor: NodeExecutor<GeminiNodeData> = async ({
  data,
  nodeId,
  userId,
  credentialId,
  context,
  step,
}) => {
  const variableName = data.variableName || "myGemini";
  const userPromptRaw = data.userPrompt || "";
  const systemPromptRaw = data.systemPrompt || "";
  const model = data.model || "gemini-1.5-flash";

  if (!userPromptRaw) {
    throw new Error(`Gemini node (${nodeId}) is missing a user prompt`);
  }

  const effectiveCredentialId = data.credentialId || credentialId;
  const apiKey =
    (await getDecryptedCredential(userId, effectiveCredentialId)) ||
    process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error(`Gemini node (${nodeId}) has no API key configured`);
  }

  const resolvedUserPrompt = resolveTemplate(userPromptRaw, context);
  const resolvedSystemPrompt = systemPromptRaw ? resolveTemplate(systemPromptRaw, context) : "";

  const responseText = await step.run(`gemini-${nodeId}`, async () => {
    const contents: any[] = [];
    if (resolvedSystemPrompt) {
      contents.push({
        role: "user",
        parts: [{ text: `System instruction: ${resolvedSystemPrompt}` }],
      });
      contents.push({
        role: "model",
        parts: [{ text: "Understood." }],
      });
    }
    contents.push({
      role: "user",
      parts: [{ text: resolvedUserPrompt }],
    });

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents }),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Gemini API error (${res.status}): ${err}`);
    }

    const json = await res.json();
    const candidate = json.candidates?.[0];
    const textPart = candidate?.content?.parts?.[0]?.text;
    return textPart || "";
  });

  return {
    ...context,
    [variableName]: {
      text: responseText,
      model,
    },
  };
};
