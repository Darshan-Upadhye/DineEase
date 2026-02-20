'use client';

import React from "react";
import styles from "./CookiesPolicy.module.css";

export default function CookiesPolicy() {
  return (
    <main className={styles.page}>
      <div className={styles.gridBg} />
      <div className={styles.blobA} />
      <div className={styles.blobB} />

      <article className={styles.container}>
        <h1>Cookies Policy</h1>

        <section>
          <p><strong>What is DineEase?</strong><br />
            DineEase is an innovative digital dining solution designed to streamline hotel and restaurant management. Guests scan a QR code at the table or select a venue in the app to browse live menus and place orders digitally—fast, accurate, and contactless.
          </p>

          <p><strong>Why Choose DineEase?</strong><br />
            Cut wait times, improve order accuracy, and boost satisfaction. Whether it’s a hotel or a neighborhood restaurant, DineEase helps manage orders efficiently while delivering a superior dining experience.
          </p>

          <p><strong>How it Works</strong><br />
            Scan a QR or pick a venue to open a live digital menu. Customize dishes with spice levels, add‑ons, and notes. See prep time and order status in real time. Pay securely, split bills, or settle at the counter. Reserve a table in advance for any occasion.
          </p>
        </section>

        <section>
          <h2>What are Cookies?</h2>
          <p>
            Cookies are small text files stored on your device by your browser. They help remember preferences, login status, and other features.
          </p>

          <h2>How We Use Cookies</h2>
          <ul>
            <li>Ensure proper functioning of our services.</li>
            <li>Remember your preferences and login details securely.</li>
            <li>Analyze app usage to improve performance.</li>
          </ul>

          <h2>Managing Cookies</h2>
          <p>
            You can control cookies through your browser settings. Disabling cookies may reduce functionality and user experience.
          </p>

          <h2>Third-Party Cookies</h2>
          <p>
            We may use third-party services to provide analytics. These providers may also place cookies to gather information in accordance with their policies.
          </p>
        </section>

        <footer>
          <p>© 2025 DineEase. Developed by Darshan Akshay Upadhye.</p>
        </footer>
      </article>
    </main>
  );
}
