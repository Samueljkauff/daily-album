import type { Response, Request } from "express";
// import * as UserService from "../services/user_service.js";

export const getUser = async ( req: Request, res: Response) => {
    try {
        const jwt = req.header('Authorization')?.split(' ')[1];
        if(!jwt) {
            return res.status(401).json({ message: 'Authentication required' });
        }
        
    } catch(err: any) {
        console.log(err, res.status);
    }  
}