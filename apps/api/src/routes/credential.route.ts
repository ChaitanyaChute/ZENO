import { Router } from "express";
import { credentialController } from "../controllers/credential.controller.js";
import { asyncHandler } from "../lib/http.js";

export const credentialRoutes = Router();

credentialRoutes.get("/", asyncHandler(credentialController.list));
credentialRoutes.post("/", asyncHandler(credentialController.create));
credentialRoutes.get("/by-type", asyncHandler(credentialController.byType));
credentialRoutes.get("/:id", asyncHandler(credentialController.get));
credentialRoutes.put("/:id", asyncHandler(credentialController.update));
credentialRoutes.delete("/:id", asyncHandler(credentialController.remove));
