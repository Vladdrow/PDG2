// content.route.js
import { Router } from "express";
import {
    getSocialNetworks,
    getBookData,
    getCompaniesData,
    getSectionsData,
    getEditorsData,
    getBasicUsersUnifiedData,
} from "../controllers/content.controller.js";

const router = Router();

/* router.get("/", getHomePageData); */
router.get("/book", getBookData);
router.get("/companies", getCompaniesData);
router.get("/sections", getSectionsData);
router.get("/editors", getEditorsData);
router.get("/social-networks", getSocialNetworks);

router.get("/getUserDataList", getBasicUsersUnifiedData);

export default router;
