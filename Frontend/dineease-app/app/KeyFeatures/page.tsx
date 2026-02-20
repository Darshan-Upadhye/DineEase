"use client";
import styles from "./KeyFeatures.module.css";

export default function KeyFeatures() {
  return (
    <main className={styles.page}>
      {/* Background Elements */}
      <div className={styles.blobA} />
      <div className={styles.blobB} />
      <div className={styles.gridBg} />

      {/* Header */}
      <header className={styles.header}>
        <h1 className={styles.heading}>Key Features of DineEase</h1>
        <p className={styles.subhead}>
          Smooth ordering, clear wait times, and modern payments—built for delightful dining.
        </p>
      </header>

      {/* Feature list */}
      <section className={styles.features}>
        <article className={`${styles.feature} ${styles.delay1}`}>
          <div className={styles.icon}>🔗</div>
          <h3 className={styles.title}>QR Code-Based Ordering</h3>
          <p className={styles.desc}>
            Scan a QR at the table to open the live menu and place orders instantly—no waiting required.
          </p>
        </article>

        <article className={`${styles.feature} ${styles.delay2}`}>
          <div className={styles.icon}>📍</div>
          <h3 className={styles.title}>Direct Venue Selection</h3>
          <p className={styles.desc}>
            Browse hotels and restaurants, order ahead, or schedule pickups while on the go.
          </p>
        </article>

        <article className={`${styles.feature} ${styles.delay3}`}>
          <div className={styles.icon}>✨</div>
          <h3 className={styles.title}>Smart Suggestions</h3>
          <p className={styles.desc}>
            Personalized recommendations based on preferences and past orders help decide faster.
          </p>
        </article>

        <article className={`${styles.feature} ${styles.delay4}`}>
          <div className={styles.icon}>➕</div>
          <h3 className={styles.title}>Add‑ons Mid‑Meal</h3>
          <p className={styles.desc}>
            Want more while dining? Add dishes to the ongoing order without waiting for staff.
          </p>
        </article>

        <article className={`${styles.feature} ${styles.delay5}`}>
          <div className={styles.icon}>⏱️</div>
          <h3 className={styles.title}>Real‑Time Tracking</h3>
          <p className={styles.desc}>
            See accurate prep ETAs and status updates so expectations stay clear.
          </p>
        </article>

        <article className={`${styles.feature} ${styles.delay6}`}>
          <div className={styles.icon}>🧾</div>
          <h3 className={styles.title}>E‑Invoice & Payments</h3>
          <p className={styles.desc}>
            Get an automated digital invoice and pay securely online—or settle with cash.
          </p>
        </article>

        <article className={`${styles.feature} ${styles.delay7}`}>
          <div className={styles.icon}>⭐</div>
          <h3 className={styles.title}>Instant Feedback</h3>
          <p className={styles.desc}>
            Share quick ratings and suggestions to help venues improve service continuously.
          </p>
        </article>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.marquee}>
          <div className={styles.track}>
            <span>Contactless • Fast • Accurate • Delightful • </span>
            <span>Contactless • Fast • Accurate • Delightful • </span>
          </div>
        </div>
      </footer>
    </main>
  );
}