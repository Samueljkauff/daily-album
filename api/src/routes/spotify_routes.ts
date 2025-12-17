import { Router } from "express";
import * as SpotifyController from "../controllers/spotify_controller.js";

const router = Router();

router.post('/spotify/user', SpotifyController.getSpotifyUser);

export default router;