/** Singleton alarm sound manager — prevents overlapping audio and cleans up properly. */
class AlarmSoundManager {
  private audioContext: AudioContext | null = null
  private oscillators: OscillatorNode[] = []
  private gainNode: GainNode | null = null
  private pulseInterval: ReturnType<typeof setInterval> | null = null
  private isPlaying = false

  async unlock(): Promise<void> {
    if (!this.audioContext) {
      this.audioContext = new AudioContext()
    }
    if (this.audioContext.state === 'suspended') {
      await this.audioContext.resume()
    }
  }

  start(): void {
    this.stop()

    if (!this.audioContext) {
      this.audioContext = new AudioContext()
    }

    const ctx = this.audioContext
    this.gainNode = ctx.createGain()
    this.gainNode.gain.value = 0.35
    this.gainNode.connect(ctx.destination)

    const createOsc = (freq: number, type: OscillatorType) => {
      const osc = ctx.createOscillator()
      osc.type = type
      osc.frequency.value = freq
      osc.connect(this.gainNode!)
      osc.start()
      this.oscillators.push(osc)
      return osc
    }

    createOsc(880, 'square')
    createOsc(660, 'sawtooth')

    let high = true
    this.pulseInterval = setInterval(() => {
      if (this.oscillators.length >= 2) {
        this.oscillators[0].frequency.setValueAtTime(high ? 880 : 740, ctx.currentTime)
        this.oscillators[1].frequency.setValueAtTime(high ? 660 : 520, ctx.currentTime)
        high = !high
      }
    }, 180)

    this.isPlaying = true
  }

  stop(): void {
    if (this.pulseInterval !== null) {
      clearInterval(this.pulseInterval)
      this.pulseInterval = null
    }

    for (const osc of this.oscillators) {
      try {
        osc.stop()
        osc.disconnect()
      } catch {
        // oscillator may already be stopped
      }
    }
    this.oscillators = []

    if (this.gainNode) {
      this.gainNode.disconnect()
      this.gainNode = null
    }

    this.isPlaying = false
  }

  get playing(): boolean {
    return this.isPlaying
  }
}

export const alarmSound = new AlarmSoundManager()
