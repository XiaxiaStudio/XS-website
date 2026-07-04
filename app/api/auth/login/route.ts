import { NextRequest, NextResponse } from "next/server"
import {
  createToken,
  getAuthCookieName,
  verifyCredentials,
} from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { username?: string; password?: string }
    const { username = "", password = "" } = body

    const credentialCheck = verifyCredentials(username, password)
    if (!credentialCheck.valid) {
      return NextResponse.json(
        { success: false, message: credentialCheck.message || "用户名或密码错误" },
        { status: 401 }
      )
    }

    const token = createToken(username)
    const response = NextResponse.json({ success: true })

    response.cookies.set({
      name: getAuthCookieName(),
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
      path: "/",
    })

    return response
  } catch {
    return NextResponse.json(
      { success: false, message: "登录失败，请重试" },
      { status: 500 }
    )
  }
}
