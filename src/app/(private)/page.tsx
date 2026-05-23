import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
//import { getCurrentUser } from '@/lib/auth/get-user'

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }


  return(
    <main>
      <h1>Olá, {user.user_metadata.full_name}</h1>
    </main>
  )
}