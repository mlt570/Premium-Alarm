import { useCallback, useEffect, useRef, useState } from 'react'
import { AlarmSetup } from './components/AlarmSetup'
import { DemoEmergencyStop } from './components/DemoEmergencyStop'
import { LandingPage } from './components/LandingPage'
import { PaywallModal } from './components/PaywallModal'
import { WaitingScreen } from './components/WaitingScreen'
import { WakeUpScreen } from './components/WakeUpScreen'
import type { AppScreen } from './types'
import { alarmSound } from './utils/alarmSound'
import './App.css'

function App() {
  const [screen, setScreen] = useState<AppScreen>('landing')
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [lightModeUnlocked, setLightModeUnlocked] = useState(false)
  const [showThemePaywall, setShowThemePaywall] = useState(false)
  const [alarmTarget, setAlarmTarget] = useState<Date | null>(null)
  const [secondsRemaining, setSecondsRemaining] = useState(0)
  const [silencePrice, setSilencePrice] = useState(499)

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const firedRef = useRef(false)

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const emergencyStop = useCallback(() => {
    clearTimer()
    alarmSound.stop()
    firedRef.current = false
    setAlarmTarget(null)
    setSecondsRemaining(0)
    setSilencePrice(499)
    setScreen('landing')
  }, [clearTimer])

  const startCountdown = useCallback(
    (target: Date) => {
      clearTimer()
      firedRef.current = false
      setSilencePrice(499)
      setAlarmTarget(target)
      setScreen('waiting')

      const tick = () => {
        const remaining = Math.max(0, Math.ceil((target.getTime() - Date.now()) / 1000))
        setSecondsRemaining(remaining)

        if (remaining <= 0 && !firedRef.current) {
          firedRef.current = true
          clearTimer()
          alarmSound.start()
          setScreen('ringing')
        }
      }

      tick()
      timerRef.current = setInterval(tick, 200)
    },
    [clearTimer],
  )

  const handleSetAlarm = useCallback(
    (target: Date) => {
      startCountdown(target)
    },
    [startCountdown],
  )

  const handleStopAlarm = useCallback(() => {
    setScreen('paywall')
  }, [])

  const handleUnlock = useCallback(() => {
    alarmSound.stop()
    firedRef.current = false
    setAlarmTarget(null)
    setSecondsRemaining(0)
    setSilencePrice(499)
    setScreen('landing')
  }, [])

  const handleDecline = useCallback(() => {
    setSilencePrice((price) => price + 100)
    setScreen('ringing')
  }, [])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && (screen === 'ringing' || screen === 'paywall')) {
        emergencyStop()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [screen, emergencyStop])

  useEffect(() => {
    return () => {
      clearTimer()
      alarmSound.stop()
    }
  }, [clearTimer])

  const showEmergency = screen === 'ringing' || screen === 'paywall'
  const showThemeControl = screen !== 'ringing' && screen !== 'paywall'

  return (
    <div className="app" data-theme={theme}>
      {showThemeControl && (
        <button
          type="button"
          className="theme-control"
          onClick={() => {
            if (!lightModeUnlocked) {
              setShowThemePaywall(true)
              return
            }
            setTheme((current) => current === 'dark' ? 'light' : 'dark')
          }}
        >
          {lightModeUnlocked
            ? theme === 'dark' ? '☀ LIGHT MODE' : '☾ DARK MODE'
            : '☀ LIGHT MODE · LOCKED'}
        </button>
      )}

      {screen === 'landing' && (
        <LandingPage onStart={() => setScreen('setup')} />
      )}

      {screen === 'setup' && (
        <AlarmSetup
          onSetAlarm={handleSetAlarm}
          onBack={() => setScreen('landing')}
        />
      )}

      {screen === 'waiting' && alarmTarget && (
        <WaitingScreen
          target={alarmTarget}
          secondsRemaining={secondsRemaining}
          onCancel={emergencyStop}
        />
      )}

      {screen === 'ringing' && (
        <WakeUpScreen onStopAlarm={handleStopAlarm} />
      )}

      {screen === 'paywall' && (
        <>
          <WakeUpScreen onStopAlarm={handleStopAlarm} />
          <PaywallModal
            price={silencePrice}
            onUnlock={handleUnlock}
            onDecline={handleDecline}
          />
        </>
      )}

      <DemoEmergencyStop
        visible={showEmergency}
        onEmergencyStop={emergencyStop}
      />

      {showThemePaywall && (
        <div className="theme-paywall-backdrop">
          <div className="theme-paywall" role="dialog" aria-labelledby="theme-paywall-title">
            <div className="theme-paywall-icon">☀</div>
            <h2 id="theme-paywall-title">Unlock Light Mode</h2>
            <p>Darkness is included. Photons are a premium feature.</p>
            <div className="theme-price">$79.99</div>
            <button
              type="button"
              className="theme-buy"
              onClick={() => {
                setLightModeUnlocked(true)
                setTheme('light')
                setShowThemePaywall(false)
              }}
            >
              BUY LIGHT MODE — $79.99
            </button>
            <button
              type="button"
              className="theme-decline"
              onClick={() => setShowThemePaywall(false)}
            >
              Stay in the dark
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
