import { redirect } from 'next/navigation'

import { prisma } from '@/lib/prisma'
import { createClient } from '@/lib/supabase/server'

export async function getCurrentUser() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user)
    redirect('/login')

  const dbUser = await prisma.user.findUnique({
    where: {
      supabaseId: user.id
    }
  })

  return dbUser
}