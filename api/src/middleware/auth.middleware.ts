import jwt from "jsonwebtoken"
import type { Response, NextFunction } from "express"
import type { AuthenticatedRequest } from "../interface/auth.type.js";

const JWT_SECRET = process.env.JWT_SECRET as string;

if(!JWT_SECRET) {
    throw new Error("No JWT Secret found.");
}

export function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  
  if(!header || !header.startsWith("Bearer")) {
    return res.status(401).json("Missing auth header");
  }

  const token = header.split(" ")[1] as string;

  try {
    const payload = jwt.verify(token, JWT_SECRET) as {
      user_id: string;
      device_id: string;
    }

    req.auth = {
      userId: payload.user_id,
      deviceId: payload.device_id,
    };
    next();
  } catch(err) {
    return res.status(401).json({error: "Invalid or expired token"})
  }
}