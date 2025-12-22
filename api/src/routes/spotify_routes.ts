import { Router } from "express";
import * as SpotifyController from "../controllers/spotify_controller.js";

const router = Router();

router.post('/spotify/authenticate', SpotifyController.authenticateUser);

// router.post('/spotify/user/profile', SpotifyController.getUser);

export default router;