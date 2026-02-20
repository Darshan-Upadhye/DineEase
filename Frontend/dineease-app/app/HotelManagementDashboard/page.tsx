"use client";
import React, { useState } from "react";
import styles from "./HotelManagementDashboard.module.css";

const MANAGER_NAME = "Darshan Upadhye";
const INITIAL_ORDERS = [
  { orderId: "DO234", table: "T1", customer: "Akash Patil", items: ["Paneer Tikka", "Soup"] },
  { orderId: "DO235", table: "T2", customer: "Priya Mehta", items: ["Noodles", "Spring Roll"] },
  { orderId: "DO236", table: "T3", customer: "Rahul Verma", items: ["Dal Makhani", "Butter Naan"] },
  { orderId: "DO237", table: "T4", customer: "Sneha More", items: ["Paneer Tikka", "Fried Rice"] },
  { orderId: "DO238", table: "T5", customer: "Kunal Shah", items: ["Soup", "Veg Biryani"] },
  { orderId: "DO239", table: "T6", customer: "Meera Jain", items: ["Chili Paneer", "Garlic Naan"] },
  { orderId: "DO240", table: "T7", customer: "Varun Patil", items: ["Dal Fry", "Roti"] },
];

const INITIAL_MENU = [
  {
    category: "Indian",
    items: [
      { name: "Paneer Tikka", available: true },
      { name: "Dal Makhani", available: false },
      { name: "Butter Naan", available: true },
      { name: "Dal Fry", available: true },
      { name: "Veg Biryani", available: true },
      { name: "Roti", available: false }
    ]
  },
  {
    category: "Chinese",
    items: [
      { name: "Noodles", available: true },
      { name: "Spring Roll", available: true },
      { name: "Chili Paneer", available: false },
      { name: "Fried Rice", available: true }
    ]
  },
  {
    category: "Soups",
    items: [
      { name: "Soup", available: true },
      { name: "Sweet Corn Soup", available: true }
    ]
  }
];

const INITIAL_BILLS = [
  { orderId: "DO234", customer: "Akash Patil", table: "T1", bill: 540, paid: false },
  { orderId: "DO235", customer: "Priya Mehta", table: "T2", bill: 380, paid: true },
  { orderId: "DO236", customer: "Rahul Verma", table: "T3", bill: 620, paid: false },
  { orderId: "DO237", customer: "Sneha More", table: "T4", bill: 455, paid: false },
  { orderId: "DO238", customer: "Kunal Shah", table: "T5", bill: 500, paid: true },
  { orderId: "DO239", customer: "Meera Jain", table: "T6", bill: 720, paid: false },
  { orderId: "DO240", customer: "Varun Patil", table: "T7", bill: 315, paid: true }
];

const INITIAL_HISTORY = [
  { orderId: "DO220", customer: "Sanket Shah", table: "T2", bill: 400, date: "2025-10-05", paid: true },
  { orderId: "DO221", customer: "Simran Kaur", table: "T3", bill: 550, date: "2025-10-06", paid: true },
  { orderId: "DO222", customer: "Rohit Agarwal", table: "T5", bill: 670, date: "2025-10-05", paid: true },
  { orderId: "DO223", customer: "Kavya Desai", table: "T1", bill: 490, date: "2025-10-06", paid: true },
  { orderId: "DO224", customer: "Arjun Iyer", table: "T4", bill: 630, date: "2025-10-07", paid: true },
  { orderId: "DO225", customer: "Neha Joshi", table: "T6", bill: 720, date: "2025-10-04", paid: true }
];

const INITIAL_WAITSTAFF = [
  { table: "T1", orderId: "DO234", customer: "Akash Patil", status: "Preparing" },
  { table: "T3", orderId: "DO236", customer: "Rahul Verma", status: "Served" },
  { table: "T5", orderId: "DO238", customer: "Kunal Shah", status: "Waiting" },
  { table: "T6", orderId: "DO239", customer: "Meera Jain", status: "Preparing" },
  { table: "T2", orderId: "DO235", customer: "Priya Mehta", status: "Served" },
  { table: "T4", orderId: "DO237", customer: "Sneha More", status: "Waiting" }
];

const SECTIONS = [
  { key: "kitchen", emoji: "👨‍🍳", title: "My Kitchen", desc: "Incoming Orders and Menu" },
  { key: "counter", emoji: "💳", title: "My Counter", desc: "Billing & Payments" },
  { key: "dashboard", emoji: "📊", title: "My Dashboard", desc: "Dine History & Sales" },
  { key: "waitstaff", emoji: "🧑‍🍽️", title: "Waitstaff", desc: "Order Origins" }
];

// Popup component for payment received (should be defined before use)
const PaymentPopup = ({ onClose }: { onClose: () => void }) => (
  <div className={styles.popupOverlay} role="dialog" aria-modal="true" tabIndex={-1} onClick={onClose}>
    <div className={styles.popupContent} onClick={e => e.stopPropagation()} tabIndex={0}>
      <h3 style={{ color: "#146f43", marginBottom: 12 }}>Payment Received</h3>
      <img
        src="/images/Done.svg"
        alt="Payment Done"
        style={{ width: 80, height: 80, marginBottom: 10, animation: "pulse 1.2s infinite" }}
      />
      <button onClick={onClose} className={styles.primaryBtn} style={{ marginTop: 8, width: "100%" }}>Done</button>
    </div>
  </div>
);

export default function HotelManagementDashboard() {
  const [activePage, setActivePage] = useState<string | null>(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [menu, setMenu] = useState(INITIAL_MENU);
  const [bills, setBills] = useState(INITIAL_BILLS);
  const [paymentPopup, setPaymentPopup] = useState<{ visible: boolean; orderId: string | null }>({ visible: false, orderId: null });

  const handleCardClick = (key: string) => setActivePage(key);

  const toggleAvailability = (category: string, itemName: string) => {
    setMenu(currentMenu =>
      currentMenu.map(cat =>
        cat.category === category
          ? { ...cat, items: cat.items.map(item => item.name === itemName ? { ...item, available: !item.available } : item) }
          : cat
      )
    );
  };

  const markAsPaid = (orderId: string) => {
    setBills(currentBills =>
      currentBills.map(bill =>
        bill.orderId === orderId ? { ...bill, paid: true } : bill
      )
    );
    setPaymentPopup({ visible: true, orderId });
  };

  const renderKitchen = () => (
    <div>
      <h3 className={styles.sectionHeader}>Incoming Orders</h3>
      {INITIAL_ORDERS.map(order => (
        <div key={order.orderId} className={styles.sectionCardDetail}>
          <b>Table:</b> {order.table} <br />
          <b>Customer:</b> {order.customer} <br />
          <b>Order ID:</b> {order.orderId}
          <div style={{ marginTop: 4, fontSize: 13, color: "#888" }}>
            {order.items.join(", ")}
          </div>
        </div>
      ))}
      <button className={styles.primaryBtn} style={{ marginTop: 18, marginBottom: 15, fontWeight: 700 }} onClick={() => setMenuVisible(!menuVisible)} aria-expanded={menuVisible} aria-controls="menu-section">
        {menuVisible ? "Hide My Menu" : "My Menu"}
      </button>
      {menuVisible && (
        <div id="menu-section">
          {menu.map(cat => (
            <div key={cat.category} style={{ marginBottom: 10 }}>
              <b>{cat.category}</b>
              {cat.items.map(item => (
                <div key={item.name} className={styles.menuItemRow}>
                  <span style={{ flex: 1 }}>{item.name}</span>
                  <button
                    className={item.available ? styles.primaryBtn : styles.secondaryBtn}
                    style={{ fontSize: 13, padding: "3px 9px", marginLeft: 10 }}
                    onClick={() => toggleAvailability(cat.category, item.name)}
                    aria-pressed={item.available}
                    type="button"
                  >
                    {item.available ? "Available" : "Not Available"}
                  </button>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderCounter = () => (
    <div>
      <h3 className={styles.sectionHeader}>Billing</h3>
      {bills.map(bill => (
        <div key={bill.orderId} className={styles.sectionCardDetail} style={{ display: "flex", alignItems: "center" }}>
          <span style={{ flex: 1 }}>
            <b>Table:</b> {bill.table}<br />
            <b>Customer:</b> {bill.customer}<br />
            <b>Order ID:</b> {bill.orderId}<br />
            <span style={{ color: "#222" }}>₹{bill.bill}</span>
          </span>
          <button
            className={bill.paid ? styles.secondaryBtn : styles.primaryBtn}
            style={{ fontSize: 12, padding: "6px 12px" }}
            onClick={() => !bill.paid && markAsPaid(bill.orderId)}
            disabled={bill.paid}
            aria-disabled={bill.paid}
          >
            {bill.paid ? "Paid" : "Mark as Paid"}
          </button>
        </div>
      ))}
      {paymentPopup.visible && (
        <PaymentPopup onClose={() => setPaymentPopup({ visible: false, orderId: null })} />
      )}
    </div>
  );

  const renderDashboard = () => (
    <div>
      <h3 className={styles.sectionHeader}>Completed Dines</h3>
      {INITIAL_HISTORY.map(h => (
        <div key={h.orderId} className={styles.sectionCardDetail}>
          <b>Customer:</b> {h.customer}<br />
          <b>Table:</b> {h.table}<br />
          <b>Order ID:</b> {h.orderId}<br />
          <b>₹{h.bill}</b> &nbsp;
          <span style={{ color: "#146f43", fontWeight: 600 }}>Settled</span>
          <div style={{ fontSize: 12, color: "#aaa", marginTop: 3 }}>Dined on {h.date}</div>
        </div>
      ))}
      <div style={{ marginTop: 8, fontSize: 13, color: "#888" }}>
        <span>Sales this week: <b>₹1,520</b></span>
      </div>
    </div>
  );
  const renderWaitstaff = () => (
    <div>
      <h3 className={styles.sectionHeader}>Received Orders</h3>
      {INITIAL_WAITSTAFF.map(ws => (
        <div key={ws.orderId} className={styles.sectionCardDetail} style={{ border: "1px solid #e6e8fa", background: "#f8faff" }}>
          <b>Table: {ws.table}</b> | <span style={{ color: "#555" }}>{ws.status}</span><br />
          <span style={{ fontSize: 13 }}>Order ID: {ws.orderId} | {ws.customer}</span>
        </div>
      ))}
    </div>
  );

  if (activePage) {
    const page = SECTIONS.find(section => section.key === activePage);
    let content;
    switch (activePage) {
      case "kitchen": content = renderKitchen(); break;
      case "counter": content = renderCounter(); break;
      case "dashboard": content = renderDashboard(); break;
      case "waitstaff": content = renderWaitstaff(); break;
      default: content = null;
    }
    return (
      <div className={styles.page}>
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
        <div className={styles.sectionPageWrapper}>
          <div className={styles.sectionPageHeader}>
            <span className={styles.sectionEmoji}>{page?.emoji}</span>
            <h2 className={styles.sectionTitle}>{page?.title}</h2>
            <div className={styles.sectionDesc}>{page?.desc}</div>
          </div>
          <div>{content}</div>
          <div style={{ textAlign: "right", marginTop: 28 }}>
            <button className={styles.primaryBtn} onClick={() => setActivePage(null)}>Back to Dashboard</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
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
      <main
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "calc(100vh - 56px)", // adjust as needed
          width: "100%",
        }}
      >
        <h1 className={styles.heroTitle} style={{ margin: 0, marginBottom: 8, textAlign: "center" }}>
          Welcome, {MANAGER_NAME}!
        </h1>
        <p className={styles.heroSubtitle} style={{ marginBottom: 28, textAlign: "center" }}>
          Quick access to all operations.
        </p>
        <div style={{
          display: 'flex',
          gap: 36,
          flexWrap: "wrap",
          justifyContent: "center"
        }}>
          {SECTIONS.map(section => (
            <div
              key={section.key}
              className={styles.sectionCard}
              tabIndex={0}
              role="button"
              aria-label={section.title}
              onClick={() => handleCardClick(section.key)}
              onKeyDown={e => {
                if (e.key === "Enter" || e.key === " ") handleCardClick(section.key);
              }}
            >
              <span className={styles.sectionCardIcon}>{section.emoji}</span>
              <span className={styles.sectionCardTitle}>{section.title}</span>
              <span className={styles.sectionCardDesc}>{section.desc}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
