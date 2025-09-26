import './globals.css'
import Link from 'next/link'
import UserMenu from '@/components/UserMenu'

export const dynamic = 'force-dynamic'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="container mx-auto px-4">
        <header className="flex items-center justify-between py-4">
          <h1 className="text-xl font-semibold">Tasks</h1>
          <nav className="flex items-center gap-4">
            <Link href="/">Home</Link>
            <Link href="/dashboard">Dashboard</Link>

            <UserMenu />
          </nav>
        </header>

        <main>{children}</main>
      </body>
    </html>
  )
}
