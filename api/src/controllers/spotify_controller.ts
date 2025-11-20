import type { Response, Request } from "express"
import * as SpotifyService from "../services/spotify_service.js"

export const getRefreshToken = async (req: Request, res: Response) => {
    try {
        const { client_id, code, code_verifier } = req.body;
        const data = await SpotifyService.getRefreshToken(client_id, code, code_verifier);
        res.status(201).json({ access_token: data.access_token});
    } catch (err: any){
        res.status(500).json({ error: err.message || "Something went wrong" });
    }
}