import jwt from "jsonwebtoken";

export function generateJWT(userId: string, deviceId: string) {
    const payload = {
        user_id: userId,
        device_id: deviceId,
    };

    const jwtSecret = getJwtSecret();
    const token = jwt.sign(
    payload,
    jwtSecret,
    {
      expiresIn: "15m",
      issuer: "daily-album",
      audience: "frontend",
    }
  );

  return token;
}

export function getJwtSecret(): string {
    const jwtSecret = process.env["JWT_SECRET"];
    if(jwtSecret) {
    return jwtSecret;
    } else {
        throw "The app has crashed safetly. You are missing essential env variables. " + Error;
    }
}