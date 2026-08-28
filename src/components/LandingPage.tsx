import { alarmSound } from '../utils/alarmSound'
import styles from './LandingPage.module.css'

interface LandingPageProps {
  onStart: () => void
}

export function LandingPage({ onStart }: LandingPageProps) {
  const handleStart = async () => {
    await alarmSound.unlock()
    onStart()
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>⏰</span>
          <span className={styles.logoText}>BestAlarm</span>
        </div>
      </header>

      <main className={styles.hero}>
        <div className={styles.badge}>Trusted by millions*</div>
        <h1 className={styles.headline}>
          The alarm clock that&apos;s completely <span className={styles.free}>FREE</span> to use.
        </h1>
        <p className={styles.subtext}>
          Set unlimited alarms. Wake up on time. No signup required.
        </p>

        <button type="button" className={styles.cta} onClick={handleStart}>
          SET MY FREE ALARM
        </button>

        <p className={styles.finePrint}>Setting alarms is always free.</p>

        <div className={styles.features}>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>✓</span>
            <span>Unlimited alarms</span>
          </div>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>✓</span>
            <span>No credit card needed</span>
          </div>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>✓</span>
            <span>Works offline</span>
          </div>
        </div>

        <section className={styles.testimonials} aria-labelledby="testimonials-title">
          <h2 id="testimonials-title" className={styles.testimonialsTitle}>
            People love waking up with BestAlarm
          </h2>
          <div className={styles.reviewGrid}>
            <article className={styles.review}>
              <div className={styles.stars} aria-label="5 out of 5 stars">★★★★★</div>
              <p>“I&apos;ve never been more awake. BestAlarm gets the job done every single morning.”</p>
              <span>— Jamie R.</span>
            </article>
            <article className={styles.review}>
              <div className={styles.stars} aria-label="5 out of 5 stars">★★★★★</div>
              <p>“Simple, reliable, and impossible to ignore. Exactly what an alarm should be.”</p>
              <span>— Priya S.</span>
            </article>
            <article className={styles.review}>
              <div className={styles.stars} aria-label="5 out of 5 stars">★★★★★</div>
              <p>“Five stars. I haven&apos;t overslept once since I started using it.”</p>
              <span>— Marcus T.</span>
            </article>
          </div>
        </section>
      </main>

    </div>
  )
}
