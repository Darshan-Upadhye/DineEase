'use client';

import React from "react";
import styles from "./TermsOfUse.module.css";

export default function TermsOfUse() {
  return (
    <main className={styles.page}>
      <div className={styles.gridBg} />
      <div className={styles.blobA} />
      <div className={styles.blobB} />

      <article className={styles.container}>
        <h1>Terms of Use</h1>

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
          <p>Welcome to DineEase. By accessing or using our service, you agree to comply with and be bound by these terms.</p>

          <h2>Use of Service</h2>
          <p>
            DineEase is intended for lawful use to facilitate ordering and management in restaurants and hotels only. You agree not to use the service for illegal activities or unauthorized access.
          </p>

          <h2>Account Responsibility</h2>
          <p>
            You are responsible for maintaining the confidentiality of your account and password. Any activities under your account are your responsibility.
          </p>

          <h2>Intellectual Property</h2>
          <p>
            The content, design, and software of DineEase are the property of DineEase or its licensors. Unauthorized use is prohibited.
          </p>

          <h2>Limitation of Liability</h2>
          <p>
            DineEase is provided "as is," and we do not guarantee uninterrupted service or complete accuracy of content. Use at your own risk.
          </p>

          <h2>Your Acceptance</h2>
          <p>
            By using DineEase, you accept these terms. If you do not agree, please do not use the service.
          </p>
        </section>

        <footer>
          <p>© 2025 DineEase. Developed by Darshan Akshay Upadhye.</p>
        </footer>
      </article>
    </main>
  );
}
