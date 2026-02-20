// app/whatisdineease/page.tsx (or pages/whatisdineease.tsx)
"use client";
import Link from "next/link";
import styles from "./whatisdineease.module.css";

export default function WhatIsDineEase() {
  return (
    <main className={styles.page}>
      {/* Animated gradient orbs */}
      <div className={styles.orbA} />
      <div className={styles.orbB} />
      <div className={styles.orbC} />

      {/* Hero split: left intro, right marquee word */}
      <section className={styles.hero}>
        <div className={styles.left}>
          <span className={styles.kicker}>Introducing</span>
          <h1 className={styles.heading}>
            DineEase
            <span className={styles.glow}> •</span>
          </h1>
          <h2 className={styles.subheading}>The Future of Smart Dining</h2>
        </div>

        <div className={styles.right}>
          <div className={styles.marquee}>
            <div className={styles.track}>
              <span>Smart Ordering • QR Menus • Instant ETA • Secure Payment • Advance Booking • </span>
              <span>Smart Ordering • QR Menus • Instant ETA • Secure Payment • Advance Booking • </span>
            </div>
          </div>
        </div>
      </section>

      {/* Content cards */}
      <section className={styles.content}>
        <article className={`${styles.card} ${styles.delay1}`}>
          <h3 className={styles.title}>What is DineEase?</h3>
          <p className={styles.text}>
            DineEase is an innovative digital dining solution designed to streamline hotel and restaurant
            management. Guests scan a QR code at the table or select a venue in the app to browse live menus
            and place orders digitally—fast, accurate, and contactless.
          </p>
        </article>

        <article className={`${styles.card} ${styles.delay2}`}>
          <h3 className={styles.title}>Why Choose DineEase?</h3>
          <p className={styles.text}>
            Cut wait times, improve order accuracy, and boost satisfaction. Whether it’s a hotel or a
            neighborhood restaurant, DineEase helps manage orders efficiently while delivering a superior
            dining experience.
          </p>
        </article>

        <article className={`${styles.card} ${styles.delay3}`}>
          <h3 className={styles.title}>How it Works</h3>
          <ul className={styles.list}>
            <li>Scan a QR or pick a venue to open a live digital menu.</li>
            <li>Customize dishes with spice levels, add‑ons, and notes.</li>
            <li>See prep time and order status in real time.</li>
            <li>Pay securely, split bills, or settle at the counter.</li>
            <li>Reserve a table in advance for any occasion.</li>
          </ul>
        </article>
      </section>

      {/* CTA Row */}
      <section className={styles.actions}>
        <Link href="/KeyFeatures" className={`${styles.btn} ${styles.primary} ${styles.shimmer}`}>
          Key Features of DineEase
        </Link>
        <Link href="/learnmore" className={`${styles.btn} ${styles.ghost}`}>
          Learn More
        </Link>
        <Link href="/AdditionalEnhancements" className={`${styles.btn} ${styles.ghost}`}>
          Additional Enhancements
        </Link>
      </section>
    </main>
  );
}
