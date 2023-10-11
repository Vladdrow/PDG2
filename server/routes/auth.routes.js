import { Router } from "express";
import pool from "../db.js";

import {
    register,
    login,
    logout,
    confirmPaymentAndGenerateKey,
    verifyToken
} from "../controllers/auth.controllers.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/confirm-payment", confirmPaymentAndGenerateKey);
router.post("/logout", logout);

export default router;
