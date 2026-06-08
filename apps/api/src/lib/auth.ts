import type { Request } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret_access_key_development_only";

export const requireSession = async (request: Request) => {
  const token = request.cookies?.accessToken || request.headers.authorization?.split(" ")[1];

  if (!token) {
    const error = new Error("Unauthorized");
    error.name = "UnauthorizedError";
    throw error;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    return {
      user: { id: decoded.userId },
    };
  } catch (err) {
    const error = new Error("Unauthorized");
    error.name = "UnauthorizedError";
    throw error;
  }
};
