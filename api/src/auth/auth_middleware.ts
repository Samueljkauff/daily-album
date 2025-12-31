import jwt from "jsonwebtoken"
import type { Response, Request, NextFunction } from "express"

export interface AuthenticatedRequest extends Request {
  auth?: {
    userId: string;
    deviceId: string;
  };
}

const JWT_SECRET = process.env.JWT_SECRET;

if(!JWT_SECRET) {
    throw new Error("No JWT Secret found.");
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {

  const header = req.headers.authorization;
  
  if(!header || !header.startsWith("Bearer")) {
    return res.status(401).json("Missing auth header");
  }
}