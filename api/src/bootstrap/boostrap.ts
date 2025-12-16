
type RequiredEnv = {
  DATABASE_URL: string;
  POSTGRES_USER: string;
  POSTGRES_PASSWORD: string;
  POSTGRES_DB: string;
  VITE_SPOTIFY_CLIENT_ID: string;
  VITE_SPOTIFY_CLIENT_SECRET: string;
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
    POSTGRES_USER: requireEnv("POSTGRES_USER"),
    POSTGRES_PASSWORD: requireEnv("POSTGRES_PASSWORD"),
    POSTGRES_DB: requireEnv("POSTGRES_DB"),
    VITE_SPOTIFY_CLIENT_ID: requireEnv("VITE_SPOTIFY_CLIENT_ID"),
    VITE_SPOTIFY_CLIENT_SECRET: requireEnv("VITE_SPOTIFY_CLIENT_SECRET"),
    JWT_SECRET: requireEnv("JWT_SECRET"),
    JWT_EXPIRES_IN: requireEnv("JWT_EXPIRES_IN"),
  };

  console.log("Environment variables validated");

  return env;
}
