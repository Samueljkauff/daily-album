import jwt from "jsonwebtoken";

export interface JWTSecrets {
    access: string,
    refresh: string,
}

export function generateJWT(userId: string, deviceId: string) {
    const payload = {
        user_id: userId,
        device_id: deviceId,
    };

    const jwtSecret = getJwtSecrets() as JWTSecrets;
    const access_token = jwt.sign(
    payload,
    jwtSecret.access,
    {
      expiresIn: "15m",
      issuer: "daily-album",
      audience: "frontend",
    }
  );

    const refresh_token = jwt.sign(
    payload,
    jwtSecret.refresh,
    {
      expiresIn: "30d",
      issuer: "daily-album",
      audience: "frontend",
    }
  );

  return {access_token, refresh_token};
}

export function getJwtSecrets(): JWTSecrets {
  const access = process.env.ACCESS_JWT_SECRET;
  const refresh = process.env.REFRESH_JWT_SECRET;

  if (!access || !refresh) {
    throw new Error("Missing JWT secrets in environment variables");
  }

  return { access, refresh };
}