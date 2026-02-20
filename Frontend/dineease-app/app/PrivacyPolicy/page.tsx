'use client';

import React from "react";
import styles from "./PrivacyPolicy.module.css";

export default function PrivacyPolicy() {
  return (
    <main className={styles.page}>
      <div className={styles.gridBg} />
      <div className={styles.blobA} />
      <div className={styles.blobB} />

      <article className={styles.container}>
        <h1>Privacy Policy</h1>

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
          <h2>Information Collection and Use</h2>
          <p>
            We collect personal information such as your name, contact info, and order preferences only to facilitate your dining experience through our platform. We do not sell or share your personal data with third parties except as required by law.
          </p>
        </section>

        <section>
          <h2>Cookies and Tracking</h2>
          <p>
            DineEase uses cookies to improve app performance and user experience. Cookies help remember preferences and enable some features but do not contain personal identifying data.
          </p>
        </section>

        <section>
          <h2>Your Rights</h2>
          <p>
            You can request access, correction, or deletion of your personal data any time by contacting our support.
          </p>
        </section>

        <footer>
          <p>© 2025 DineEase. Developed by Darshan Akshay Upadhye.</p>
        </footer>
      </article>
    </main>
  );
}
