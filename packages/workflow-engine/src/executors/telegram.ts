import type { NodeExecutor } from "../types/index.js";
import { resolveTemplate } from "../utils/template.js";

interface TelegramNodeData {
  variableName?: string;
  botToken?: string;
  chatId?: string;
  content?: string;
  message?: string;
}

export const telegramExecutor: NodeExecutor<TelegramNodeData> = async ({
  data,
  nodeId,
  context,
  step,
}) => {
  const variableName = data.variableName || "myTelegram";
  const botToken = (data.botToken || process.env.TELEGRAM_BOT_TOKEN || "").trim();
  const chatId = (data.chatId || "").trim();
  const rawText = data.content || data.message || "";

  if (!botToken || !chatId) {
    // If not configured, pass through gracefully
    return context;
  }

  const resolvedText = resolveTemplate(rawText, context);

  await step.run(`telegram-send-${nodeId}`, async () => {
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: resolvedText,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`Telegram API failed (${response.status}): ${err}`);
    }

    return { sent: true };
  });

  return {
    ...context,
    [variableName]: {
      success: true,
      text: resolvedText,
      sentAt: new Date().toISOString(),
    },
  };
};
