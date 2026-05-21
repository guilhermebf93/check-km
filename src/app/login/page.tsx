'use client'

import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  async function handleLogin() {
    const supabase = createClient()

    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'http://localhost:3000/auth/callback',
      }
    })
  }

  return(
    <main>
      <button onClick={handleLogin}>
        Entrar com Google
      </button>
    </main>
  )
}