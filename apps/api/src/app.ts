import "./env.js";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { serve } from "inngest/express";
import { inngest } from "@repo/queue/inngest";
import { executeWorkflow } from "@repo/workflow-engine/jobs";
import { authRoutes } from "./routes/auth.route.js";
import { credentialRoutes } from "./routes/credential.route.js";
import { executionRoutes } from "./routes/execution.route.js";
import { workflowRoutes } from "./routes/workflow.route.js";
import { googleFormWebhookRoutes } from "./routes/webhooks/google-form.route.js";

export const app = express();

app.use(cors({
  origin: function (origin, callback) {
    callback(null, origin || true);
  },
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.get("/health", (_request, response) => {
  response.json({ ok: true });
});

// Inngest background job execution endpoint
app.use(
  "/api/inngest",
  serve({
    client: inngest,
    functions: [executeWorkflow],
  }),
);

app.use("/api/auth", authRoutes);
app.use("/api/workflows", workflowRoutes);
app.use("/api/executions", executionRoutes);
app.use("/api/credentials", credentialRoutes);
app.use("/api/webhooks/google-form", googleFormWebhookRoutes);

const port = Number(process.env.PORT || 3001);

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`API server listening on http://localhost:${port}`);
  });
}
