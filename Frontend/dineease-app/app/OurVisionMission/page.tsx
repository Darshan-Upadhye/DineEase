"use client";
import Link from "next/link";
import Image from "next/image";
import styles from "./OurVisionMission.module.css";

export default function OurVisionMission() {
  return (
    <main className={styles.page}>
      {/* Animated background accents */}
      <div className={styles.blobA} />
      <div className={styles.blobB} />
      <div className={styles.gridBg} />

      {/* Header */}
      <header className={styles.header}>
        <span className={styles.kicker}>DineEase</span>
        <h1 className={styles.title}>The Future of Smart Dining</h1>
        <h2 className={styles.sectionTitle}>Our Vision & Mission</h2>
      </header>

      {/* Vision + Mission cards */}
      <section className={styles.cards}>
        <article className={`${styles.card} ${styles.delay1}`}>
          <div className={styles.cardHead}>
            <Image
              src="/icons/vission.svg"
              alt="Vision icon"
              width={40}
              height={40}
              className={styles.cardIcon}
            />
            <h3 className={styles.cardTitle}>Vision</h3>
          </div>
          <p className={styles.cardText}>
            To redefine the dining experience through seamless digital innovation, ensuring convenience,
            efficiency, and satisfaction for both customers and businesses in the hospitality industry.
          </p>

          {/* Animated ring accent */}
          <div className={styles.rings}>
            <span className={`${styles.ring} ${styles.r1}`} />
            <span className={`${styles.ring} ${styles.r2}`} />
            <span className={`${styles.ring} ${styles.r3}`} />
          </div>
        </article>

        <article className={`${styles.card} ${styles.delay2}`}>
          <div className={styles.cardHead}>
            <Image
              src="/icons/mission.svg"
              alt="Mission icon"
              width={40}
              height={40}
              className={styles.cardIcon}
            />
            <h3 className={styles.cardTitle}>Mission</h3>
          </div>

          <ul className={styles.missionList}>
            <li className={styles.missionItem}>
              <span className={styles.bullet}>•</span>
              <span>To simplify and enhance food ordering with a smart, contactless digital solution.</span>
            </li>
            <li className={styles.missionItem}>
              <span className={styles.bullet}>•</span>
              <span>To empower hotels and restaurants with advanced technology for efficient order management.</span>
            </li>
            <li className={styles.missionItem}>
              <span className={styles.bullet}>•</span>
              <span>To provide real‑time tracking, AI‑driven recommendations, and secure payment options.</span>
            </li>
            <li className={styles.missionItem}>
              <span className={styles.bullet}>•</span>
              <span>To improve customer experience while optimizing operations and profitability.</span>
            </li>
          </ul>

          {/* Animated pulse bar */}
          <div className={styles.pulseBar}>
            <span className={styles.pulse} />
          </div>
        </article>
      </section>

      {/* Bottom CTA */}
      <section className={styles.actions}>
        <Link href="/learnmore" className={`${styles.btn} ${styles.primary} ${styles.shimmer}`}>
          Learn More
        </Link>
        <Link href="/Homepage" className={`${styles.btn} ${styles.ghost}`}>
          Explore Booking
        </Link>
      </section>

      {/* Bottom marquee */}
      <footer className={styles.footer}>
        <div className={styles.marquee}>
          <div className={styles.track}>
            <span>Innovation • Hospitality • Convenience • Trust • </span>
            <span>Innovation • Hospitality • Convenience • Trust • </span>
          </div>
        </div>
      </footer>
    </main>
  );
}