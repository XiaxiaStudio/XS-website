import { NextRequest, NextResponse } from "next/server"
import { getAuthCookieName, validateToken } from "@/lib/auth"

export async function GET(request: NextRequest) {
  const token = request.cookies.get(getAuthCookieName())?.value
  const user = validateToken(token)

  if (!user) {
    return NextResponse.json(
      { success: false, authenticated: false },
      { status: 401 }
    )
  }

  return NextResponse.json({
    success: true,
    authenticated: true,
    user,
  })
}
