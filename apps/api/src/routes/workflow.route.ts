import { Router } from "express";
import { workflowController } from "../controllers/workflow.controller.js";
import { asyncHandler } from "../lib/http.js";

export const workflowRoutes = Router();

workflowRoutes.get("/", asyncHandler(workflowController.list));
workflowRoutes.post("/", asyncHandler(workflowController.create));
workflowRoutes.get("/:id", asyncHandler(workflowController.get));
workflowRoutes.put("/:id", asyncHandler(workflowController.update));
workflowRoutes.delete("/:id", asyncHandler(workflowController.remove));
workflowRoutes.patch("/:id/name", asyncHandler(workflowController.updateName));
workflowRoutes.post("/:id/execute", asyncHandler(workflowController.execute));
