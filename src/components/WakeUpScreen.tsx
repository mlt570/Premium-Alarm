import styles from './WakeUpScreen.module.css'

interface WakeUpScreenProps {
  onStopAlarm: () => void
}

export function WakeUpScreen({ onStopAlarm }: WakeUpScreenProps) {
  return (
    <div className={styles.overlay}>
      <div className={styles.pulse} aria-hidden="true" />
      <div className={styles.content}>
        <div className={styles.icon}>🔔</div>
        <h1 className={styles.title}>WAKE UP!</h1>
        <p className={styles.subtitle}>Your free alarm is doing its job.</p>

        <button type="button" className={styles.stopBtn} onClick={onStopAlarm}>
          STOP ALARM
        </button>

        <p className={styles.hint}>Your Free plan includes unlimited ringing.</p>
      </div>
    </div>
  )
}
