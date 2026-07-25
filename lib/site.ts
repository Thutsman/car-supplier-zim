// Vercel sets these automatically; production deploys get the stable
// production domain, preview deploys get their own unique URL.
const vercelHost =
  process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;

export const siteUrl = vercelHost ? `https://${vercelHost}` : "http://localhost:3000";
