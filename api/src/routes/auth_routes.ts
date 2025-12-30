import { Router } from "express";
import * as SpotifyController from "../controllers/auth_controller.js";
import * as authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

router.post('/authenticate', SpotifyController.authenticateUser);

export default router;