import { Router } from "express";
import { executionController } from "../controllers/execution.controller.js";
import { asyncHandler } from "../lib/http.js";

export const executionRoutes = Router();

executionRoutes.get("/", asyncHandler(executionController.list));
executionRoutes.get("/:id", asyncHandler(executionController.get));
