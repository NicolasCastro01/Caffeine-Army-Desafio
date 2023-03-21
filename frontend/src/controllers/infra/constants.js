export const API_URL =
  process.env.ENVIROMENT === "production"
    ? "https://caffeine-army-backend-test-production.up.railway.app"
    : "http://localhost:3001";
