import { Router } from "express";
import { register, login, refresh, logout, me, googleUrl, googleCallback, githubUrl, githubCallback } from "../controllers/auth.controller.js";

export const authRoutes = Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.post("/refresh", refresh);
authRoutes.post("/logout", logout);
authRoutes.get("/me", me);

authRoutes.get("/google", googleUrl);
authRoutes.get("/google/callback", googleCallback);

authRoutes.get("/github", githubUrl);
authRoutes.get("/github/callback", githubCallback);
