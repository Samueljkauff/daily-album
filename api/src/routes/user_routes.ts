import { Router } from "express";
import * as UserController from "../controllers/user_controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = Router();

router.get('/profile', requireAuth, UserController.getUser);

export default router;