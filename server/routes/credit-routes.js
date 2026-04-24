import express from "express";
import { purchasePlan, getPlans } from "../controllers/credit-controller.js";
import { protect } from "../middlewares/auth.js";

const creditRouter = express.Router();
creditRouter.get('/plans', getPlans);
creditRouter.post('/purchase', protect, purchasePlan);
export default creditRouter;