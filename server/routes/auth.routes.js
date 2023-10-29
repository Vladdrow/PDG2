import { Router } from "express";

import {
    register,
    login,
    logout,
    confirmPaymentAndGenerateKey,
    loginController,
    registerController
    /* verifyToken */
} from "../controllers/auth.controllers.js";

const router = Router();

/* router.post("/register", register);
router.post("/login", login); */
router.post("/register", register);
router.post("/login", login);
router.post("/confirm-payment", confirmPaymentAndGenerateKey);
router.post("/logout", logout);
/* router.post("/verify", verifyTokenController); */

export default router;
