'use client'

import styles from './logout.module.scss'

import { createClient } from '@/lib/supabase/client'

import { LogOut } from 'lucide-react'

export function LogoutButton() {
  async function handleLogout() {
    const supabase = createClient()

    await supabase.auth.signOut()

    window.location.href = '/login'
  }

  return (
    <button onClick={handleLogout} className={styles.logOutButton}>
      <LogOut className={styles.icon} />
      <span className={styles.label}>Sair</span>
    </button>
  )
}