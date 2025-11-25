import type { Request, Response } from "express";
import * as TokenService from "../services/token_service.js";

export const createToken = async (req: Request, res: Response) => {
    // const token = await TokenService.createToken(req.body);
    // res.status(201).json(token);
}