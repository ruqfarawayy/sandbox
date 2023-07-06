import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";

export const sessionOptions = {
  cookieName: process.env.SESSION_COOKIE_NAME,
  password: process.env.SESSION_KEY,
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.APP_ENV === "production",
    httpOnly: process.env.APP_ENV === "production",
    sameSite: process.env.APP_ENV === "production" ? "Strict" : "Lax",
    maxAge: 24 * 60 * 60 + 60,
  },
};

export function withSessionRoute(handler) {
  return withIronSessionApiRoute(handler, sessionOptions);
}

export function withSession(handler) {
  return withIronSessionSsr(handler, sessionOptions);
}
