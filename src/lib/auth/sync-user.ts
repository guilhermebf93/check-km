import { prisma } from '@/lib/prisma'
import { User } from '@supabase/supabase-js'

export async function syncUser(user: User) {
  if (!user.email) return

  const existingUser = await prisma.user.findUnique({
    where: {
      supabaseId: user.id
    }
  })

  if (existingUser) {
    await prisma.user.update({
      where: {
        id: existingUser.id
      },
      data: {
        name: user.user_metadata.full_name,
        avatarUrl: user.user_metadata.avatar_url,
        email: user.email
      }
    })

    return existingUser
  }

  const newUser = await prisma.user.create({
    data: {
      supabaseId: user.id,
      email: user.email,
      name: user.user_metadata.full_name,
      avatarUrl: user.user_metadata.avatar_url
    }
  })

  return newUser
}