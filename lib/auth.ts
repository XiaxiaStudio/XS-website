import { createHmac, timingSafeEqual } from "crypto"

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin"
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "HPbV&iQWVEi3-TsG#OFq"
const JWT_SECRET = process.env.JWT_SECRET || "change-this-secret-in-production"
const COOKIE_NAME = "admin-token"

export function getAdminCredentials() {
  return { username: ADMIN_USERNAME, password: ADMIN_PASSWORD }
}

function base64UrlEncode(input: string): string {
  return Buffer.from(input)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "")
}

function base64UrlDecode(input: string): string {
  const padding = "=".repeat((4 - (input.length % 4)) % 4)
  return Buffer.from(
    (input + padding).replace(/-/g, "+").replace(/_/g, "/"),
    "base64"
  ).toString("utf-8")
}

function sign(payload: string): string {
  const header = base64UrlEncode(JSON.stringify({ alg: "HS256", typ: "JWT" }))
  const body = base64UrlEncode(payload)
  const signature = base64UrlEncode(
    createHmac("sha256", JWT_SECRET).update(`${header}.${body}`).digest("base64")
  )
  return `${header}.${body}.${signature}`
}

function verify(token: string): { username: string } | null {
  const parts = token.split(".")
  if (parts.length !== 3) return null

  const [header, body, signature] = parts
  const expectedSignature = base64UrlEncode(
    createHmac("sha256", JWT_SECRET).update(`${header}.${body}`).digest("base64")
  )

  try {
    if (!timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
      return null
    }
  } catch {
    return null
  }

  try {
    const payload = JSON.parse(base64UrlDecode(body)) as { username: string; exp: number }
    if (payload.exp < Date.now() / 1000) return null
    return { username: payload.username }
  } catch {
    return null
  }
}

export function createToken(username: string): string {
  const payload = JSON.stringify({
    username,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // 24 hours
  })
  return sign(payload)
}

export function validateToken(token: string | undefined): { username: string } | null {
  if (!token) return null
  return verify(token)
}

export function getAuthCookieName(): string {
  return COOKIE_NAME
}

export function isPasswordComplex(password: string): boolean {
  if (password.length < 12) return false
  const hasUpper = /[A-Z]/.test(password)
  const hasLower = /[a-z]/.test(password)
  const hasNumber = /\d/.test(password)
  const hasSpecial = /[!@#$%^&*\-_=+\[\]{}|;:'",.<>?/]/.test(password)
  return hasUpper && hasLower && hasNumber && hasSpecial
}

export function verifyCredentials(username: string, password: string): { valid: boolean; message?: string } {
  if (username !== ADMIN_USERNAME) {
    return { valid: false, message: "用户名或密码错误" }
  }
  if (!isPasswordComplex(ADMIN_PASSWORD)) {
    return { valid: false, message: "管理员密码复杂度不足，请联系站长更新" }
  }
  if (password !== ADMIN_PASSWORD) {
    return { valid: false, message: "用户名或密码错误" }
  }
  return { valid: true }
}
