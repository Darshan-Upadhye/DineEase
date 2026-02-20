"use client";
import React, { useState, useEffect } from "react";
import styles from "./AdminDashboard.module.css";

interface Hotel {
  id: string;
  name: string;
  place: string;
  type: "Veg" | "Non-Veg";
  cuisines: string[];
  status: "pending" | "verified" | "rejected";
}

export default function AdminDashboard() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [showPending, setShowPending] = useState(false);
  const [showApproved, setShowApproved] = useState(false);
  const [popup, setPopup] = useState(false);

  useEffect(() => {
    const demoHotels: Hotel[] = [
      {
        id: "h1",
        name: "Spice Heaven",
        place: "Pune",
        type: "Veg",
        cuisines: ["North Indian", "South Indian", "Chinese"],
        status: "pending",
      },
      {
        id: "h2",
        name: "Royal Grill",
        place: "Mumbai",
        type: "Non-Veg",
        cuisines: ["Mughlai", "BBQ", "Continental"],
        status: "verified",
      },
      {
        id: "h3",
        name: "Garden Delight",
        place: "Bangalore",
        type: "Veg",
        cuisines: ["Italian", "Continental"],
        status: "pending",
      },
      {
        id: "h4",
        name: "Seafood Bistro",
        place: "Chennai",
        type: "Non-Veg",
        cuisines: ["Seafood", "Chinese"],
        status: "verified",
      },
    ];
    setHotels(demoHotels);
  }, []);

  const pendingHotels = hotels.filter((h) => h.status === "pending");
  const approvedHotels = hotels.filter((h) => h.status === "verified");

  function handleApprove(id: string) {
    setHotels((prev) =>
      prev.map((h) => (h.id === id ? { ...h, status: "verified" } : h))
    );
    setPopup(true);
    setTimeout(() => setPopup(false), 1800);
  }

  function handleReject(id: string) {
    setHotels((prev) =>
      prev.map((h) => (h.id === id ? { ...h, status: "rejected" } : h))
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.gridBg}></div>
      <div className={styles.blobA}></div>
      <div className={styles.blobB}></div>

      <div className={styles.header}>
        System Administrator Dashboard
        <div className={styles.subHeader}>Verify hotels submitted by management</div>
      </div>
      <div className={styles.cardRow}>
        <div
          className={styles.sectionCard}
          onClick={() => {
            setShowPending((prev) => !prev);
            setShowApproved(false);
          }}
        >
          <span className={styles.cardSymbol} role="img" aria-label="Pending">
            🏨
          </span>
          <div className={styles.cardTitle}>Pending Requests</div>
          <div className={styles.cardSubtitle}>
            Hotels waiting for admin approval.
          </div>
        </div>
        <div
          className={styles.sectionCard}
          onClick={() => {
            setShowApproved((prev) => !prev);
            setShowPending(false);
          }}
        >
          <span className={styles.cardSymbol} role="img" aria-label="Approved">
            ✅
          </span>
          <div className={styles.cardTitle} style={{ color: "#13c36a" }}>
            Approved Hotels
          </div>
          <div className={styles.cardSubtitle}>
            Hotels that are already verified.
          </div>
        </div>
      </div>

      {showPending && (
        <div className={styles.hotelsSection}>
          <h2 className={styles.sectionTitle}>Pending Requests</h2>
          <div className={styles.hotelsList}>
            {pendingHotels.map((hotel) => (
              <div key={hotel.id} className={styles.hotelCardRichLarge}>
                <div className={styles.titleBlock}>
                  <h3 className={styles.hotelName}>{hotel.name}</h3>
                  <span className={styles.city}>{hotel.place}</span>
                  <span
                    className={hotel.type === "Veg" ? styles.veg : styles.nonveg}
                  >
                    {hotel.type}
                  </span>
                </div>
                <div className={styles.cuisines}>
                  {hotel.cuisines.map((c) => (
                    <span key={`${hotel.id}-${c}`} className={styles.cuisineTag}>
                      {c}
                    </span>
                  ))}
                </div>
                <div className={styles.actionRow}>
                  <button
                    className={styles.approveBtn}
                    onClick={() => handleApprove(hotel.id)}
                  >
                    Approve
                  </button>
                  <button
                    className={styles.rejectBtn}
                    onClick={() => handleReject(hotel.id)}
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {showApproved && (
        <div className={styles.hotelsSection}>
          <h2 className={styles.sectionTitle} style={{ color: "#13c36a" }}>
            Approved Hotels
          </h2>
          <div className={styles.hotelsList}>
            {approvedHotels.map((hotel) => (
              <div key={hotel.id} className={styles.hotelCardRichLarge}>
                <div className={styles.titleBlock}>
                  <h3 className={styles.hotelName}>{hotel.name}</h3>
                  <span className={styles.city}>{hotel.place}</span>
                  <span
                    className={hotel.type === "Veg" ? styles.veg : styles.nonveg}
                  >
                    {hotel.type}
                  </span>
                </div>
                <div className={styles.cuisines}>
                  {hotel.cuisines.map((c) => (
                    <span key={`${hotel.id}-${c}`} className={styles.cuisineTag}>
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {popup && (
        <div className={styles.approvePopup}>
          <div className={styles.popupIcon}>
            <img src="/images/Done.svg" alt="Done" className={styles.doneIcon} />
          </div>
          <span className={styles.popupText}>Hotel approved successfully</span>
        </div>
      )}
    </div>
  );
}
