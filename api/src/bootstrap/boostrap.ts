
type RequiredEnv = {
  DATABASE_URL: string;
  SPOTIFY_CLIENT_ID: string;
  SPOTIFY_CLIENT_SECRET: string;
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
};

function requireEnv(key: keyof RequiredEnv): string {
  const value = process.env[key];

  if (!value || value.trim() === "") {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value;
}

export function bootstrap(): RequiredEnv {
  const env: RequiredEnv = {
    DATABASE_URL: requireEnv("DATABASE_URL"),
    SPOTIFY_CLIENT_ID: requireEnv("SPOTIFY_CLIENT_ID"),
    SPOTIFY_CLIENT_SECRET: requireEnv("SPOTIFY_CLIENT_SECRET"),
    JWT_SECRET: requireEnv("JWT_SECRET"),
    JWT_EXPIRES_IN: requireEnv("JWT_EXPIRES_IN"),
  };

  console.log("Environment variables validated");

  return env;
}
