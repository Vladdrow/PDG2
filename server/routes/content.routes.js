// content.route.js
import { Router } from "express";
import { getHomePageData } from "../controllers/content.controller.js";

const router = Router();

router.get("/", getHomePageData);

export default router;
