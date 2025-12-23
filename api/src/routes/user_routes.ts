import { Router } from "express";
import * as UserController from "../controllers/user_controller.js";

const router = Router();

router.get('/profile', UserController.getUser);

export default router;