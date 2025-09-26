// src/app/api/tasks/route.ts
import { NextResponse, NextRequest } from 'next/server'
import prisma  from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('token')?.value
    const payload = token ? verifyToken(token) : null
    if (!payload || !('userId' in payload)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const userId = (payload as any).userId

    const tasks = await prisma.task.findMany({
      where: { ownerId: userId },
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(tasks)
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('token')?.value
    const payload = token ? verifyToken(token) : null
    if (!payload || !('userId' in payload)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const userId = (payload as any).userId

    const { title, description } = await req.json()
    if (!title) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })

    const task = await prisma.task.create({
      data: { title, description, ownerId: userId }
    })

    return NextResponse.json(task)
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
