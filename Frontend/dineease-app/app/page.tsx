// app/page.tsx (or pages/index.tsx)
"use client";
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.page}>
      {/* Ambient visuals */}
      <div className={styles.blobA} />
      <div className={styles.blobB} />
      <div className={styles.gridBg} />

      {/* Top-left Buttons (About, Contact) */}
      <nav className={styles.topLeftNav} aria-label="Quick links">
        <Link href="/about" className={`${styles.navBtn} ${styles.shimmer}`} aria-label="About">
          <span className={styles.btnDot} /> About
        </Link>
        <Link href="/contactus" className={styles.navBtn} aria-label="Contact">
          <span className={styles.btnDot} /> Contact Us
        </Link>
      </nav>

      {/* Hero split */}
      <section className={styles.hero}>
        {/* Left Section (Text + Button) */}
        <div className={styles.left}>
          <span className={styles.kicker}>Welcome to</span>
          <h1 className={styles.title}>DineEase</h1>
          <h2 className={styles.subtitle}>Smart Dining at Your Fingertips</h2>

          <p className={styles.description}>
            Experience hassle‑free dining with <b>DineEase</b> — order food digitally while seated in
            the restaurant or reserve a table in advance, all from one platform.
          </p>

          <Link href="/Login" className={`${styles.cta} ${styles.shimmer}`}>
            Get Started
            <Image
              src="/icons/right-arrow.png"
              alt="Arrow"
              width={18}
              height={18}
              className={styles.arrow}
            />
          </Link>

          <div className={styles.meta}>
            <span className={styles.tag}>Contactless</span>
            <span className={styles.tag}>Fast</span>
            <span className={styles.tag}>Secure</span>
          </div>
        </div>

        {/* Right Section (Logo/Illustration) */}
        <div className={styles.right}>
          <div className={styles.logoWrap}>
            <Image
              src="/logo/DineEase Official Logo.jpeg"
              alt="DineEase logo"
              fill
              sizes="(max-width: 900px) 60vw, 38vw"
              className={styles.logo}
              priority
            />
            <div className={styles.pingDot} />
          </div>

          {/* Floating chips */}
          <div className={`${styles.chip} ${styles.c1}`}>QR Menu</div>
          <div className={`${styles.chip} ${styles.c2}`}>Book Ahead</div>
          <div className={`${styles.chip} ${styles.c3}`}>Live ETA</div>
        </div>
      </section>

      {/* Bottom ribbon */}
      <section className={styles.ribbon}>
        <div className={styles.marquee}>
          <div className={styles.track}>
            <span>Order • Track • Pay • Reserve • </span>
            <span>Order • Track • Pay • Reserve • </span>
          </div>
        </div>
      </section>
    </main>
  );
}
