"use client";
import Link from "next/link";
import styles from "./WhoBenefitsFromDineEase.module.css";

export default function WhoBenefitsFromDineEase() {
  return (
    <main className={styles.page}>
      {/* Animated background accents */}
      <div className={styles.blobA} />
      <div className={styles.blobB} />
      <div className={styles.gridBg} />

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroLeft}>
          <span className={styles.kicker}>DineEase</span>
          <h1 className={styles.heading}>The Future of Smart Dining</h1>
          <p className={styles.subtitle}>
            One platform. Many winners. See who benefits—and how.
          </p>
        </div>

        <div className={styles.heroRight}>
          <div className={styles.orbit}>
            <span className={`${styles.dot} ${styles.d1}`} title="Customers" />
            <span className={`${styles.dot} ${styles.d2}`} title="Restaurants" />
            <span className={`${styles.dot} ${styles.d3}`} title="Waitstaff" />
            <span className={`${styles.dot} ${styles.d4}`} title="Kitchen" />
            <span className={`${styles.dot} ${styles.d5}`} title="Owners" />
            <div className={styles.core}>DE</div>
          </div>
        </div>
      </section>

      {/* Benefits grid */}
      <section className={styles.benefits}>
        <h2 className={styles.sectionTitle}>Who Benefits from DineEase?</h2>

        <ul className={styles.list}>
          <li className={`${styles.card} ${styles.delay1}`}>
            <h3 className={styles.cardTitle}>Customers</h3>
            <p className={styles.cardText}>
              Enjoy a hassle‑free dining experience with quick digital ordering, real‑time order tracking, and convenient online payments.
            </p>
          </li>

          <li className={`${styles.card} ${styles.delay2}`}>
            <h3 className={styles.cardTitle}>Hotels & Restaurants</h3>
            <p className={styles.cardText}>
              Streamline operations, reduce wait times, improve order accuracy, and enhance satisfaction while gaining meaningful business insights.
            </p>
          </li>

          <li className={`${styles.card} ${styles.delay3}`}>
            <h3 className={styles.cardTitle}>Waitstaff</h3>
            <p className={styles.cardText}>
              Focus on hospitality instead of manual order taking and payments, improving efficiency and service quality.
            </p>
          </li>

          <li className={`${styles.card} ${styles.delay4}`}>
            <h3 className={styles.cardTitle}>Chefs & Kitchen Staff</h3>
            <p className={styles.cardText}>
              Receive clear, organized digital orders to reduce errors and optimize preparation time.
            </p>
          </li>

          <li className={`${styles.card} ${styles.delay5}`}>
            <h3 className={styles.cardTitle}>Business Owners & Managers</h3>
            <p className={styles.cardText}>
              Gain data‑driven insights on preferences, peak hours, and best‑sellers to improve decisions and boost revenue.
            </p>
          </li>
        </ul>

        <div className={styles.actions}>
          <Link href="/learnmore" className={`${styles.btn} ${styles.primary} ${styles.shimmer}`}>
            Learn More
          </Link>
          <Link href="/Homepage" className={`${styles.btn} ${styles.ghost}`}>
            Explore Booking
          </Link>
        </div>
      </section>

      {/* Bottom marquee */}
      <footer className={styles.footer}>
        <div className={styles.marquee}>
          <div className={styles.track}>
            <span>Customers • Restaurants • Staff • Kitchens • Owners • </span>
            <span>Customers • Restaurants • Staff • Kitchens • Owners • </span>
          </div>
        </div>
      </footer>
    </main>
  );
}