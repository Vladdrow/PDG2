import { Router } from "express";
const router = Router();
/* const isAuthenticated = require('./middleware/isAuthenticated'); */

router.use(isAuthenticated);

router.get("/profile");
router.get("/subscribe");
router.get("/notifications");
router.get("/dashboard");

module.exports = router;
