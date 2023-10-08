import { Router } from "express";
import pool from "../db.js";

import { register, login, confirmPaymentAndGenerateKey } from "../controllers/auth.controllers.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/confirm-payment", confirmPaymentAndGenerateKey);

export default router;
