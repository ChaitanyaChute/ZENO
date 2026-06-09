import * as dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { authRoutes } from "./routes/auth.route.js";
import { credentialRoutes } from "./routes/credential.route.js";
import { executionRoutes } from "./routes/execution.route.js";
import { workflowRoutes } from "./routes/workflow.route.js";
import { googleFormWebhookRoutes } from "./routes/webhooks/google-form.route.js";
import { stripeWebhookRoutes } from "./routes/webhooks/stripe.route.js";

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

app.use("/api/auth", authRoutes);
app.use("/api/workflows", workflowRoutes);
app.use("/api/executions", executionRoutes);
app.use("/api/credentials", credentialRoutes);
app.use("/api/webhooks/google-form", googleFormWebhookRoutes);
app.use("/api/webhooks/stripe", stripeWebhookRoutes);

const port = Number(process.env.PORT || 3001);

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`API server listening on http://localhost:${port}`);
  });
}
