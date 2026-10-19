
import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { demoCheckout } from "../controllers/payment.controller.js";

const router = express.Router();

router.post("/demo-checkout", protectRoute, demoCheckout);

export default router;
