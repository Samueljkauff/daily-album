import type { Response, Request } from "express";
// import * as UserService from "../services/user_service.js";

export const getUser = async (res: Response, req: Request) => {
    try {
        const jwt = req.header
        console.log(jwt)
    } catch(err: any) {
        console.log(err, res.status);
    }  
}