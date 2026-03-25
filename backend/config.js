export const PORT = process.env.PORT ?? 3000;
export const SALT_ROUNDS = process.env.SALT_ROUNDS ?? 10;
export const JWT_SECRET = process.env.JWT_SECRET;
export const DATABASE_URL = process.env.DATABASE_URL;

const DEFAULT_CORS_ORIGINS = [
  "https://jwt-practice-git-main-abubuhs-projects.vercel.app",
  "http://localhost:5173",
  "https://jwt-practice-three.vercel.app/",
];

export function getCorsOrigins() {
  const raw = process.env.ALLOWED_ORIGINS;
  if (raw?.trim()) {
    return raw
      .split(",")
      .map((o) => o.trim())
      .filter(Boolean);
  }
  return DEFAULT_CORS_ORIGINS;
}
