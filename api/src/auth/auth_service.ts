import jwt from "jsonwebtoken";

interface secrets {
  jwtAccessSecret: string;
  jwtRefreshSecret: string;
};

export function generateJWT(userId: string, deviceId: string) {
    const payload = {
        user_id: userId,
        device_id: deviceId,
    };

    const JWTsecrets = getJwtSecrets();
    const accessToken = jwt.sign(
    payload,
    JWTsecrets.jwtAccessSecret,
    {
      expiresIn: "15m",
      issuer: "daily-album",
      audience: "frontend",
    }
  );
    const refreshToken = jwt.sign(
    payload,
    JWTsecrets.jwtRefreshSecret,
    {
      expiresIn: "14d",
      issuer: "daily-album",
      audience: "frontend",
    }
  );

  return { accessToken, refreshToken };
}

export function getJwtSecrets(): secrets {
    const jwtAccessSecret = process.env["ACCESS_JWT_SECRET"];
    const jwtRefreshSecret = process.env["REFRESH_JWT_SECRET"]
    if(jwtAccessSecret && jwtRefreshSecret) {
    return { jwtAccessSecret, jwtRefreshSecret };
    } else {
        throw "The app has crashed safetly. You are missing essential env variables. " + Error;
    }
}