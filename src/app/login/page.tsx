'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    if (res.ok) {
      // token set via httpOnly cookie, redirect to dashboard
      router.push('/dashboard')
    } else {
      const data = await res.json()
      alert(data?.error || 'Login failed')
    }
  }

  return (
    <div className="max-w-md mx-auto py-8">
      <h2 className="text-2xl mb-4 font-semibold">Login</h2>
      <form onSubmit={submit} className="space-y-3">
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Email"
        />
        <input
          value={password}
          onChange={e => setPassword(e.target.value)}
          type="password"
          className="w-full p-2 border rounded"
          placeholder="Password"
        />
        <div className="flex gap-2">
          <button className="bg-blue-600 text-white px-4 py-2 rounded">Login</button>
          {/* 👇 New Register button */}
          <Link
            href="/register"
            className="px-4 py-2 border rounded bg-gray-100 hover:bg-gray-200"
          >
            Register
          </Link>
        </div>
      </form>
    </div>
  )
}
