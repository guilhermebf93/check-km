'use client'

import styles from './login.module.scss'
import { createClient } from '@/lib/supabase/client'

export function LoginButton() {
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
    <button onClick={handleLogin} className={styles.loginButton}>
      Entrar com Google
    </button>
  )
}