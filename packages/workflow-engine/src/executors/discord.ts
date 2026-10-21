import type { NodeExecutor } from "../types/index.js";
import { resolveTemplate } from "../utils/template.js";

interface DiscordNodeData {
  variableName?: string;
  webhookUrl?: string;
  content?: string;
  username?: string;
}

export const discordExecutor: NodeExecutor<DiscordNodeData> = async ({
  data,
  nodeId,
  context,
  step,
}) => {
  const variableName = data.variableName || "myDiscord";
  const webhookUrl = (data.webhookUrl || "").trim();
  const rawContent = data.content || "";
  const rawUsername = data.username || "";

  if (!webhookUrl) {
    throw new Error(`Discord node (${nodeId}) is missing required Webhook URL`);
  }

  const resolvedContent = resolveTemplate(rawContent, context);
  const resolvedUsername = resolveTemplate(rawUsername, context);

  await step.run(`discord-send-${nodeId}`, async () => {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: resolvedContent,
        username: resolvedUsername || undefined,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Discord Webhook failed with status ${response.status}: ${errorText}`);
    }

    return { sent: true };
  });

  return {
    ...context,
    [variableName]: {
      success: true,
      text: resolvedContent,
      sentAt: new Date().toISOString(),
    },
  };
};
