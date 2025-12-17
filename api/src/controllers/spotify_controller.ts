import type { Response, Request } from "express"
import * as SpotifyService from "../services/spotify_service.js"

export const getSpotifyUser = async (req: Request, res: Response) => {
    try {
        const { client_id, code, code_verifier, user_agent, device_id } = req.body;
        const data = await SpotifyService.getSpotifyUser(client_id, code, code_verifier, user_agent, device_id);
        res.status(201).json({ access_token: data });
    } catch (err: any){
        res.status(500).json({ error: err.message || "Something went wrong" });
    }
}