import type { Request } from "express";
import jwt from "jsonwebtoken";
import fs from "fs";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export const requireSession = async (request: Request) => {
  const token = request.cookies?.accessToken || request.headers.authorization?.split(" ")[1];

  fs.appendFileSync("debug.log", `[requireSession] URL: ${request.url}\n`);
  fs.appendFileSync("debug.log", `[requireSession] request.cookies: ${JSON.stringify(request.cookies)}\n`);
  fs.appendFileSync("debug.log", `[requireSession] request.headers.cookie: ${request.headers.cookie}\n`);
  fs.appendFileSync("debug.log", `[requireSession] Token found: ${!!token}\n`);

  if (!token) {
    fs.appendFileSync("debug.log", `[requireSession] No token found!\n`);
    const error = new Error("Unauthorized");
    error.name = "UnauthorizedError";
    throw error;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    fs.appendFileSync("debug.log", `[requireSession] Token decoded successfully for user: ${decoded.userId}\n`);
    return {
      user: { id: decoded.userId },
    };
  } catch (err: any) {
    fs.appendFileSync("debug.log", `[requireSession] jwt.verify failed: ${err.message}\n`);
    const error = new Error("Unauthorized");
    error.name = "UnauthorizedError";
    throw error;
  }
};
