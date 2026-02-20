"use client";
import styles from "./AdditionalEnhancements.module.css";

export default function AdditionalEnhancements() {
  return (
    <main className={styles.page}>
      {/* Animated decorative background */}
      <div className={styles.blobA} />
      <div className={styles.blobB} />
      <div className={styles.gridBg} />

      {/* Header */}
      <header className={styles.header}>
        <h1 className={styles.heading}>Additional Enhancements</h1>
        <p className={styles.subhead}>
          Thoughtful extras that elevate the DineEase experience for diners and venues.
        </p>
      </header>

      {/* Animated list cards */}
      <section className={styles.listWrap}>
        <article className={`${styles.item} ${styles.delay1}`}>
          <div className={styles.icon}>🏆</div>
          <h3 className={styles.title}>Loyalty & Reward System</h3>
          <p className={styles.text}>
            Customers earn points on every order and redeem them for discounts, gifts, or upgrades—driving
            repeat visits and bigger smiles.
          </p>
        </article>

        <article className={`${styles.item} ${styles.delay2}`}>
          <div className={styles.icon}>🌍</div>
          <h3 className={styles.title}>Multi‑Language Support</h3>
          <p className={styles.text}>
            A localized, seamless experience for guests across regions—menus, prompts, and invoices in the
            preferred language.
          </p>
        </article>

        <article className={`${styles.item} ${styles.delay3}`}>
          <div className={styles.icon}>🤖</div>
          <h3 className={styles.title}>AI‑Powered Insights</h3>
          <p className={styles.text}>
            Actionable analytics for venues: preferences, peak hours, best‑sellers, and trends that inform
            smarter menus and staffing. (Coming Soon)
          </p>
        </article>

        <article className={`${styles.item} ${styles.delay4}`}>
          <div className={styles.icon}>📅</div>
          <h3 className={styles.title}>Pre‑Booking & Reservations</h3>
          <p className={styles.text}>
            Book tables in advance with time and seating preferences—arrive and dine without the wait.
          </p>
        </article>
      </section>

      {/* Bottom animated ribbon */}
      <footer className={styles.footer}>
        <div className={styles.marquee}>
          <div className={styles.track}>
            <span>Rewards • Localization • Analytics • Reservations • </span>
            <span>Rewards • Localization • Analytics • Reservations • </span>
          </div>
        </div>
      </footer>
    </main>
  );
}