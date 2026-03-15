export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  process.env.BASE_URL ||
  "http://localhost:5000";

export const AMBIENCE_OPTIONS = [
  "nature",
  "rain",
  "forest",
  "ocean",
  "cafe"
];