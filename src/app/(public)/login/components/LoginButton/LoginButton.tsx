'use client'

import styles from './login.module.scss'
import { createClient } from '@/lib/supabase/client'

export function LoginButton() {
  async function handleLogin() {
    const supabase = createClient()

    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'https://check-km.vercel.app/auth/callback',
      }
    })
  }

  return(
    <button onClick={handleLogin} className={styles.loginButton}>
      Entrar com Google
    </button>
  )
}