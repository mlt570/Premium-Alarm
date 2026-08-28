import { formatCountdown, formatTime } from '../hooks/useCurrentTime'
import styles from './WaitingScreen.module.css'

interface WaitingScreenProps {
  target: Date
  secondsRemaining: number
  onCancel: () => void
}

export function WaitingScreen({ target, secondsRemaining, onCancel }: WaitingScreenProps) {
  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <div className={styles.emoji}>🎉</div>
        <h1 className={styles.title}>Your free alarm is set!</h1>
        <p className={styles.target}>Alarm at {formatTime(target)}</p>

        <div className={styles.countdown}>
          <span className={styles.countdownLabel}>Ringing in</span>
          <span className={styles.countdownValue}>{formatCountdown(secondsRemaining)}</span>
        </div>

        <p className={styles.reassurance}>Setting alarms is always free. Sleep tight.</p>

        <button type="button" className={styles.cancel} onClick={onCancel}>
          Cancel alarm
        </button>
      </div>
    </div>
  )
}
