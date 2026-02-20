"use client";
import React, { useState } from "react";
import styles from "./HotelManagementDashboard.AddStore.module.css";

const doneImageSrc = "/images/Done.svg"; // Replace with your own animated image path

const MANAGER_NAME = "Darshan Upadhye"; // Replace with dynamic value if available

export default function HotelManagementDashboard() {
  const [hotels, setHotels] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [form, setForm] = useState({ name: "", place: "", type: "Veg", cuisines: "" });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.place.trim() || !form.cuisines.trim()) {
      alert("Please fill all required fields.");
      return;
    }
    const newHotel = {
      id: Date.now().toString(),
      ...form,
      cuisines: form.cuisines.split(",").map((c) => c.trim()),
      status: "pending"
    };
    setHotels([...hotels, newHotel]);
    setForm({ name: "", place: "", type: "Veg", cuisines: "" });
    setShowForm(false);
    setSubmitSuccess(true);
  };

  return (
    <div className={styles.page} style={{ alignItems: "center" }}>
      <div className={styles.gridBg} />
      <div className={styles.blobA} />
      <div className={styles.blobB} />

      <div className={styles.brandTL}>🍽 DineEase</div>
      <nav className={styles.topRightNav}>
        <button className={styles.navBtn} aria-label="Profile">
          <span className={styles.btnDot}></span> {MANAGER_NAME}
        </button>
        <a href="/logout" className={styles.navBtn}>Logout</a>
      </nav>

      <section className={styles.centerHero} style={{ marginTop: "42px", minHeight: "min-content" }}>
        <h1 className={styles.heroTitle} style={{ marginBottom: 12 }}>
          Welcome, {MANAGER_NAME}!
        </h1>
        <p className={styles.heroSubtitle} style={{ marginBottom: 22 }}>
          Add and manage your hotels professionally ✨
        </p>

        {/* White Add Hotel Card */}
        <div
          className={styles.whiteCard}
          tabIndex={0}
          role="button"
          aria-label="Add your hotel"
          onClick={() => setShowForm(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") setShowForm(true);
          }}
          style={{ margin: "0 auto 52px", boxShadow:"0 8px 24px -6px #e6e7e8", transition:"box-shadow 0.24s, transform 0.22s" }}
        >
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:4 }}>
            <span style={{ fontSize: "2.5rem", marginBottom: 10 }}>🏨</span>
            <h2 style={{ color:'#ff6b35', fontWeight:800, fontSize:22, margin:'0 0 4px' }}>
              Add Your Hotel
            </h2>
            <div style={{ color:'#526', fontWeight:450, textAlign:'center', fontSize:14, marginBottom:2, lineHeight:'20px' }}>
              Make your restaurant visible<br />to thousands of DineEase users!
            </div>
          </div>
        </div>

        {/* Your Hotels List */}
        <h2 style={{ marginTop: 24, fontSize: 22 }}>Your Hotels</h2>
        <div className={styles.hotels}>
          {hotels.map((hotel) => (
            <div key={hotel.id} className={styles.hotelCardRich}>
              <div className={styles.cardTop}>
                <div className={styles.titleBlock}>
                  <h3 className={styles.hotelName}>{hotel.name}</h3>
                  <span className={styles.city}>{hotel.place}</span>
                </div>
                <span className={hotel.type === "Veg" ? styles.veg : styles.nonveg}>{hotel.type}</span>
              </div>
              <div>Status: {hotel.status}</div>
              <div className={styles.cuisines}>
                {hotel.cuisines.map((c: string) => (
                  <span key={c} className={styles.cuisineTag}>
                    {c}
                  </span>
                ))}
              </div>
            </div>
          ))}
          {hotels.length === 0 && (
            <p style={{ marginTop: 16, color: "#888" }}>No hotels added yet.</p>
          )}
        </div>
      </section>

      {/* Popup Form Modal */}
      {showForm && (
        <div className={styles.modalOverlay} role="dialog" aria-modal="true">
          <div className={styles.modal}>
            <div
              style={{
                width: 62,
                height: 62,
                margin: "0 auto 14px auto",
                background: "linear-gradient(100deg, #ffede4 70%, #ffe0e6 100%)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "2.1rem",
              }}
            >
              🏨
            </div>
            <h2 style={{ marginBottom: 10 }}>Register Your Hotel</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formRow}>
                <label htmlFor="name">Hotel Name*</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleFormChange}
                  placeholder="Hotel name"
                  required
                  autoFocus
                />
              </div>
              <div className={styles.formRow}>
                <label htmlFor="place">Place*</label>
                <input
                  id="place"
                  name="place"
                  type="text"
                  value={form.place}
                  onChange={handleFormChange}
                  placeholder="City or Area"
                  required
                />
              </div>
              <div className={styles.formRow}>
                <label htmlFor="type">Type*</label>
                <select id="type" name="type" value={form.type} onChange={handleFormChange} required>
                  <option value="Veg">Veg</option>
                  <option value="Non-Veg">Non-Veg</option>
                </select>
              </div>
              <div className={styles.formRow}>
                <label htmlFor="cuisines">Cuisines* (comma separated)</label>
                <textarea
                  id="cuisines"
                  name="cuisines"
                  value={form.cuisines}
                  onChange={handleFormChange}
                  placeholder="e.g. North Indian, Chinese"
                  rows={2}
                  required
                />
              </div>
              <div className={styles.modalActions}>
                <button type="submit" className={styles.primaryBtn}>Submit</button>
                <button type="button" className={styles.secondaryBtn} onClick={() => setShowForm(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Success Modal with Animation */}
      {submitSuccess && (
        <div className={styles.modalOverlay} role="alertdialog" aria-live="assertive">
          <div className={styles.modal} style={{ textAlign: "center" }}>
            <img
              src={doneImageSrc}
              alt="Done"
              style={{ width: 200, height: 200, marginBottom: 0, animation: "scaleUp 0.62s cubic-bezier(.47,1.64,.41,.8) forwards" }}
            />
            <h2 style={{ margin: "-10px -10px 6px" }}>Successfully Registered!</h2>
            <p style={{ marginBottom: 18 }}>
              Your hotel has been submitted. It will be displayed on DineEase after review & approval.
            </p>
            <button className={styles.primaryBtn} onClick={() => setSubmitSuccess(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
