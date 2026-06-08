import type { Request, Response } from "express";
import { ZodError } from "zod";

export type AsyncHandler = (request: Request, response: Response) => Promise<void>;

export const asyncHandler = (handler: AsyncHandler) => {
  return (request: Request, response: Response) => {
    handler(request, response).catch((error) => {
      sendError(response, error);
    });
  };
};

export const sendError = (response: Response, error: unknown) => {
  if (error instanceof ZodError) {
    response.status(400).json({
      error: "Invalid request",
      issues: error.flatten(),
    });
    return;
  }

  if (error instanceof Error && error.name === "UnauthorizedError") {
    response.status(401).json({ error: error.message });
    return;
  }

  if (error instanceof Error && error.name === "NotFoundError") {
    response.status(404).json({ error: error.message });
    return;
  }

  console.error(error);
  response.status(500).json({ error: "Internal server error" });
};

export const toNumber = (value: unknown, fallback: number) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export const requiredParam = (
  value: string | string[] | undefined,
  name: string,
) => {
  if (typeof value === "string" && value.length > 0) {
    return value;
  }

  const error = new Error(`Missing required route parameter: ${name}`);
  error.name = "NotFoundError";
  throw error;
};
