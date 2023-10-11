// content.route.js
import express from "express";
import { getHomePageData } from "../controllers/content.controller.js";

const router = express.Router();

router.get("/", getHomePageData);

export default router;
