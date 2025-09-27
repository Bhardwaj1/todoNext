// src/lib/auth.ts
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'change_this'

export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(password, salt)
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash)
}

export function signToken(payload: object) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string }
  } catch (e) {
    return null
  }
}

// ✅ Add getUserFromCookie here
import prisma from '@/lib/prisma'

export async function getUserFromCookie(cookies: Record<string, string>) {
  const token = cookies['token']
  if (!token) return null

  const payload = verifyToken(token)
  if (!payload || typeof payload !== 'object' || !('userId' in payload)) {
    return null
  }

  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
    select: { id: true, name: true, email: true },
  })

  return user
}
