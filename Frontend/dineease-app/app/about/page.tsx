// app/about/page.tsx
"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./about.module.css";

type HotelOption = {
  value: string;
  label: string;
};

export default function About() {
  // Hotels to select in the modal
  const hotels: HotelOption[] = [
    { value: "abhiruchi", label: "Hotel Abhiruchi (Jaysingpur)" },
    { value: "najuka", label: "Hotel Najuka (Jaysingpur)" },
    { value: "shatakshi", label: "Hotel Shatakshi (Jaysingpur)" },
    { value: "mantra", label: "Hotel Mantra (Mallewadi)" },
    { value: "moraya", label: "Hotel Moraya (Mhaisal)" },
    { value: "priyadarshini", label: "Hotel Priyadarshini (Miraj)" },
    { value: "spice-garden", label: "Spice Garden (Kolhapur)" },
    { value: "royal-tandoor", label: "Royal Tandoor (Pune)" },
    { value: "greenleaf", label: "GreenLeaf Dining (Satara)" },
    { value: "ocean-breeze", label: "Ocean Breeze Café (Goa)" },
    { value: "biryani-house", label: "The Biryani House (Sangli)" },
    { value: "urban-zaika", label: "Urban Zaika (Ichalkaranji)" },
    { value: "grill-n-chill", label: "Grill N Chill (Mumbai)" },
    { value: "sunrise", label: "Sunrise Family Dine (Solapur)" },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const firstInputRef = useRef<HTMLInputElement | null>(null);

  const [form, setForm] = useState({
    hotel: "",
    name: "",
    contact: "",
    people: 2,
    date: "",
    time: "",
    seating: "Indoor",
    occasion: "",
    notes: "",
  });
  const [submitMsg, setSubmitMsg] = useState<string | null>(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, []);

  useEffect(() => {
    if (isModalOpen && firstInputRef.current) firstInputRef.current.focus();
  }, [isModalOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { hotel, name, contact, date, time, people } = form;
    if (!hotel || !name.trim() || !contact.trim() || !date || !time || !people) {
      setSubmitMsg("Please complete all required fields.");
      return;
    }
    const hotelLabel = hotels.find(h => h.value === hotel)?.label ?? "Selected hotel";
    setSubmitMsg(`Table at ${hotelLabel} for ${people} on ${date} at ${time} has been booked in advance.`);
    setTimeout(() => {
      setSubmitMsg(null);
      closeModal();
      setForm({
        hotel: "",
        name: "",
        contact: "",
        people: 2,
        date: "",
        time: "",
        seating: "Indoor",
        occasion: "",
        notes: "",
      });
    }, 1500);
  };

  return (
    <main className={styles.page}>
      {/* Hero split layout */}
      <section className={styles.hero}>
        {/* Left: full-height illustration */}
        <div className={styles.leftCol}>
          <span className={`${styles.bubble} ${styles.b1}`} />
          <span className={`${styles.bubble} ${styles.b2}`} />
          <span className={`${styles.bubble} ${styles.b3}`} />
          <div className={styles.illustrationWrap}>
            <Image
              src="/images/About.svg"
              alt="DineEase digital dining illustration"
              fill
              priority
              className={styles.illustration}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Right: content */}
        <div className={styles.rightCol}>
          <div className={styles.kicker}>About DineEase</div>
          <h1 className={styles.title}>A smarter, faster way to dine</h1>
          <p className={styles.subtitle}>
            From live menus and seamless ordering to advance table bookings—DineEase turns great food into an effortless experience.
          </p>

          <div className={styles.featureCards}>
            <div className={styles.card}>
              <div className={styles.cardIcon}>📱</div>
              <h3>Contactless Menu</h3>
              <p>Scan a QR to browse live menus, with photos, tags, and dietary labels.</p>
            </div>
            <div className={styles.card}>
              <div className={styles.cardIcon}>✨</div>
              <h3>Customize Dishes</h3>
              <p>Choose spice levels, add‑ons, and special notes—see prices update instantly.</p>
            </div>
            <div className={styles.card}>
              <div className={styles.cardIcon}>⏱️</div>
              <h3>Real‑time ETA</h3>
              <p>View preparation time and status so expectations are always clear.</p>
            </div>
            <div className={styles.card}>
              <div className={styles.cardIcon}>🔒</div>
              <h3>Easy, Secure Pay</h3>
              <p>Pay online, split bills, or settle at the counter—fast and flexible.</p>
            </div>
          </div>

          <div className={styles.ctaRow}>
            <Link href="/learnmore" className={styles.secondaryBtn}>
              Learn More
            </Link>
            <button
              type="button"
              onClick={openModal}
              className={`${styles.primaryBtn} ${styles.shimmer}`}
            >
              Book Table in Advance
            </button>
          </div>

          <ul className={styles.metaList}>
            <li><span className={styles.dot} /> 500+ tables reserved weekly</li>
            <li><span className={styles.dot} /> 200+ partner restaurants</li>
            <li><span className={styles.dot} /> 4.7/5 average diner rating</li>
          </ul>
        </div>
      </section>

      {/* Story section */}
      <section className={styles.story}>
        <div className={styles.storyInner}>
          <h2 className={styles.storyTitle}>Why DineEase?</h2>
          <p className={styles.storyText}>
            Long queues, unclear wait times, and clunky payment flows make dining harder than it should be.
            DineEase streamlines the journey—discover, decide, and dine, all with clarity and control.
          </p>
          <div className={styles.steps}>
            <div className={styles.step}>
              <div className={styles.stepNum}>1</div>
              <div className={styles.stepText}>Find a place, browse the live menu, and pick favorites.</div>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNum}>2</div>
              <div className={styles.stepText}>Customize dishes, add notes, and place an order in seconds.</div>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNum}>3</div>
              <div className={styles.stepText}>Book tables in advance for any occasion and skip the wait.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Advance Booking Modal */}
      {isModalOpen && (
        <div className={styles.modalOverlay} role="dialog" aria-modal="true" onClick={closeModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalClose} aria-label="Close" onClick={closeModal}>×</button>
            <h3 className={styles.modalTitle}>Book a Table</h3>
            <p className={styles.modalSubtitle}>Reserve a table ahead of time.</p>

            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formRow}>
                <label htmlFor="hotel">Select Hotel*</label>
                <select
                  id="hotel"
                  value={form.hotel}
                  onChange={(e) => setForm({ ...form, hotel: e.target.value })}
                  className={styles.select}
                  required
                >
                  <option value="" disabled>Select a hotel</option>
                  {hotels.map(h => (
                    <option key={h.value} value={h.value}>{h.label}</option>
                  ))}
                </select>
              </div>

              <div className={styles.rowGrid}>
                <div className={styles.formRow}>
                  <label htmlFor="name">Full Name*</label>
                  <input
                    id="name"
                    type="text"
                    ref={firstInputRef}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Darshan Upadhye"
                    required
                  />
                </div>
                <div className={styles.formRow}>
                  <label htmlFor="contact">Contact*</label>
                  <input
                    id="contact"
                    type="text"
                    value={form.contact}
                    onChange={(e) => setForm({ ...form, contact: e.target.value })}
                    placeholder="+91 90000..."
                    required
                  />
                </div>
              </div>

              <div className={styles.rowGrid}>
                <div className={styles.formRow}>
                  <label htmlFor="people">Guests*</label>
                  <input
                    id="people"
                    type="number"
                    min={1}
                    max={20}
                    value={form.people}
                    onChange={(e) => setForm({ ...form, people: Number(e.target.value) })}
                    required
                  />
                </div>
                <div className={styles.formRow}>
                  <label htmlFor="date">Date*</label>
                  <input
                    id="date"
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    required
                  />
                </div>
                <div className={styles.formRow}>
                  <label htmlFor="time">Time*</label>
                  <input
                    id="time"
                    type="time"
                    value={form.time}
                    onChange={(e) => setForm({ ...form, time: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className={styles.rowGridTwo}>
                <div className={styles.formRow}>
                  <label htmlFor="seating">Seating</label>
                  <select
                    id="seating"
                    value={form.seating}
                    onChange={(e) => setForm({ ...form, seating: e.target.value })}
                  >
                    <option>Indoor</option>
                    <option>Outdoor</option>
                    <option>Near Window</option>
                    <option>Quiet Area</option>
                  </select>
                </div>
                <div className={styles.formRow}>
                  <label htmlFor="occasion">Occasion</label>
                  <select
                    id="occasion"
                    value={form.occasion}
                    onChange={(e) => setForm({ ...form, occasion: e.target.value })}
                  >
                    <option value="">Select (optional)</option>
                    <option>Birthday</option>
                    <option>Anniversary</option>
                    <option>Business</option>
                    <option>Casual</option>
                  </select>
                </div>
              </div>

              <div className={styles.formRow}>
                <label htmlFor="notes">Requests</label>
                <textarea
                  id="notes"
                  rows={2}
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  placeholder="Allergies, cake, etc."
                />
              </div>

              {submitMsg && <div className={styles.toast}>{submitMsg}</div>}

              <div className={styles.modalActions}>
                <button type="button" className={styles.secondaryBtn} onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" className={`${styles.primaryBtn} ${styles.shimmer}`}>
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}