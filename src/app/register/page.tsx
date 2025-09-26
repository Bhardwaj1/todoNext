'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    })
    if (res.ok) {
      router.push('/dashboard')
    } else {
      const data = await res.json()
      alert(data?.error || 'Register failed')
    }
  }

  return (
    <div className="max-w-md mx-auto py-8">
      <h2 className="text-2xl mb-4">Register</h2>
      <form onSubmit={submit} className="space-y-3">
        <input value={name} onChange={e => setName(e.target.value)} className="w-full p-2 border" placeholder="Name (optional)" />
        <input value={email} onChange={e => setEmail(e.target.value)} className="w-full p-2 border" placeholder="Email" />
        <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="w-full p-2 border" placeholder="Password" />
        <div className="flex gap-2">
          <button className="bg-green-600 text-white px-4 py-2 rounded">Register</button>
        </div>
      </form>
    </div>
  )
}
