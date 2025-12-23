import type { Response, Request } from "express"
import * as SpotifyService from "../services/auth_service.js"

export const authenticateUser = async (req: Request, res: Response) => {
    try {
        const { client_id, code, code_verifier, user_agent, device_id } = req.body;
        const data = await SpotifyService.authenticateUser(client_id, code, code_verifier, user_agent, device_id);
        res.status(201).json({ data });
    } catch (err: any){
        res.status(500).json({ error: err.message || "Something went wrong" });
    }
}