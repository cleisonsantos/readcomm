import { Router } from "express";
import { handleRegister, handleLogin } from "./controllers/authController";

const router = Router();

// Auth routes
router.post("/api/auth/register", handleRegister);
router.post("/api/auth/login", handleLogin);

export default router;