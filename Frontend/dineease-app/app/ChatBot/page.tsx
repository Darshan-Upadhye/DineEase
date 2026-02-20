"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./chatbot.module.css";

export default function ComingSoon() {
  return (
    <main className={styles.page}>
      {/* Background layers */}
      <div className={styles.gridBg} />
      <div className={styles.blobA} />
      <div className={styles.blobB} />

      {/* Mobile-Friendly Header Container */}
      <div className={styles.mobileHeaderWrapper}>
        {/* Top-left brand */}
        <div className={styles.brandTL}>🍽 DineEase & Co.</div>

        {/* Top-right quick links */}
        <nav className={styles.topRightNav} aria-label="Quick links">
          <Link href="/Homepage" className={styles.navBtn}>
            <span className={styles.btnDot} /> Home
          </Link>
          <Link href="/contactus" className={styles.navBtn}>
            <span className={styles.btnDot} /> Contact Us
          </Link>
        </nav>
      </div>

      {/* Content split */}
      <section className={styles.content}>
        {/* Left: Logo & Text */}
        <div className={styles.textSection}>
          <div className={styles.logoWrap}>
            <Image
              src="/images/ingenibot.svg"
              alt="Ingenibot Logo"
              width={250}
              height={250}
              className={styles.logo}
              priority
            />
          </div>
          <h1 className={styles.subtitle}>Coming Soon…</h1>
          <p className={styles.description}>
            We’re sorry! Our team is diligently working on this feature. It will be launching soon. Thanks for the patience!
          </p>

          <div className={styles.ctaRow}>
            <Link href="/Homepage" className={`${styles.btn} ${styles.primary} ${styles.shimmer}`}>
              Explore DineEase
            </Link>
            <Link href="/ChatBot" className={styles.btnGhost} aria-disabled>
              Notify Me
            </Link>
          </div>
        </div>

        {/* Right: Illustration */}
        <div className={styles.imageContainer}>
          <div className={styles.illoWrap}>
            <Image
              src="/images/anouncment.svg"
              alt="Announcement Illustration"
              width={600}
              height={400}
              className={styles.announcementImage}
            />
            <div className={styles.pulseDot} />
          </div>

          {/* Floating chips (Hidden on small screens) */}
          <div className={`${styles.chip} ${styles.c1}`}>InGeniBot</div>
          <div className={`${styles.chip} ${styles.c2}`}>AI Assist</div>
          <div className={`${styles.chip} ${styles.c3}`}>24x7</div>
        </div>
      </section>

      {/* Bottom marquee ribbon */}
      <section className={styles.ribbon}>
        <div className={styles.marquee}>
          <div className={styles.track}>
            <span>Smart dining experiences are coming • Stay tuned • </span>
            <span>Smart dining experiences are coming • Stay tuned • </span>
          </div>
        </div>
      </section>
    </main>
  );
}