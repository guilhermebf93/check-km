'use client'
import styles from './styles.module.scss'

import { useEffect } from 'react'
import clsx from 'clsx'

type ConfirmModalProps = {
  title: string,
  description: string,
  confirmText?: string,
  cancelText?: string,
  intent: 'default' | 'danger',
  isOpen: boolean,
  onConfirm: () => Promise<void> | void,
  onClose: () => void
}

export function ConfirmModal({
  title,
  description,
  confirmText,
  cancelText,
  intent,
  isOpen,
  onConfirm,
  onClose
}: ConfirmModalProps) {

  useEffect(() => {
    function handleKeyDown (e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  return(
    <>
      {isOpen && (
        <div 
          className={styles.overlay}
          onClick={onClose}
        >
          <div
            className={styles.modal}
            onClick={(e) => e.stopPropagation()}
          >

            <h1>{title}</h1>

            <p>{description}</p>

            <div className={styles.buttons}>
              <button 
                type='button' 
                onClick={onClose}
                className={styles.stdButton}  
              >
                {cancelText || 'Cancelar'}
              </button>
              <button 
                type='button' 
                onClick={onConfirm}
                className={clsx(
                  styles.stdButton,
                  intent === 'danger' && styles.danger
                )}  
              >
                {confirmText || 'Confirmar'}
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  )

}