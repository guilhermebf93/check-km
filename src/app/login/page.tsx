import styles from './page.module.scss'
import { LoginButton } from './components/LoginButton/LoginButton'

import { Gauge } from 'lucide-react'

export default function LoginPage() {

  return(
    <main className={styles.loginMain}>
      <div className={styles.loginForm}>
        <div className={styles.logoBg}>
          <Gauge
            size={150}
            strokeWidth={3}
          />
        </div>
        
        <h1 className={styles.title}>CHECK KM</h1>
        <p className={styles.subtitle}>Seu veículo, sempre sobre controle</p>

        <LoginButton />

        <p>Ao continuar, você concorda com os</p>
        <p><a href="#" target='_blank' className={styles.terms}>Termos de uso</a> e <a href="#" target='_blank' className={styles.terms}>Política de privacidade</a>.</p>
      </div>      
    </main>
  )
}