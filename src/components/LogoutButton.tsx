'use client'
import { useRouter } from 'next/navigation'

interface LogoutButtonProps {
  onLogout?: () => void
}

export default function LogoutButton({ onLogout }: LogoutButtonProps) {
  const router = useRouter()

  async function handleLogout() {
    try {
      const res = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      })
      if (res.ok) {
        onLogout?.()
        router.replace('/login')
      } else {
        alert('Logout failed')
      }
    } catch (err) {
      console.error(err)
      alert('Logout failed')
    }
  }

  return (
    <button
      onClick={handleLogout}
      className="ml-4 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
    >
      Logout
    </button>
  )
}
