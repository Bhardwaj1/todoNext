'use client'
import { useEffect, useState } from 'react'

interface Task {
  id: string
  title: string
  description?: string
  completed: boolean
}

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)

  async function fetchTasks() {
    setLoading(true)
    const res = await fetch('/api/tasks', { credentials: 'include' })
    if (res.ok) {
      const data = await res.json()
      setTasks(data)
    } else {
      console.error('Failed to fetch tasks')
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  async function toggleComplete(id: string, completed: boolean) {
    const res = await fetch(`/api/tasks/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ completed: !completed })
    })
    if (res.ok) fetchTasks()
  }

  async function remove(id: string) {
    if (!confirm('Delete task?')) return
    const res = await fetch(`/api/tasks/${id}`, { method: 'DELETE', credentials: 'include' })
    if (res.ok) fetchTasks()
  }

  if (loading) return <div className="mt-4">Loading...</div>

  return (
    <div className="mt-4">
      {tasks.length === 0 && <div className="text-gray-600">No tasks yet.</div>}
      {tasks.map(task => (
        <div key={task.id} className="border rounded p-3 mb-2 bg-white shadow-sm flex items-start justify-between">
          <div>
            <h3 className="font-semibold">{task.title}</h3>
            {task.description && <p className="text-sm text-gray-600">{task.description}</p>}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleComplete(task.id, task.completed)}
              className="px-3 py-1 border rounded"
            >
              {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
            </button>
            <button onClick={() => remove(task.id)} className="px-3 py-1 bg-red-600 text-white rounded">
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
