// app/learnmore/page.tsx (or pages/learnmore.tsx)
"use client";
import Link from "next/link";
import styles from "./learnmore.module.css";

export default function LearnMore() {
  return (
    <main className={styles.page}>
      {/* Background animated gradient blobs */}
      <div className={styles.blobA} />
      <div className={styles.blobB} />
      <div className={styles.blobC} />

      {/* Header */}
      <header className={styles.header}>
        <h1 className={styles.title}>
          Explore DineEase
          <span className={styles.sparkle}> ✨</span>
        </h1>
        <p className={styles.subtitle}>
          Quick jump into topics, with smooth micro‑interactions and motion.
        </p>
      </header>

      {/* Cards grid */}
      <section className={styles.gridWrap}>
        <nav className={styles.grid}>
          <Link href="/whatisdineease" className={`${styles.card} ${styles.delay1}`}>
            <div className={styles.cardIcon}>📖</div>
            <h3>What is DineEase?</h3>
            <p>Understand the platform and how it transforms dining.</p>
            <span className={styles.pill}>Read</span>
          </Link>

          <Link href="/WhyWasDineEaseDeveloped" className={`${styles.card} ${styles.delay2}`}>
            <div className={styles.cardIcon}>💡</div>
            <h3>Why it was developed?</h3>
            <p>The problem, the idea, and the solution we built.</p>
            <span className={styles.pill}>Story</span>
          </Link>

          <Link href="/WhoBenefitsFromDineEase" className={`${styles.card} ${styles.delay3}`}>
            <div className={styles.cardIcon}>👥</div>
            <h3>Who benefits from it?</h3>
            <p>Diners, restaurants, and teams—everyone wins.</p>
            <span className={styles.pill}>People</span>
          </Link>

          <Link href="/OurVisionMission" className={`${styles.card} ${styles.delay4}`}>
            <div className={styles.cardIcon}>🎯</div>
            <h3>Our mission & vision</h3>
            <p>Where we’re going and how we plan to get there.</p>
            <span className={styles.pill}>Vision</span>
          </Link>

          <Link href="/Homepage" className={`${styles.card} ${styles.delay6}`}>
            <div className={styles.cardIcon}>🏠</div>
            <h3>Home page</h3>
            <p>Browse hotels, filter, and book a table.</p>
            <span className={styles.pill}>Home</span>
          </Link>

          <Link href="/contactus" className={`${styles.card} ${styles.delay7}`}>
            <div className={styles.cardIcon}>🧭</div>
            <h3>Contact Us</h3>
            <p>Need any Help Regarding-Browse hotels, filter, and book a table, Contact Us.</p>
            <span className={styles.pill}>Contact</span>
          </Link>
        </nav>
      </section>

      {/* Bottom CTA strip */}
      <section className={styles.ctaStrip}>
        <p className={styles.ctaText}>Prefer a quick start?</p>
        <Link href="/Homepage" className={`${styles.ctaBtn} ${styles.shimmer}`}>
          Go to Booking
        </Link>
      </section>
    </main>
  );
}
