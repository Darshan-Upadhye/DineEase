'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './Login.module.css';

const ADMIN_CODE = '493579';

// --- GOOGLE FORM CONFIGURATION ---
// PASTE YOUR GOOGLE FORM LINK HERE (ends in /formResponse)
const GOOGLE_FORM_ACTION_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfJnzqego-iaFxWOd4y2GdVCeIOLejA2db6ilzvsrnv5IasAA/formResponse"; 
// PASTE YOUR GOOGLE FORM ENTRY ID FOR EMAIL HERE (e.g., entry.123456789)
const GOOGLE_FORM_EMAIL_ENTRY_ID = "entry.1274816690"; 

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginType, setLoginType] = useState<'none' | 'customer' | 'hotel'>('none');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showAdminPopup, setShowAdminPopup] = useState(false);
  const [showAdminSuccessPopup, setShowAdminSuccessPopup] = useState(false);
  const [adminCode, setAdminCode] = useState('');
  const [adminError, setAdminError] = useState('');
  const router = useRouter();

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email')?.toString();
    const password = formData.get('password')?.toString();

    // Client-side validation
    if (!email || !password || loginType === 'none') {
      alert('Please fill all fields.');
      return;
    }

    // --- GOOGLE FORM CONNECTION ---
    if (email && GOOGLE_FORM_ACTION_URL.includes('docs.google.com')) {
      const googleFormData = new FormData();
      googleFormData.append(GOOGLE_FORM_EMAIL_ENTRY_ID, email);
      
      try {
        await fetch(GOOGLE_FORM_ACTION_URL, {
          method: 'POST',
          mode: 'no-cors',
          body: googleFormData
        });
      } catch (gfError) {
        console.error("Google Form Error:", gfError);
      }
    }

    // --- MAIN APP LOGIN ---
    try {
      const res = await fetch('https://dineease-jw8m.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // FIX: Sending 'email' value as 'username' key because your backend likely expects 'username'
        body: JSON.stringify({ username: email, password })
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);
        setShowSuccessPopup(true);
      } else {
        // This alerts the error from the backend (e.g. "All fields are required")
        alert(data.error);
      }
    } catch (err) {
      console.error(err);
      alert('Server error');
    }
  };

  const closePopup = () => {
    setShowSuccessPopup(false);
    const role = localStorage.getItem('role');
    if (role === 'customer') router.push('/CustomerDashboard');
    else if (role === 'hotel') router.push('/HotelManagementDashboard');
  };

  const handleGuestLogin = () => {
    router.push('/Homepage');
  };

  const handleAdminSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (adminCode === ADMIN_CODE) {
      setAdminError('');
      setShowAdminPopup(false);
      setShowAdminSuccessPopup(true);
    } else {
      setAdminError('Incorrect code. Please try again.');
    }
  };

  const closeAdminSuccessPopup = () => {
    setShowAdminSuccessPopup(false);
    router.push('/AdminDashboard');
  };

  const handleAdminBtnClick = () => {
    setShowAdminPopup(true);
    setAdminCode('');
    setAdminError('');
  };

  const renderLoginForm = () => (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.inputGroup}>
        <span className={styles.inputIcon} aria-hidden="true">📧</span>
        <input
          type="email"
          name="email"
          placeholder="Email"
          aria-label="Email"
          required
        />
      </label>

      <label className={styles.inputGroup}>
        <span className={styles.inputIcon} aria-hidden="true">🔒</span>
        <input
          type={showPassword ? 'text' : 'password'}
          name="password"
          placeholder="Password"
          aria-label="Password"
          required
        />
        <button
          type="button"
          className={`${styles.togglePassword} ${showPassword ? styles.toggled : ''}`}
          onClick={togglePasswordVisibility}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          title={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? '🙈' : '👁️'}
        </button>
      </label>

      <div className={styles.options}>
        <label className={styles.remember}>
          <input type="checkbox" /> Keep me logged in
        </label>
        <a className={styles.link} href="#">Forgot Password?</a>
      </div>

      <button className={`${styles.btn} ${styles.primary} ${styles.shimmer}`} type="submit">
        Login
      </button>

      <div className={styles.signup}>
        Don’t have an account? <Link className={styles.link} href="/SignUp">Sign Up</Link>
      </div>

      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <button
          type="button"
          className={`${styles.secondaryBtn}`}
          onClick={() => setLoginType('none')}
          style={{ cursor: 'pointer', border: 'none', background: 'none', color: '#ff6b35', fontWeight: '700' }}
        >
          &larr; Back to login options
        </button>
      </div>
    </form>
  );

  return (
    <main className={styles.page}>
      {/* Ambient background */}
      <div className={styles.gridBg} />
      <div className={styles.blobA} />
      <div className={styles.blobB} />

      {/* Top bars */}
      <header className={styles.header}>
        <div className={styles.brandTL}>🍽 DineEase & Co.</div>
        <nav className={styles.topRightNav} aria-label="Quick links">
          <Link href="/contactus" className={styles.navBtn}>
            <span className={styles.btnDot} /> <span className={styles.textBold}>Contact Us</span>
          </Link>
          <button
            type="button"
            className={styles.navBtn}
            onClick={handleAdminBtnClick}
            aria-label="System administrator login"
          >
            <span className={styles.btnDot} /> <span className={styles.textBold}>System Admin Login</span>
          </button>
          <Link href="/ChatBot" className={styles.navBtn}>
            <span className={styles.btnDot} /> <span className={styles.textBold}>Chat with Us</span>
          </Link>
          <Link href="/about" className={styles.navBtn}>
            <span className={styles.btnDot} /> <span className={styles.textBold}>About</span>
          </Link>
        </nav>
      </header>

      {/* Login option screens or form */}
      <section className={styles.optionsWrap}>
        {loginType === 'none' ? (
          <>
            <div
              className={styles.optionCard}
              role="button"
              tabIndex={0}
              onClick={() => setLoginType('customer')}
              onKeyDown={(e) => { if (e.key === 'Enter') setLoginType('customer'); }}
              aria-label="Customer Login"
            >
              <div className={styles.avatar}>🧑‍🤝‍🧑</div>
              <h2>Customer Login</h2>
              <p>Login if you are a customer ordering food.</p>
            </div>

            <div
              className={styles.optionCard}
              role="button"
              tabIndex={0}
              onClick={() => setLoginType('hotel')}
              onKeyDown={(e) => { if (e.key === 'Enter') setLoginType('hotel'); }}
              aria-label="Hotel Management Login"
            >
              <div className={styles.avatar}>🏨</div>
              <h2>Hotel Management Login</h2>
              <p>Login if you manage hotel operations.</p>
            </div>

            {/* Guest Login OptionCard */}
            <div
              className={styles.optionCard}
              role="button"
              tabIndex={0}
              onClick={handleGuestLogin}
              onKeyDown={(e) => { if (e.key === 'Enter') handleGuestLogin(); }}
              aria-label="Guest Login (No Login Required)"
            >
              <div className={styles.avatar}>👤</div>
              <h2>Guest Login</h2>
              <p>Continue as guest — no login required. Quick access to dashboard.</p>
            </div>
          </>
        ) : (
          <>
            <div className={styles.loginCardHead}>
              <div className={styles.avatar}>{loginType === 'customer' ? '🧑‍🤝‍🧑' : '🏨'}</div>
              <h1>{loginType === 'customer' ? 'Customer Login' : 'Hotel Management Login'}</h1>
              <p>Welcome back! Sign in to continue.</p>
            </div>
            {renderLoginForm()}
          </>
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
            <h2>Welcome back to DineEase!</h2>
            <p>You've successfully logged in. Enjoy seamless food ordering and management experience.</p>
            <button className={styles.popupBtn} onClick={closePopup}>
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Admin Login Popup */}
      {showAdminPopup && (
        <div className={styles.popupOverlay}>
          <div className={styles.popup} style={{ minWidth: 320 }}>
            <h2>System Administrator Login</h2>
            <form onSubmit={handleAdminSubmit} style={{ marginTop: 16 }}>
              <label style={{ fontWeight: 500, display: 'block', marginBottom: 8 }}>
                Enter Admin Code:
                <input
                  type="number"
                  value={adminCode}
                  onChange={(e) => setAdminCode(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    marginTop: 6,
                    padding: 8,
                    borderRadius: 6,
                    border: '1px solid #ccc',
                    fontSize: 16
                  }}
                  placeholder="Admin code"
                />
              </label>
              {adminError && (
                <div style={{ color: '#f33', marginBottom: 10, fontWeight: 600 }}>
                  {adminError}
                </div>
              )}
              <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 12 }}>
                <button
                  type="button"
                  onClick={() => setShowAdminPopup(false)}
                  style={{
                    background: '#f4f4f4',
                    color: '#444',
                    border: 'none',
                    borderRadius: 5,
                    padding: '7px 20px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}>
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    background: '#ff6b35',
                    color: 'white',
                    border: 'none',
                    borderRadius: 5,
                    padding: '7px 20px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Admin Success Popup */}
      {showAdminSuccessPopup && (
        <div className={styles.popupOverlay} style={{ animation: 'fadeIn 0.5s ease forwards' }}>
          <div className={styles.popup}>
            <img
              src="/images/Done.svg"
              alt="Success"
              className={styles.doneMark}
              style={{ animation: 'popIn 0.6s ease forwards' }}
            />
            <h2>Successfully logged in!</h2>
            <button className={styles.popupBtn} onClick={closeAdminSuccessPopup}>
              Continue
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Login;