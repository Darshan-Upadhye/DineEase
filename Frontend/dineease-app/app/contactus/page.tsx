"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./contactus.module.css";

export default function ContactUs() {
  return (
    <main className={styles.page}>
      {/* Animated background accents */}
      <div className={styles.blobA} />
      <div className={styles.blobB} />
      <div className={styles.gridBg} />

      {/* Header */}
      <header className={styles.header}>
        <h1 className={styles.title}>Contact Us</h1>
        <p className={styles.subtitle}>
          Help is just a call, chat, or message away.
        </p>
      </header>

      {/* Cards row */}
      <section className={styles.cards}>
        {/* Phone */}
        <article className={`${styles.card} ${styles.delay1}`}>
          <div className={styles.cardHead}>
            <div className={styles.iconBadge}>📞</div>
            <h3>Call Customer Care</h3>
          </div>
          <p className={styles.cardText}>Speak with a specialist for quick assistance.</p>
          <a className={styles.cardAction} href="tel:18002721249" aria-label="Call 1800-272-1249">
            1800-272-1249
          </a>
        </article>

        {/* Chatbot */}
        <article className={`${styles.card} ${styles.delay2}`}>
          <div className={styles.cardHead}>
            <div className={styles.iconBadge}>💬</div>
            <h3>Chat with InGeniBot</h3>
          </div>
          <p className={styles.cardText}>Get instant answers and smart guidance.</p>
          <Link className={styles.cardAction} href="/ChatBot" aria-label="Open InGeniBot chat">
            Start Chat
          </Link>
          <div className={styles.botMark}>
            <Image
              src="/icons/chatbot.svg"
              alt="Chat with InGeniBot"
              width={90}
              height={90}
              className={styles.botImg}
            />
          </div>
        </article>

        {/* Email */}
        <article className={`${styles.card} ${styles.delay3}`}>
          <div className={styles.cardHead}>
            <div className={styles.iconBadge}>✉️</div>
            <h3>Write to Us</h3>
          </div>
          <p className={styles.cardText}>Share feedback or report an issue any time.</p>
          <a
            className={styles.cardAction}
            href="mailto:dineease.info@gmail.com"
            aria-label="Email servicefeedback at dineease dot com"
          >
            dineease.info@gmail.com
          </a>
        </article>
      </section>

      {/* Social strip */}
      <section className={styles.socialStrip}>
        <p className={styles.socialTitle}>Follow Us</p>
        <div className={styles.socialRow}>
          <Link className={styles.socialBtn} href="#" aria-label="Instagram">
            <Image src="/icons/instagram.svg" alt="Instagram" width={28} height={28} />
          </Link>
          <Link className={styles.socialBtn} href="#" aria-label="Facebook">
            <Image src="/icons/facebook.svg" alt="Facebook" width={28} height={28} />
          </Link>
          <Link className={styles.socialBtn} href="#" aria-label="Twitter">
            <Image src="/icons/twitter.svg" alt="Twitter" width={28} height={28} />
          </Link>
          <Link className={styles.socialBtn} href="#" aria-label="LinkedIn">
            <Image src="/icons/linkdin.svg" alt="LinkedIn" width={28} height={28} />
          </Link>
        </div>
      </section>

      {/* Bottom animated ribbon */}
      <footer className={styles.footer}>
        <div className={styles.marquee}>
          <div className={styles.track}>
            <span>We’re here to help • Daily 9 AM – 9 PM • Chat 24x7 • </span>
            <span>We’re here to help • Daily 9 AM – 9 PM • Chat 24x7 • </span>
          </div>
        </div>
      </footer>
    </main>
  );
}