// src/app/api/tasks/[id]/route.ts
import { NextResponse, NextRequest } from 'next/server'
import prisma  from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'

function getUserIdFromReq(req: NextRequest) {
  const token = req.cookies.get('token')?.value
  const payload = token ? verifyToken(token) : null
  return payload && 'userId' in payload ? (payload as any).userId : null
}

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const userId = getUserIdFromReq(req)
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const { id } = params
    const task = await prisma.task.findUnique({ where: { id } })
    if (!task || task.ownerId !== userId) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(task)
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const userId = getUserIdFromReq(req)
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const { id } = params
    const existing = await prisma.task.findUnique({ where: { id } })
    if (!existing || existing.ownerId !== userId) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    const body = await req.json()
    const allowed = ['title', 'description', 'completed']
    const data: any = {}
    for (const k of allowed) {
      if (k in body) data[k] = body[k]
    }

    const updated = await prisma.task.update({ where: { id }, data })
    return NextResponse.json(updated)
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const userId = getUserIdFromReq(req)
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const { id } = params
    const existing = await prisma.task.findUnique({ where: { id } })
    if (!existing || existing.ownerId !== userId) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    await prisma.task.delete({ where: { id } })
    return NextResponse.json({ ok: true })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
