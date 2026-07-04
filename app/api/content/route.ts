import { NextRequest, NextResponse } from "next/server"
import { getAuthCookieName, validateToken } from "@/lib/auth"
import { getSiteData, updateSiteData, type SiteData } from "@/lib/data"

export async function GET() {
  try {
    const data = await getSiteData()
    return NextResponse.json({ success: true, data })
  } catch {
    return NextResponse.json(
      { success: false, message: "读取数据失败" },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  const token = request.cookies.get(getAuthCookieName())?.value
  const user = validateToken(token)

  if (!user) {
    return NextResponse.json(
      { success: false, message: "未登录或登录已过期" },
      { status: 401 }
    )
  }

  try {
    const body = (await request.json()) as { data: SiteData }
    if (!body.data) {
      return NextResponse.json(
        { success: false, message: "缺少数据" },
        { status: 400 }
      )
    }

    await updateSiteData(body.data)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { success: false, message: "保存失败" },
      { status: 500 }
    )
  }
}
