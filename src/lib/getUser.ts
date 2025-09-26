import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function getUser() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value
  if (!token) return null

  const payload = verifyToken(token)
  if (!payload || typeof payload !== 'object' || !('userId' in payload)) {
    return null
  }

  const user = await prisma.user.findUnique({
    where: { id: (payload as any).userId },
    select: { id: true, name: true, email: true },
  })

  return user
}
