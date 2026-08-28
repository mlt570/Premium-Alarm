import { useState } from 'react'
import type { PaywallAction } from '../types'
import styles from './PaywallModal.module.css'

interface PaywallModalProps {
  price: number
  onUnlock: () => void
  onDecline: () => void
}

export function PaywallModal({ price, onUnlock, onDecline }: PaywallModalProps) {
  const [action, setAction] = useState<PaywallAction>('idle')

  const handleUnlock = () => {
    setAction('processing')
    setTimeout(() => {
      setAction('success')
      setTimeout(onUnlock, 600)
    }, 1800)
  }

  const priceMessage = price === 499
    ? 'Introductory silence pricing — act before the market wakes up.'
    : price === 599
      ? 'Limited-time pricing has expired.'
      : 'Demand for silence has increased.'

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal} role="dialog" aria-labelledby="paywall-title">
        <div className={styles.premiumBadge}>PREMIUM</div>

        <h2 id="paywall-title" className={styles.title}>Unlock Silence</h2>

        <div className={styles.price}>
          <span className={styles.currency}>$</span>
          <span className={styles.amount}>{price}</span>
          <span className={styles.cents}>.99</span>
        </div>

        <p className={styles.priceMessage}>{priceMessage}</p>

        <p className={styles.description}>
          Your alarm is currently ringing on the <strong>Free</strong> plan.
          Upgrade to regain access to silence.
        </p>

        <ul className={styles.features}>
          <li>✓ Stop alarm instantly</li>
          <li>✓ Premium silence™ technology</li>
          <li>✓ No more ringing (probably)</li>
        </ul>

        <p className={styles.tagline}>Waking up is free. Silence is premium.</p>

        {action === 'idle' && (
          <>
            <button type="button" className={styles.unlockBtn} onClick={handleUnlock}>
              UNLOCK SILENCE — ${price}.99
            </button>
            <button type="button" className={styles.snoozeBtn} onClick={onDecline}>
              No thanks, I prefer the ringing
            </button>
          </>
        )}

        {action === 'processing' && (
          <div className={styles.processing}>
            <div className={styles.spinner} />
            <p>Processing your totally real payment…</p>
          </div>
        )}

        {action === 'success' && (
          <div className={styles.success}>
            <span>✓</span>
            <p>Silence unlocked! Enjoy your premium quiet.</p>
          </div>
        )}

      </div>
    </div>
  )
}
