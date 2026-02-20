'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './SignUp.module.css';

// --- CONFIGURATION: GOOGLE FORM DETAILS ---
// Replace the URLs and Entry IDs below with your actual Google Form details.

// 1. CUSTOMER FORM CONFIG
const CUSTOMER_FORM_ACTION = "https://docs.google.com/forms/d/e/1FAIpQLSc1fJXviE4pRCeimUCRV3xesT8Dq1EqsswQDorfbYUatqCWmg/formResponse";
const CUSTOMER_ENTRY_NAME  = "entry.626953306";  // e.g., entry.123456
const CUSTOMER_ENTRY_EMAIL = "entry.682462987"; // e.g., entry.789012

// 2. HOTEL FORM CONFIG
const HOTEL_FORM_ACTION    = "https://docs.google.com/forms/d/e/1FAIpQLScPGI27AOgJWi1wrtavXndjXpaEcwskZmjX2u_2BLqkmqEjsg/formResponse";
const HOTEL_ENTRY_NAME     = "entry.626953306";
const HOTEL_ENTRY_EMAIL    = "entry.682462987";
// ------------------------------------------

const SignUp: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [signupType, setSignupType] = useState<'none' | 'customer' | 'hotel'>('none');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const router = useRouter();

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword((prev) => !prev);

  // --- GOOGLE FORM SUBMISSION (Background) ---
  const submitToGoogleForm = async (name: string, email: string, type: 'customer' | 'hotel') => {
    const isCustomer = type === 'customer';
    
    const actionUrl = isCustomer ? CUSTOMER_FORM_ACTION : HOTEL_FORM_ACTION;
    const nameEntryId = isCustomer ? CUSTOMER_ENTRY_NAME : HOTEL_ENTRY_NAME;
    const emailEntryId = isCustomer ? CUSTOMER_ENTRY_EMAIL : HOTEL_ENTRY_EMAIL;

    // Safety check: Don't run if IDs are placeholder
    if (actionUrl.includes("YOUR_")) return;

    const formData = new FormData();
    formData.append(nameEntryId, name);
    formData.append(emailEntryId, email);

    try {
      await fetch(actionUrl, {
        method: 'POST',
        mode: 'no-cors',
        body: formData,
      });
      console.log(`Submitted ${type} info to Google Form`);
    } catch (error) {
      console.error('Google Form Error:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    // 'fullName' corresponds to the name input for both Customer (Name) and Hotel (Hotel Name)
    const fullName = formData.get('fullName')?.toString(); 
    const email = formData.get('email')?.toString();
    const password = formData.get('password')?.toString();
    const confirmPassword = formData.get('confirmPassword')?.toString();
    const location = formData.get('location')?.toString();

    if (!fullName || !email || !password || !confirmPassword || signupType === 'none') {
      alert('Please fill all fields.');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      // 1. Submit Name & Email to Google Form (Silently)
      submitToGoogleForm(fullName, email, signupType);

      // 2. Submit to Backend
      const res = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          fullName: fullName, // UPDATED: Sends 'fullName' to match your new UserSchema
          email: email, 
          password, 
          role: signupType,
          location: location || '' 
        })
      });

      const data = await res.json();
      if (res.ok) {
        if (data.token) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('role', data.role);
        }
        setShowSuccessPopup(true);
      } else {
        alert(data.error || "Signup failed");
      }
    } catch (err) {
      console.error(err);
      alert('Server error');
    }
  };

  const closePopup = () => {
    setShowSuccessPopup(false);
  };

  const renderSignupForm = () => (
    <form className={styles.form} onSubmit={handleSubmit}>
      {/* Customer Fields */}
      {signupType === 'customer' && (
        <>
          <label className={styles.inputGroup}>
            <span className={styles.inputIcon}>🪪</span>
            <input type="text" name="fullName" placeholder="Full Name" required />
          </label>
          <label className={styles.inputGroup}>
            <span className={styles.inputIcon}>📧</span>
            <input type="email" name="email" placeholder="Email" required />
          </label>
        </>
      )}

      {/* Hotel Management Fields */}
      {signupType === 'hotel' && (
        <>
          <label className={styles.inputGroup}>
            <span className={styles.inputIcon}>🏨</span>
            <input type="text" name="fullName" placeholder="Hotel Name" required />
          </label>
          <label className={styles.inputGroup}>
            <span className={styles.inputIcon}>📍</span>
            <input type="text" name="location" placeholder="Location" required />
          </label>
          <label className={styles.inputGroup}>
            <span className={styles.inputIcon}>📧</span>
            <input type="email" name="email" placeholder="Hotel Email" required />
          </label>
        </>
      )}

      {/* Common Fields */}
      <label className={styles.inputGroup}>
        <span className={styles.inputIcon}>🔒</span>
        <input
          type={showPassword ? 'text' : 'password'}
          name="password"
          placeholder="Password"
          required
        />
        <button
          type="button"
          className={`${styles.togglePassword} ${showPassword ? styles.toggled : ''}`}
          onClick={togglePasswordVisibility}
        >
          <span className={styles.emojiFix}>{showPassword ? '🙈' : '👁️'}</span>
        </button>
      </label>

      <label className={styles.inputGroup}>
        <span className={styles.inputIcon}>🔒</span>
        <input
          type={showConfirmPassword ? 'text' : 'password'}
          name="confirmPassword"
          placeholder="Confirm Password"
          required
        />
        <button
          type="button"
          className={`${styles.togglePassword} ${showConfirmPassword ? styles.toggled : ''}`}
          onClick={toggleConfirmPasswordVisibility}
        >
          <span className={styles.emojiFix}>{showConfirmPassword ? '🙈' : '👁️'}</span>
        </button>
      </label>

      <label className={styles.remember}>
        <input type="checkbox" required /> I agree to the Terms & Conditions
      </label>

      <button className={`${styles.btn} ${styles.primary} ${styles.shimmer}`} type="submit">
        Sign Up
      </button>

      <div className={styles.signup}>
        Already have an account? <Link className={styles.link} href="/Login">Login</Link>
      </div>

      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <button
          type="button"
          className={`${styles.secondaryBtn}`}
          onClick={() => setSignupType('none')}
          style={{ cursor: 'pointer', border: 'none', background: 'none', color: '#ff6b35', fontWeight: '700' }}
        >
          &larr; Back to Sign Up options
        </button>
      </div>
    </form>
  );

  return (
    <main className={styles.page}>
      {/* Background */}
      <div className={styles.gridBg} />
      <div className={styles.blobA} />
      <div className={styles.blobB} />

      {/* Top-left brand */}
      <div className={styles.brandTL}>🍽 DineEase & Co.</div>

      {/* Top-right nav */}
      <nav className={styles.topRightNav} aria-label="Quick links">
        <Link href="/contactus" className={styles.navBtn}>
          <span className={styles.btnDot} /> Contact Us
        </Link>
        <Link href="/ChatBot" className={styles.navBtn}>
          <span className={styles.btnDot} /> Chat with Us
        </Link>
        <Link href="/about" className={styles.navBtn}>
          <span className={styles.btnDot} /> About
        </Link>
      </nav>

      {/* Sign Up Option or Form */}
      <section className={styles.optionsWrap}>
        {signupType === 'none' ? (
          <>
            {/* Customer Signup */}
            <div
              className={styles.optionCard}
              role="button"
              tabIndex={0}
              onClick={() => setSignupType('customer')}
              onKeyDown={(e) => { if (e.key === 'Enter') setSignupType('customer'); }}
            >
              <div className={styles.avatar}>🧑‍🤝‍🧑</div>
              <div className={styles.cardContent}>
                <h2>Sign Up as Customer</h2>
                <p>Create a customer account if you want to order food.</p>
              </div>
            </div>

            {/* Hotel Signup */}
            <div
              className={styles.optionCard}
              role="button"
              tabIndex={0}
              onClick={() => setSignupType('hotel')}
              onKeyDown={(e) => { if (e.key === 'Enter') setSignupType('hotel'); }}
            >
              <div className={styles.avatar}>🏨</div>
              <div className={styles.cardContent}>
                <h2>Sign Up as Hotel Management</h2>
                <p>Create a management account if you run a hotel.</p>
              </div>
            </div>
          </>
        ) : (
          <div className={styles.authWrapSingle}>
            <div className={styles.card}>
              <div className={styles.loginCardHead}>
                <div className={styles.avatar}>{signupType === 'customer' ? '🧑‍🤝‍🧑' : '🏨'}</div>
                <h1>{signupType === 'customer' ? 'Customer Sign Up' : 'Hotel Management Sign Up'}</h1>
                <p>Please fill the form below to create your account</p>
              </div>
              {renderSignupForm()}
            </div>
          </div>
        )}
      </section>

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className={styles.popupOverlay}>
          <div className={styles.popup}>
            <img
              src="/images/Done.svg"
              alt="Success"
              className={styles.doneMark}
            />
            <h2>Successfully Signed Up!</h2>
            <p>Welcome to DineEase! Your account has been created successfully. Start exploring delicious options now.</p>
            <button className={styles.popupBtn} onClick={closePopup}>
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default SignUp;