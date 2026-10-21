import type { NodeExecutor } from "../types/index.js";
import { resolveTemplate } from "../utils/template.js";

interface SlackNodeData {
  variableName?: string;
  webhookUrl?: string;
  content?: string;
}

export const slackExecutor: NodeExecutor<SlackNodeData> = async ({
  data,
  nodeId,
  context,
  step,
}) => {
  const variableName = data.variableName || "mySlack";
  const webhookUrl = (data.webhookUrl || "").trim();
  const rawContent = data.content || "";

  if (!webhookUrl) {
    throw new Error(`Slack node (${nodeId}) is missing required Webhook URL`);
  }

  const resolvedContent = resolveTemplate(rawContent, context);

  await step.run(`slack-send-${nodeId}`, async () => {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: resolvedContent,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Slack Webhook failed with status ${response.status}: ${errorText}`);
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
