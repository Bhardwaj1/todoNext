'use client'

import { useState } from 'react'
import TaskForm from '@/components/TaskForm'
import TaskList from '@/components/TaskList'

export default function DashboardClient() {
  const [refresh, setRefresh] = useState(false)

  return (
    <>
      <TaskForm onCreated={() => setRefresh(!refresh)} />
      <TaskList key={String(refresh)} />
    </>
  )
}
