import { Router } from "express";
import * as SpotifyController from "../controllers/auth_controller.js";

const router = Router();

router.post('/spotify/authenticate', SpotifyController.authenticateUser);

export default router;