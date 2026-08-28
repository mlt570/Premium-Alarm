import styles from './DemoEmergencyStop.module.css'

interface DemoEmergencyStopProps {
  onEmergencyStop: () => void
  visible: boolean
}

export function DemoEmergencyStop({ onEmergencyStop, visible }: DemoEmergencyStopProps) {
  if (!visible) return null

  return (
    <button
      type="button"
      className={styles.btn}
      onClick={onEmergencyStop}
    />
  )
}
