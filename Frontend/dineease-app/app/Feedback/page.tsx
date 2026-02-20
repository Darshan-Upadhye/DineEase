"use client";
import React, { useState } from "react";
import styles from "./Feedback.module.css";
import Link from "next/link";

// --- Types ---
type AppFormState = {
  name: string;
  email: string;
  usability: string;
  speed: string;
  bugs: string[];
  suggestion: string;
  anonymous: boolean;
};

type RestFormState = {
  name: string;
  email: string;
  hotelVisited: string;
  food: string;
  service: string;
  ambience: string;
  improvements: string[];
  suggestion: string;
  anonymous: boolean;
};

// --- Configuration ---
const DINEEASE_FORM_ACTION_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfLTFT7t36I_ivuqFcDRMoDhfXE4JjM7GTuT4V0KwlKvdciSQ/formResponse";
const RESTAURANT_FORM_ACTION_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfJD1s5w1N4P3kf6GZq5CTG80hdaJRlQH06x1y6En2KdMDZgg/formResponse";

const FORM_IDS = {
  dineease: {
    name: "entry.1681741690",
    email: "entry.659712359",
    usability: "entry.1779868099",
    speed: "entry.1330097846",
    bugs: "entry.1958567753",
    suggestion: "entry.840178464"
  },
  restaurant: {
    name: "entry.360263194",
    email: "entry.478048316",
    hotelName: "entry.943744826",
    food: "entry.263386224",
    service: "entry.2140659539",
    ambience: "entry.1960582258",
    improvements: "entry.1593188369",
    suggestion: "entry.721447754"
  }
};

const hotelOptions = [
  "", "Hotel Abhiruchi", "Hotel Najuka", "Hotel Shatakshi", "Hotel Mantra",
  "Hotel Moraya", "Hotel Priyadarshini", "Spice Garden", "Royal Tandoor",
  "GreenLeaf Dining", "Ocean Breeze Café", "The Biryani House", "Urban Zaika",
  "Grill N Chill", "Sunrise Family Dine"
];

// --- Helper Component for Stars ---
// This handles the hover effect independently for each rating field
const StarRating = ({ 
  value, 
  onChange 
}: { 
  value: string, 
  onChange: (val: string) => void 
}) => {
  const [hover, setHover] = useState(0);
  const rating = parseInt(value) || 0;

  return (
    <div className={styles.ratingRow} onMouseLeave={() => setHover(0)}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={styles.starBtn}
          onClick={() => onChange(String(star))}
          onMouseEnter={() => setHover(star)}
        >
          <span 
            className={`${styles.star} ${(hover || rating) >= star ? styles.starFilled : styles.starEmpty}`}
          >
            ★
          </span>
        </button>
      ))}
    </div>
  );
};

export default function FeedbackPage() {
  const [activeTab, setActiveTab] = useState<"dineease" | "restaurant">("dineease");
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- State for DineEase App Feedback ---
  const [appForm, setAppForm] = useState<AppFormState>({
    name: "",
    email: "",
    usability: "0",
    speed: "0",
    bugs: [],
    suggestion: "",
    anonymous: false
  });

  // --- State for Restaurant Feedback ---
  const [restForm, setRestForm] = useState<RestFormState>({
    name: "",
    email: "",
    hotelVisited: "",
    food: "0",
    service: "0",
    ambience: "0",
    improvements: [],
    suggestion: "",
    anonymous: false
  });

  // Handle Input Changes for App Form
  const handleAppChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
        const checked = (e.target as HTMLInputElement).checked;
        if (name === "anonymous") {
            setAppForm(prev => ({ ...prev, anonymous: checked }));
        } else if (name === "bugs") {
            setAppForm(prev => ({
                ...prev,
                bugs: checked ? [...prev.bugs, value] : prev.bugs.filter(v => v !== value)
            }));
        }
    } else {
        setAppForm(prev => ({ ...prev, [name]: value }));
    }
  };

  // Helper for setting star rating specifically
  const setAppRating = (field: string, val: string) => {
    setAppForm(prev => ({ ...prev, [field]: val }));
  };

  // Handle Input Changes for Restaurant Form
  const handleRestChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
        const checked = (e.target as HTMLInputElement).checked;
        if (name === "anonymous") {
            setRestForm(prev => ({ ...prev, anonymous: checked }));
        } else if (name === "improvements") {
            setRestForm(prev => ({
                ...prev,
                improvements: checked ? [...prev.improvements, value] : prev.improvements.filter(v => v !== value)
            }));
        }
    } else {
        setRestForm(prev => ({ ...prev, [name]: value }));
    }
  };

  // Helper for setting star rating specifically
  const setRestRating = (field: string, val: string) => {
    setRestForm(prev => ({ ...prev, [field]: val }));
  };

  // Google Form Submission Logic
  const submitToGoogle = async (e: React.FormEvent, type: "dineease" | "restaurant") => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    
    if (type === "dineease") {
      const name = appForm.anonymous ? "Anonymous" : appForm.name;
      const email = appForm.anonymous ? "Anonymous" : appForm.email;
      
      formData.append(FORM_IDS.dineease.name, name);
      formData.append(FORM_IDS.dineease.email, email);
      formData.append(FORM_IDS.dineease.usability, appForm.usability);
      formData.append(FORM_IDS.dineease.speed, appForm.speed);
      formData.append(FORM_IDS.dineease.bugs, appForm.bugs.join(", "));
      formData.append(FORM_IDS.dineease.suggestion, appForm.suggestion);

      try {
        await fetch(DINEEASE_FORM_ACTION_URL, {
          method: "POST",
          mode: "no-cors",
          body: formData
        });
      } catch (err) {
        console.error("Form submission error", err);
      }

    } else {
      const name = restForm.anonymous ? "Anonymous" : restForm.name;
      const email = restForm.anonymous ? "Anonymous" : restForm.email;

      formData.append(FORM_IDS.restaurant.name, name);
      formData.append(FORM_IDS.restaurant.email, email);
      formData.append(FORM_IDS.restaurant.hotelName, restForm.hotelVisited);
      formData.append(FORM_IDS.restaurant.food, restForm.food);
      formData.append(FORM_IDS.restaurant.service, restForm.service);
      formData.append(FORM_IDS.restaurant.ambience, restForm.ambience);
      formData.append(FORM_IDS.restaurant.improvements, restForm.improvements.join(", "));
      formData.append(FORM_IDS.restaurant.suggestion, restForm.suggestion);

      try {
        await fetch(RESTAURANT_FORM_ACTION_URL, {
          method: "POST",
          mode: "no-cors",
          body: formData
        });
      } catch (err) {
        console.error("Form submission error", err);
      }
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setShowModal(true);
      if(type === 'dineease') {
        setAppForm({ name: "", email: "", usability: "0", speed: "0", bugs: [], suggestion: "", anonymous: false });
      } else {
        setRestForm({ name: "", email: "", hotelVisited: "", food: "0", service: "0", ambience: "0", improvements: [], suggestion: "", anonymous: false });
      }
    }, 1000);
  };

  return (
    <div className={styles.page}>
      <div className={styles.gridBg} />
      <div className={styles.blobA} />
      <div className={styles.blobB} />
      
      <div className={styles.brandTL}>🍽 DineEase</div>
      <nav className={styles.topRightNav}>
        <Link href="/Homepage" className={styles.navBtn}><span className={styles.btnDot} /> Home</Link>
        <Link href="/contactus" className={styles.navBtn}><span className={styles.btnDot} /> Contact</Link>
      </nav>

      <section className={styles.centerFeedback}>
        <h1 className={styles.heroTitle}>We Value Your Feedback</h1>
        <p className={styles.heroSubtitle}>Help us improve DineEase or rate your dining experience.</p>

        <div className={styles.tabContainer}>
          <button 
            className={`${styles.tabBtn} ${activeTab === "dineease" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("dineease")}
          >
            App Feedback
          </button>
          <button 
            className={`${styles.tabBtn} ${activeTab === "restaurant" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("restaurant")}
          >
            Restaurant Feedback
          </button>
        </div>

        {/* --- FORM 1: DINEEASE APP FEEDBACK --- */}
        {activeTab === "dineease" && (
          <form className={styles.formCard} onSubmit={(e) => submitToGoogle(e, "dineease")}>
            <h3 className={styles.formHeader}>Rate DineEase App</h3>
            
            <div className={styles.formRow}>
              <label>Full Name</label>
              <input 
                name="name" 
                type="text" 
                placeholder={appForm.anonymous ? "Anonymous" : "Your Name"} 
                disabled={appForm.anonymous}
                value={appForm.anonymous ? "" : appForm.name} 
                onChange={handleAppChange} 
              />
            </div>

            <div className={styles.formRow}>
              <label>Email Address</label>
              <input 
                name="email" 
                type="email" 
                placeholder={appForm.anonymous ? "Anonymous" : "your@email.com"} 
                disabled={appForm.anonymous}
                value={appForm.anonymous ? "" : appForm.email} 
                onChange={handleAppChange} 
              />
            </div>
            
            <div className={styles.formRowCheck}>
              <label><input type="checkbox" name="anonymous" checked={appForm.anonymous} onChange={handleAppChange} /> Submit anonymously</label>
            </div>

            <div className={styles.formRow}>
              <label>App Usability</label>
              <StarRating value={appForm.usability} onChange={(val) => setAppRating('usability', val)} />
            </div>

            <div className={styles.formRow}>
              <label>App Speed</label>
              <StarRating value={appForm.speed} onChange={(val) => setAppRating('speed', val)} />
            </div>

            <div className={styles.formRow}>
              <label>Issues Faced</label>
              <div className={styles.checkboxRow}>
                {["Login Issues", "Slow Loading", "Booking Failed", "Reward Error", "Confusing Menu"].map(opt => (
                  <label key={opt}>
                    <input type="checkbox" name="bugs" value={opt} checked={appForm.bugs.includes(opt)} onChange={handleAppChange} />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className={styles.formRow}>
              <label>Suggestions</label>
              <textarea name="suggestion" placeholder="How can we make the app better?" value={appForm.suggestion} onChange={handleAppChange} />
            </div>

            <div className={styles.formActions}>
              <button type="submit" className={styles.primaryCta} disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Submit App Feedback"}
              </button>
            </div>
          </form>
        )}

        {/* --- FORM 2: RESTAURANT FEEDBACK --- */}
        {activeTab === "restaurant" && (
          <form className={styles.formCard} onSubmit={(e) => submitToGoogle(e, "restaurant")}>
            <h3 className={styles.formHeader}>Rate Your Meal</h3>

            <div className={styles.formRow}>
              <label>Full Name</label>
              <input 
                name="name" 
                type="text" 
                placeholder={restForm.anonymous ? "Anonymous" : "Your Name"} 
                disabled={restForm.anonymous}
                value={restForm.anonymous ? "" : restForm.name} 
                onChange={handleRestChange} 
              />
            </div>

            <div className={styles.formRow}>
              <label>Email Address</label>
              <input 
                name="email" 
                type="email" 
                placeholder={restForm.anonymous ? "Anonymous" : "your@email.com"} 
                disabled={restForm.anonymous}
                value={restForm.anonymous ? "" : restForm.email} 
                onChange={handleRestChange} 
              />
            </div>

            <div className={styles.formRowCheck}>
              <label><input type="checkbox" name="anonymous" checked={restForm.anonymous} onChange={handleRestChange} /> Submit anonymously</label>
            </div>

            <div className={styles.formRow}>
              <label>Hotel Visited</label>
              <select name="hotelVisited" value={restForm.hotelVisited} onChange={handleRestChange} required>
                {hotelOptions.map(h => <option key={h} value={h}>{h || "Select Hotel"}</option>)}
              </select>
            </div>

            <div className={styles.formRow}>
              <label>Food Quality</label>
              <StarRating value={restForm.food} onChange={(val) => setRestRating('food', val)} />
            </div>

            <div className={styles.formRow}>
              <label>Ambience</label>
              <StarRating value={restForm.ambience} onChange={(val) => setRestRating('ambience', val)} />
            </div>

            <div className={styles.formRow}>
              <label>Service</label>
              <StarRating value={restForm.service} onChange={(val) => setRestRating('service', val)} />
            </div>

            <div className={styles.formRow}>
              <label>Improvements Needed</label>
              <div className={styles.checkboxRow}>
                {["Taste", "Portion Size", "Hygiene", "Staff Behavior", "Waiting Time"].map(opt => (
                  <label key={opt}>
                    <input type="checkbox" name="improvements" value={opt} checked={restForm.improvements.includes(opt)} onChange={handleRestChange} />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            </div>

             <div className={styles.formRow}>
              <label>Message</label>
              <textarea name="suggestion" placeholder="Describe your experience..." value={restForm.suggestion} onChange={handleRestChange} />
            </div>

            <div className={styles.formActions}>
              <button type="submit" className={styles.primaryCta} disabled={isSubmitting}>
                 {isSubmitting ? "Sending..." : "Submit Review"}
              </button>
            </div>
          </form>
        )}
      </section>

      {/* SUCCESS MODAL */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.successIconCircle}>
              <svg className={styles.checkSvg} viewBox="0 0 24 24">
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
            </div>
            <h2>Thank You!</h2>
            <p>Your feedback has been recorded successfully.</p>
            <button className={styles.closeBtn} onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}