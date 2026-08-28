import * as jose from "jose";

const COOKIE_NAME = "voltx_lead";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

function getSecret() {
  const secret = process.env.COOKIE_SECRET || "voltx-dev-secret-change-in-production";
  return new TextEncoder().encode(secret);
}

/**
 * Sign a lead ID into a JWT cookie value
 */
export async function signCookie(leadId: string): Promise<string> {
  const jwt = await new jose.SignJWT({ leadId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("365d")
    .sign(getSecret());

  return jwt;
}

/**
 * Verify and decode a cookie value, returning the lead ID
 */
export async function verifyCookie(
  cookieValue: string
): Promise<string | null> {
  try {
    const { payload } = await jose.jwtVerify(cookieValue, getSecret());
    return (payload.leadId as string) || null;
  } catch {
    return null;
  }
}

export { COOKIE_NAME, COOKIE_MAX_AGE };
