import { useState } from 'react'
import { formatTime, useCurrentTime } from '../hooks/useCurrentTime'
import { alarmSound } from '../utils/alarmSound'
import styles from './AlarmSetup.module.css'

interface AlarmSetupProps {
  onSetAlarm: (target: Date) => void
  onBack: () => void
}

export function AlarmSetup({ onSetAlarm, onBack }: AlarmSetupProps) {
  const now = useCurrentTime()
  const defaultTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes() + 1).padStart(2, '0')}`

  const [timeInput, setTimeInput] = useState(defaultTime)

  const handleSetCustom = async () => {
    await alarmSound.unlock()
    const [hours, minutes] = timeInput.split(':').map(Number)
    const target = new Date()
    target.setHours(hours, minutes, 0, 0)
    if (target <= new Date()) {
      target.setDate(target.getDate() + 1)
    }
    onSetAlarm(target)
  }

  const handleDemo = async (seconds: number) => {
    await alarmSound.unlock()
    const target = new Date(Date.now() + seconds * 1000)
    onSetAlarm(target)
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <button type="button" className={styles.back} onClick={onBack}>
          ← Back
        </button>
        <div className={styles.logo}>BestAlarm</div>
      </header>

      <main className={styles.main}>
        <p className={styles.label}>Current time</p>
        <div className={styles.currentTime}>{formatTime(now)}</div>

        <div className={styles.card}>
          <label className={styles.inputLabel} htmlFor="alarm-time">
            Set your alarm
          </label>
          <input
            id="alarm-time"
            type="time"
            className={styles.timeInput}
            value={timeInput}
            onChange={(e) => setTimeInput(e.target.value)}
          />
          <button type="button" className={styles.setButton} onClick={handleSetCustom}>
            Set Alarm
          </button>
        </div>

        <div className={styles.demoSection}>
          <div className={styles.demoButtons}>
            <button type="button" className={styles.demoBtn} onClick={() => handleDemo(5)}>
              5 seconds
            </button>
            <button type="button" className={styles.demoBtn} onClick={() => handleDemo(10)}>
              10 seconds
            </button>
            <button type="button" className={styles.demoBtn} onClick={() => handleDemo(30)}>
              30 seconds
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
