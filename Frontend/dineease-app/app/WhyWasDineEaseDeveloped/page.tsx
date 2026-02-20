"use client";
import Link from "next/link";
import styles from "./WhyWasDineEaseDeveloped.module.css";

export default function WhyWasDineEaseDeveloped() {
  return (
    <main className={styles.page}>
      {/* Animated background accents */}
      <div className={styles.blobA} />
      <div className={styles.blobB} />
      <div className={styles.gridBg} />

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.left}>
          <span className={styles.kicker}>DineEase</span>
          <h1 className={styles.heading}>
            The Future of <span className={styles.highlight}>Smart Dining</span>
          </h1>
          <p className={styles.subtitle}>
            Built to make dining faster, clearer, and delightfully seamless.
          </p>
        </div>

        <div className={styles.right}>
          <div className={styles.rings}>
            <span className={`${styles.ring} ${styles.r1}`} />
            <span className={`${styles.ring} ${styles.r2}`} />
            <span className={`${styles.ring} ${styles.r3}`} />
            <span className={`${styles.ring} ${styles.r4}`} />
          </div>
        </div>
      </section>

      {/* Why section */}
      <section className={styles.why}>
        <h2 className={styles.subheading}>Why Was DineEase Developed?</h2>
        <p className={styles.text}>
          DineEase was created to modernize and streamline the dining journey—reducing wait times,
          eliminating miscommunication, and improving service efficiency. Digital ordering, real‑time
          tracking, and secure payments give diners clarity and control, while venues gain smoother
          order management, less dependency on waitstaff, and actionable insights into preferences.
          The result is a smooth, hassle‑free dining experience that also boosts operational efficiency.
        </p>

        <div className={styles.benefits}>
          <div className={`${styles.benefit} ${styles.delay1}`}>
            <div className={styles.icon}>⏱️</div>
            <h3>Reduced Waiting</h3>
            <p>Place and track orders instantly to keep the meal moving.</p>
          </div>
          <div className={`${styles.benefit} ${styles.delay2}`}>
            <div className={styles.icon}>🔊</div>
            <h3>No Miscommunication</h3>
            <p>Clear digital notes and customizations reduce errors.</p>
          </div>
          <div className={`${styles.benefit} ${styles.delay3}`}>
            <div className={styles.icon}>📈</div>
            <h3>Operational Upside</h3>
            <p>Efficient flow for staff, insightful data for better decisions.</p>
          </div>
          <div className={`${styles.benefit} ${styles.delay4}`}>
            <div className={styles.icon}>🔒</div>
            <h3>Seamless Payments</h3>
            <p>Flexible, secure payment options—split, online, or cash.</p>
          </div>
        </div>

        <div className={styles.actions}>
          <Link href="/learnmore" className={`${styles.btn} ${styles.primary} ${styles.shimmer}`}>
            Learn More
          </Link>
          <Link href="/Homepage" className={`${styles.btn} ${styles.ghost}`}>
            Explore Booking
          </Link>
        </div>
      </section>

      {/* Bottom animated marquee */}
      <footer className={styles.footer}>
        <div className={styles.marquee}>
          <div className={styles.track}>
            <span>Faster • Clearer • Contactless • Insight‑Driven • </span>
            <span>Faster • Clearer • Contactless • Insight‑Driven • </span>
          </div>
        </div>
      </footer>
    </main>
  );
}