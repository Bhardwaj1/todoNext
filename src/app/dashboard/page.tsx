import { redirect } from 'next/navigation'
import { getUser } from '@/lib/getUser'
import DashboardClient from '../../components/DashboardClient'

export default async function DashboardPage() {
  const user = await getUser()
  if (!user) {
    redirect('/login')
  }

  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <DashboardClient />
    </section>
  )
}
