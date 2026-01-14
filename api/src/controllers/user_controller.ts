import type { Response, Request } from "express";
import { getUserProfile } from "../services/user_service.js";
import type { AuthenticatedRequest } from "../interface/auth.type.js";

export const getUser = async ( req: AuthenticatedRequest, res: Response) => {
    try {
        const user_id = req.auth?.userId as string;
        const profile = await getUserProfile(user_id);
        res.status(200).json({ profile });
    } catch(err: any) {
        console.log(err, res.status);
    }  
}