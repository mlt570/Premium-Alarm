import { useEffect, useState } from 'react'

export function useCurrentTime(active = true): Date {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    if (!active) return

    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [active])

  return now
}

export function formatTime(date: Date): string {
  return date.toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
  })
}

export function formatCountdown(totalSeconds: number): string {
  const mins = Math.floor(totalSeconds / 60)
  const secs = totalSeconds % 60
  if (mins > 0) {
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }
  return `${secs}s`
}
