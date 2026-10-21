import type { NodeExecutor } from "../types/index.js";
import { resolveTemplate } from "../utils/template.js";

interface HttpRequestNodeData {
  variableName?: string;
  endpoint?: string;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: string;
  headers?: Record<string, string>;
}

export const httpRequestExecutor: NodeExecutor<HttpRequestNodeData> = async ({
  data,
  nodeId,
  context,
  step,
}) => {
  const variableName = data.variableName || "myHttpRequest";
  const rawEndpoint = data.endpoint || "";
  const method = data.method || "GET";
  const rawBody = data.body || "";

  if (!rawEndpoint) {
    throw new Error(`HTTP Request node (${nodeId}) is missing required endpoint URL`);
  }

  const resolvedEndpoint = resolveTemplate(rawEndpoint, context);
  const resolvedBody = rawBody ? resolveTemplate(rawBody, context) : undefined;

  const result = await step.run(`http-request-${nodeId}`, async () => {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(data.headers || {}),
    };

    const options: RequestInit = {
      method,
      headers,
    };

    if (method !== "GET" && resolvedBody) {
      options.body = resolvedBody;
    }

    const response = await fetch(resolvedEndpoint, options);
    const contentType = response.headers.get("content-type") || "";

    let responseData: unknown;
    if (contentType.includes("application/json")) {
      try {
        responseData = await response.json();
      } catch {
        responseData = await response.text();
      }
    } else {
      responseData = await response.text();
    }

    return {
      status: response.status,
      ok: response.ok,
      statusText: response.statusText,
      data: responseData,
    };
  });

  return {
    ...context,
    [variableName]: result,
  };
};
