import { NextRequest, NextResponse } from 'next/server'
import { getUserFromCookie } from '@/lib/auth'

export async function GET(req: NextRequest) {
  const cookieHeader = req.headers.get('cookie') || ''
  const cookies: Record<string, string> = Object.fromEntries(
    cookieHeader
      .split('; ')
      .map(c => c.split('=').map(decodeURIComponent) as [string, string])
  )

  const user = await getUserFromCookie(cookies)

  if (user) return NextResponse.json(user)
  return NextResponse.json({ message: 'Not logged in' }, { status: 401 })
}
