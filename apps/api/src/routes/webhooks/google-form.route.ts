import { Router } from "express";
import { webhookController } from "../../controllers/webhook.controller.js";
import { asyncHandler } from "../../lib/http.js";

export const googleFormWebhookRoutes = Router();

googleFormWebhookRoutes.post("/", asyncHandler(webhookController.googleForm));
