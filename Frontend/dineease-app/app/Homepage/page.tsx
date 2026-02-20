"use client";
import React, { useEffect, useRef, useState, useMemo } from "react";
import styles from "./homepage.module.css";

// --- CUSTOM SVG ICONS (Standard SVGs, No dependencies required) ---
const IconLinkedIn = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>;
const IconGithub = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>;
const IconWhatsApp = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>;
const IconInsta = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>;
const IconMail = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>;
const IconGlobe = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>;
const IconUser = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;

// --- CONFIGURATION ---
const GOOGLE_FORM_ACTION_URL = "https://docs.google.com/forms/d/e/1FAIpQLScGdk1QY1GUJYMATv9kICqV3wWsjhI78Ck1ot3K21cO1LlKng/formResponse";

const ENTRY_IDS = {
  NAME: "entry.1640726980", 
  EMAIL: "entry.1514785898", 
  HOTEL: "entry.248685501", 
  DATE: "entry.1632514852", 
  TIME: "entry.896206453", 
  GUESTS: "entry.587331774", 
  TABLE: "entry.807267685", 
  SEATING: "entry.1543825213",
  REQUESTS: "entry.1432221912"
};

type Hotel = {
  name: string;
  place: string;
  type: "Veg" | "Non-Veg";
  link: string;
  rating: number;
  eta: number;
  priceLevel: 1 | 2 | 3;
  cuisines: string[];
};

export default function Homepage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  
  // Modals
  const [showFavModal, setShowFavModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDummyPopup, setShowDummyPopup] = useState(false);
  const [dummyHotelName, setDummyHotelName] = useState("");
  const [showDevProfile, setShowDevProfile] = useState(false);
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [showProfile, setShowProfile] = useState(false);
  
  // Active Data
  const [activeHotel, setActiveHotel] = useState<Hotel | null>(null);
  const [confirmedDetails, setConfirmedDetails] = useState<any>(null);

  // Form State
  const [form, setForm] = useState({
    name: "",
    email: "",
    people: 2,
    date: "",
    time: "",
    seating: "Indoor",
    requests: "",
    tableNumber: null as number | null
  });
  const [submitMsg, setSubmitMsg] = useState<string | null>(null);
  const firstInputRef = useRef<HTMLInputElement | null>(null);

  // Data
  const activeDemoHotels = ["Hotel Abhiruchi"]; 
  // CHANGED: Empty array so all other hotels trigger the demo popup
  const linkableHotels: string[] = []; 

  // Mock tables
  const totalTables = 16;
  const occupiedTables = [3, 7, 8, 12, 14]; 

  const hotels: Hotel[] = [
    { name: "Hotel Abhiruchi", place: "Jaysingpur", type: "Veg", link: "/HotelAbhiruchi", rating: 4.4, eta: 20, priceLevel: 2, cuisines: ["Maharashtrian","North Indian"] },
    { name: "Hotel Najuka", place: "Jaysingpur", type: "Veg", link: "/HotelNajuka", rating: 4.2, eta: 25, priceLevel: 2, cuisines: ["Biryani","Mughlai"] },
    { name: "Hotel Shatakshi", place: "Jaysingpur", type: "Veg", link: "/HotelShatakshi", rating: 4.1, eta: 18, priceLevel: 1, cuisines: ["South Indian","Snacks"] },
    { name: "Hotel Mantra", place: "Mallewadi", type: "Non-Veg", link: "/HotelMantra", rating: 4.5, eta: 22, priceLevel: 3, cuisines: ["Tandoor","Seafood"] },
    { name: "Hotel Moraya", place: "Mhaisal", type: "Veg", link: "/HotelMoraya", rating: 4.0, eta: 15, priceLevel: 1, cuisines: ["Fast Food","Chinese"] },
    { name: "Hotel Priyadarshini", place: "Miraj", type: "Veg", link: "/HotelPriyadarshini", rating: 4.3, eta: 28, priceLevel: 2, cuisines: ["North Indian","Grills"] },
    { name: "Spice Garden", place: "Kolhapur", type: "Veg", link: "/HotelSpiceGardenHomepage", rating: 4.6, eta: 24, priceLevel: 2, cuisines: ["Kolhapuri","Thali"] },
    { name: "Royal Tandoor", place: "Pune", type: "Non-Veg", link: "/HotelRoyalTandoorHomepage", rating: 4.7, eta: 30, priceLevel: 3, cuisines: ["Tandoor","Mughlai"] },
    { name: "GreenLeaf Dining", place: "Satara", type: "Veg", link: "/HotelGreenLeafHomepage", rating: 4.2, eta: 16, priceLevel: 2, cuisines: ["Healthy","Continental"] },
    { name: "Ocean Breeze Café", place: "Goa", type: "Veg", link: "/HotelOceanBreezeHomepage", rating: 4.5, eta: 26, priceLevel: 2, cuisines: ["Cafe","Italian"] },
    { name: "The Biryani House", place: "Sangli", type: "Non-Veg", link: "/HotelBiryaniHouseHomepage", rating: 4.3, eta: 20, priceLevel: 2, cuisines: ["Biryani","Hyderabadi"] },
    { name: "Urban Zaika", place: "Ichalkaranji", type: "Veg", link: "/HotelUrbanZaikaHomepage", rating: 4.1, eta: 19, priceLevel: 1, cuisines: ["Street Food","Chinese"] },
    { name: "Grill N Chill", place: "Mumbai", type: "Non-Veg", link: "/HotelGrillnChillHomepage", rating: 4.6, eta: 27, priceLevel: 3, cuisines: ["Barbecue","American"] },
    { name: "Sunrise Family Dine", place: "Solapur", type: "Veg", link: "/HotelSunriseHomepage", rating: 4.2, eta: 21, priceLevel: 2, cuisines: ["Family Dining","Indian"] }
  ];

  const filteredHotels = useMemo(() => {
    const q = query.toLowerCase();
    return hotels.filter((hotel) => {
      const matchesQuery =
        hotel.name.toLowerCase().includes(q) ||
        hotel.place.toLowerCase().includes(q) ||
        hotel.cuisines.some(c => c.toLowerCase().includes(q));
      const matchesFilter = filter ? hotel.type === filter : true;
      return matchesQuery && matchesFilter;
    });
  }, [hotels, query, filter]);

  const favoriteList = useMemo(() => hotels.filter(h => favorites[h.name]), [favorites, hotels]);

  // Handlers
  const handleHotelClick = (e: React.MouseEvent, hotel: Hotel) => {
    e.preventDefault();
    if (activeDemoHotels.includes(hotel.name) || linkableHotels.includes(hotel.name)) {
      window.location.href = hotel.link;
    } else {
      setDummyHotelName(hotel.name);
      setShowDummyPopup(true);
    }
  };

  const handleBookClick = (e: React.MouseEvent, hotel: Hotel) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (activeDemoHotels.includes(hotel.name)) {
      setActiveHotel(hotel); 
      setForm({
        name: "", email: "", people: 2, date: "", time: "", seating: "Indoor", requests: "", tableNumber: null
      });
      setIsModalOpen(true);
    } else {
      setDummyHotelName(hotel.name);
      setShowDummyPopup(true);
    }
  };

  const closeModal = () => { setIsModalOpen(false); setTimeout(() => setActiveHotel(null), 200); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.date || !form.time) {
      setSubmitMsg("Please fill all required fields.");
      return;
    }
    if (!form.tableNumber) {
      setSubmitMsg("Please select a table number.");
      return;
    }

    // --- Google Form Submission Logic ---
    const formData = new FormData();
    formData.append(ENTRY_IDS.NAME, form.name);
    formData.append(ENTRY_IDS.EMAIL, form.email);
    formData.append(ENTRY_IDS.HOTEL, activeHotel?.name || "Unknown Hotel");
    formData.append(ENTRY_IDS.DATE, form.date);
    formData.append(ENTRY_IDS.TIME, form.time);
    formData.append(ENTRY_IDS.GUESTS, form.people.toString());
    formData.append(ENTRY_IDS.TABLE, form.tableNumber.toString());
    formData.append(ENTRY_IDS.SEATING, form.seating);
    formData.append(ENTRY_IDS.REQUESTS, form.requests);

    try {
        await fetch(GOOGLE_FORM_ACTION_URL, {
            method: "POST",
            mode: "no-cors", 
            body: formData
        });
        
        setConfirmedDetails({
            user: form.name,
            hotel: activeHotel?.name,
            table: form.tableNumber,
            date: form.date,
            time: form.time,
            email: form.email
        });
        setSubmitMsg(null);
        setShowConfirmation(true);
    } catch (err) {
        setSubmitMsg("Something went wrong. Please try again.");
    }
  };

  const closeConfirmation = () => {
    setShowConfirmation(false);
    closeModal();
    setForm({ name: "", email: "", people: 2, date: "", time: "", seating: "Indoor", requests: "", tableNumber: null });
  };

  const toggleFav = (name: string) => {
    setFavorites(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const priceSymbols = (lvl: 1 | 2 | 3) => "₹".repeat(lvl);

  // Close Modals on Escape Key
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isModalOpen) closeModal();
        if (showFavModal) setShowFavModal(false);
        if (showWelcome) setShowWelcome(false);
        if (showProfile) setShowProfile(false);
        if (showConfirmation) setShowConfirmation(false);
        if (showDummyPopup) setShowDummyPopup(false);
        if (showDevProfile) setShowDevProfile(false);
        if (showTeamModal) setShowTeamModal(false);
      }
    };
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [isModalOpen, showFavModal, showWelcome, showProfile, showConfirmation, showDummyPopup, showDevProfile, showTeamModal]);

  useEffect(() => {
    if (isModalOpen && firstInputRef.current) firstInputRef.current.focus();
  }, [isModalOpen]);

  // ==== JSX Return ====
  return (
    <div className={styles.page}>
      <div className={styles.gridBg} />
      <div className={styles.blobA} />
      <div className={styles.blobB} />

      <div className={styles.brandTL}>🍽 DineEase</div>

      {/* Nav Buttons (Profile replaces Login) */}
      <nav className={styles.topRightNav}>
        <button
          type="button"
          className={`${styles.navBtn} ${styles.shimmer}`}
          aria-label="Profile"
          onClick={() => setShowProfile(true)}
        >
          <span className={styles.btnDot}></span> Profile
        </button>
        <a href="/Feedback" className={styles.navBtn} aria-label="Feedback Us">
          <span className={styles.btnDot} /> Feedback Us
        </a>
        <a href="/Rewards" className={styles.navBtn} aria-label="Rewards">
          <span className={styles.btnDot} /> Rewards
        </a>
      </nav>

      {/* Welcome Popup */}
      {showWelcome && (
        <div className={styles.modalOverlay} role="dialog" aria-modal="true" onClick={() => setShowWelcome(false)}>
          <div className={styles.modal} style={{maxWidth: 650, padding: "24px 32px"}} onClick={e => e.stopPropagation()}>
            <button className={styles.modalClose} aria-label="Close" onClick={() => setShowWelcome(false)}>×</button>
            <div style={{display: "flex", flexDirection: "column", alignItems: "center", gap: "14px"}}>
              <img src="/images/DineEase_Illustrate.svg" alt="Welcome illustration" style={{width: "600px", margin:"0px", marginBottom: "-30px"}} />
              <h2 className={styles.modalTitle} style={{fontWeight:"900", fontSize: "30px", marginBottom: "-10px"}}>
                Welcome to DineEase
              </h2>
              <div style={{color: "#c1272d", fontWeight: "600", fontSize: "16px", marginBottom: "0px"}}>
                You are currently logged in as a Guest.
              </div>
              <p style={{fontSize:"16px", lineHeight:"1.6", color:"#333", maxWidth:"600px", textAlign:"center", marginBottom: "-5px"}}>
                DineEase offers a seamless and intuitive dining experience. Simply scan the QR code at your table or select your favorite restaurant through our app to browse the menu and place your order without contact. Track your order in real-time with accurate preparation and delivery updates.
              </p>
              <p style={{fontSize:"16px", lineHeight:"1.6", color:"#333", maxWidth:"600px", textAlign:"center", marginBottom: "-5px"}}>
                Add extra items effortlessly during your dining session without interrupting your current order. Enjoy easy digital payments with auto-generated e-invoices, supporting multiple payment methods. After dining, share your feedback to help us and the restaurants improve continuously.
              </p>
              <ul style={{textAlign:"left", fontSize:"15px", maxWidth:"580px", color:"#444", paddingLeft:"20px", lineHeight:"1.5"}}>
                <li>Earn scratch cards when you order or reserve through your DineEase account.</li>
                <li>Boost your rewards by participating in our weekly quizzes to earn bonus DineCoins.</li>
                <li>Refer friends and family to enjoy more rewards and benefits.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Profile Popup */}
      {showProfile && (
        <div className={styles.modalOverlay} role="dialog" aria-modal="true" onClick={() => setShowProfile(false)}>
          <div className={styles.modal} style={{maxWidth: 420, padding:"0 0 26px 0"}} onClick={e => e.stopPropagation()}>
            <button className={styles.modalClose} aria-label="Close" onClick={() => setShowProfile(false)}>×</button>
            <div style={{display: "flex", flexDirection: "column", alignItems: "center", gap:"28px", marginTop:"16px"}}>
              <div className={styles.profileCardContainer}>
                <img
                  src="/images/Profile_Card_DineEase.svg"
                  alt="profile card"
                  className={styles.profileCardImg}
                />
                <div style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: "50px",
                  textAlign: "center",
                  lineHeight: 1.11
                  }}>
                  <div style={{
                    fontWeight: 800,
                    fontSize: "21px",
                    color: "#f0dda5",
                    letterSpacing: "0.2px",
                    textShadow: "0 2px 8px rgba(30,25,10,0.17)"
                  }}>
                    Guest
                  </div>
                  <div style={{
                    fontWeight: 500,
                    fontSize: "13.4px",
                    color: "#f0dda5",
                    opacity: 0.96,
                    marginTop: "1.5px",
                    textShadow: "0 1px 6px rgba(30,25,10,0.11)"
                  }}>
                    You logged as guest.
                  </div>
                </div>
              </div>
              <img
                src="/images/RFID_Card_DineEase.svg"
                alt="RFID Card"
                className={styles.rfidCardImg}
              />
              <div style={{
                fontSize:"15px",
                color:"#be2d2d",
                marginTop:"1px",
                textAlign:'center'
              }}>
                You must need to login to access your RFID card.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Developer Profile Popup */}
      {showDevProfile && (
        <div className={styles.modalOverlay} role="dialog" aria-modal="true" onClick={() => setShowDevProfile(false)}>
          <div className={styles.modal} style={{maxWidth: 400}} onClick={e => e.stopPropagation()}>
            <button className={styles.modalClose} aria-label="Close" onClick={() => setShowDevProfile(false)}>×</button>
            <div className={styles.devCard}>
              <img src="https://api.dicebear.com/9.x/avataaars/svg?seed=Darshan" alt="Darshan" className={styles.devAvatar} />
              <h3 className={styles.devName}>Darshan Akshay Upadhye</h3>
              <div style={{color:'#ff6b35', fontWeight:'700', marginBottom:'16px'}}>B.Tech (E&C) • Full Stack Developer</div>
              <p className={styles.devBio}>
                Hi, I'm Darshan Akshay Upadhye, a B.Tech student in Electronics and Computer Engineering. I have a strong passion and experience in Full Stack Web Development, Generative AI and Graphic Design. I enjoy building innovative and intelligent web applications that solve real-world problems using cutting-edge technologies.
              </p>
              <div className={styles.devSocials}>
                <a href="https://www.linkedin.com/in/darshan-upadhye-02a9a5287/" className={styles.devSocialIcon} title="LinkedIn"><IconLinkedIn /></a>
                <a href="https://github.com/Darshan-Upadhye" className={styles.devSocialIcon} title="GitHub"><IconGithub /></a>
                <a href="mailto:darshanupadhye272@gmail.com" className={styles.devSocialIcon} title="Email"><IconMail /></a>
                <a href="https://wa.me/918412967484?text=Hi%20Darshan,%20I%20would%20like%20to%20connect%20with%20you" className={styles.devSocialIcon} title="WhatsApp"><IconWhatsApp /></a>
                <a href="#" className={styles.devSocialIcon} title="Portfolio"><IconGlobe /></a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Team Popup */}
      {showTeamModal && (
        <div className={styles.modalOverlay} onClick={() => setShowTeamModal(false)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={() => setShowTeamModal(false)}>×</button>
            <h3 className={styles.modalTitle} style={{marginBottom:'20px'}}>Meet the Team</h3>
            <div className={styles.teamList}>
              <div className={styles.teamMember}>
                <div className={styles.teamAvatar}><IconUser /></div>
                <div className={styles.teamInfo}><h4>Darshan Akshay Upadhye</h4><span>B.Tech in Electronics and Computer Engineering</span></div>
              </div>
              <div className={styles.teamMember}>
                <div className={styles.teamAvatar}><IconUser /></div>
                <div className={styles.teamInfo}><h4>Uttkarsh Shital Aitawade</h4><span>B.Tech in Electronics and Computer Engineering</span></div>
              </div>
              <div className={styles.teamMember}>
                <div className={styles.teamAvatar}><IconUser /></div>
                <div className={styles.teamInfo}><h4>Shubham Avinash Bansode</h4><span>B.Tech in Electronics and Computer Engineering</span></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Dummy Hotel Popup */}
      {showDummyPopup && (
         <div className={styles.modalOverlay} role="dialog" aria-modal="true" onClick={() => setShowDummyPopup(false)}>
            <div className={styles.modal} style={{textAlign: "center", maxWidth: "400px"}} onClick={e => e.stopPropagation()}>
                <button className={styles.modalClose} onClick={() => setShowDummyPopup(false)}>×</button>
                <div style={{fontSize: "3rem", marginBottom: "10px"}}>🚧</div>
                <h3 className={styles.modalTitle}>Demo Mode</h3>
                <p style={{fontSize: "1rem", color: "#555", lineHeight: "1.5"}}>
                    Hey there! This is dummy data. <b>{dummyHotelName}</b> is just for visual representation in this demo. 
                </p>
                <p style={{fontSize: "0.95rem", color: "#666", marginTop: "10px"}}>
                    Please check out <b>Hotel Abhiruchi</b> to see the fully working features!
                </p>
                <button className={styles.primaryBtn} style={{marginTop: "20px", width: "100%"}} onClick={() => setShowDummyPopup(false)}>
                    Okay, Got it!
                </button>
            </div>
         </div>
      )}

      <section className={styles.centerHero}>
        <h1 className={styles.heroTitle}>Welcome to DineEase</h1>
        <p className={styles.heroSubtitle}>Discover and book nearby popular hotels for dining 🍽</p>

        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Search hotels by name, city, or cuisine..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search hotels"
          />
          <button type="button">Search</button>
        </div>

        <div className={styles.suggestionBtnsCentered}>
          <button
            className={filter === "Veg" ? styles.activeFilter : ""}
            onClick={() => setFilter("Veg")}
            type="button"
          >
            Veg Hotels
          </button>
          <button
            className={filter === "Non-Veg" ? styles.activeFilter : ""}
            onClick={() => setFilter("Non-Veg")}
            type="button"
          >
            Non-Veg Hotels
          </button>
          <button
            className={!filter ? styles.activeFilter : ""}
            onClick={() => setFilter(null)}
            type="button"
          >
            All Hotels
          </button>
          <button
            className={styles.favoriteFilterBtn}
            onClick={() => setShowFavModal(true)}
            type="button"
            aria-haspopup="dialog"
            aria-expanded={showFavModal}
          >
            Favorites ({favoriteList.length})
          </button>
        </div>
      </section>

      <div className={styles.hotels}>
        {filteredHotels.length > 0 ? (
          filteredHotels.map((hotel) => (
            <a key={hotel.name}
              href="#"
              onClick={(e) => handleHotelClick(e, hotel)}
              className={styles.hotelCardRich}
              aria-label={`Go to ${hotel.name} page`}>

              <div className={styles.cardTop}>
                <div className={styles.titleBlock}>
                  <h3 className={styles.hotelName}>{hotel.name}</h3>
                  <span className={styles.city}>{hotel.place}</span>
                </div>
                <span className={hotel.type === "Veg" ? styles.veg : styles.nonveg}>
                  {hotel.type}
                </span>
              </div>

              <div className={styles.heartRow}>
                <button
                  type="button"
                  className={`${styles.heartBtnInline} ${favorites[hotel.name] ? styles.hearted : ""}`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleFav(hotel.name);
                  }}
                  aria-label={favorites[hotel.name] ? "Remove from favorites" : "Add to favorites"}
                >
                  ♥ <span className={styles.heartLabel}>{favorites[hotel.name] ? "Saved" : "Favorite"}</span>
                </button>
              </div>

              <div className={styles.cuisines}>
                {hotel.cuisines.map((c) => (
                  <span key={`${hotel.name}-${c}`} className={styles.cuisineTag}>{c}</span>
                ))}
              </div>

              <div className={styles.metaRow}>
                <div className={styles.metaItem}>
                  <span className={styles.star}>★</span> {hotel.rating.toFixed(1)}
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.clock}>⏱</span> {hotel.eta} min
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.price}>{priceSymbols(hotel.priceLevel)}</span>
                </div>
              </div>

              <div className={styles.cardActionsRichSingle}>
                <button
                  type="button"
                  className={`${styles.primaryCta} ${styles.shimmer}`}
                  onClick={(e) => handleBookClick(e, hotel)}
                >
                  Book Table
                </button>
              </div>
            </a>
          ))
        ) : (
          <p className={styles.noResults}>No hotels found for "{query}"</p>
        )}
      </div>

      <div className={styles.footerNote}>
          For ordering food you don’t need to login or create an account. Just type your table number, Your Name and contact details. Then click on View menu. Then select food from the menu and add to cart. You can also add suggestions like "Make food Spicy/Sweet" in the Suggestion box.
      </div>

      <footer className={styles.footer}>
        <div className={styles.footerTop}>
          <div className={styles.footerBrand}>
            <div className={styles.footerLogo}>🍽 DineEase</div>
            <p className={styles.footerTagline}>
              Smarter, seamless dining — order, track, and reserve with ease.
            </p>
          </div>
          <div className={styles.footerCols}>
            <div className={styles.footerCol}>
              <h4>Explore</h4>
              <ul>
                <li><a href="/about">About Us</a></li>
                <li><a href="/WhyWasDineEaseDeveloped">Why DineEase?</a></li>
                <li><a href="/WhoBenefitsFromDineEase">Who Benefits</a></li>
                <li><a href="/OurVisionMission">Vision & Mission</a></li>
              </ul>
            </div>
            <div className={styles.footerCol}>
              <h4>Support</h4>
              <ul>
                <li><a href="/contactus">Contact Us</a></li>
                <li><a href="/ChatBot">Chat (InGeniBot)</a></li>
                <li><a href="mailto:dineease.info@gmail.com">Email Support</a></li>
              </ul>
            </div>
            <div className={styles.footerCol}>
              <h4>Legal</h4>
              <ul>
                <li><a href="/PrivacyPolicy">Privacy Policy</a></li>
                <li><a href="/TermsOfUse">Terms of Use</a></li>
                <li><a href="/CookiesPolicy">Cookies</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <div className={styles.socialRow}>
            <a href="#" aria-label="Instagram" className={styles.socialBtn}><IconInsta /></a>
            <a href="#" aria-label="Facebook" className={styles.socialBtn}><IconLinkedIn /></a>
            <a href="#" aria-label="Twitter" className={styles.socialBtn}><IconGithub /></a>
            <a href="#" aria-label="LinkedIn" className={styles.socialBtn}><IconWhatsApp /></a>
          </div>
          <div className={styles.copyRow}>
            <span>© {new Date().getFullYear()} DineEase. All rights reserved.</span>
            <p style={{marginTop:'7px', fontSize:'10px'}}>
              Developed by <b className={styles.devLink} onClick={() => setShowDevProfile(true)}>Darshan Akshay Upadhye</b> & <b className={styles.devLink} onClick={() => setShowTeamModal(true)}>Team.</b>
            </p>
          </div>
        </div>
      </footer>

      {/* Favorites Modal */}
      {showFavModal && (
        <div className={styles.modalOverlay} role="dialog" aria-modal="true" onClick={() => setShowFavModal(false)}>
          <div className={`${styles.favModal}`} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalClose} aria-label="Close" onClick={() => setShowFavModal(false)}>×</button>
            <h3 className={styles.modalTitle}>Favorites</h3>
            <div className={styles.favModalList}>
              {favoriteList.length === 0 ? (
                <p className={styles.favEmpty}>No favorites yet</p>
              ) : (
                favoriteList.map((h) => (
                  <div key={`fav-modal-${h.name}`} className={styles.favModalItem}>
                    <div className={styles.favModalText}>
                      <span className={styles.favName}>{h.name}</span>
                      <span className={styles.favMeta}>{h.place} • {h.type}</span>
                      <div className={styles.favMetaRow}>
                        <span>★ {h.rating.toFixed(1)}</span>
                        <span>⏱ {h.eta} min</span>
                        <span>{priceSymbols(h.priceLevel)}</span>
                      </div>
                      <div className={styles.favCuisineWrap}>
                        {h.cuisines.map(c => (
                          <span key={`${h.name}-c-${c}`} className={styles.cuisineTag}>{c}</span>
                        ))}
                      </div>
                    </div>
                    <div className={styles.favModalActions}>
                      <button type="button" className={styles.primaryBtn} onClick={(e) => { setShowFavModal(false); handleBookClick(e as any, h); }}>
                        Book
                      </button>
                      <button type="button" className={styles.favUnsave} onClick={() => toggleFav(h.name)}>
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Booking Modal (Modified to include Table Selection) */}
      {isModalOpen && !showConfirmation && (
        <div className={styles.modalOverlay} role="dialog" aria-modal="true" onClick={closeModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()} style={{maxWidth: 600}}>
            <button className={styles.modalClose} aria-label="Close" onClick={closeModal}>×</button>
            <h3 className={styles.modalTitle}>Book a Table</h3>
            <p className={styles.modalSubtitle}>{activeHotel ? `Reservation at ${activeHotel.name} (${activeHotel.place})` : ""}</p>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formRow}>
                <label htmlFor="name">Full Name*</label>
                <input
                  ref={firstInputRef}
                  id="name"
                  type="text"
                  className={styles.formInput}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div className={styles.formRow}>
                <label htmlFor="email">Email Address*</label>
                <input
                  id="email"
                  type="email"
                  className={styles.formInput}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="name@example.com"
                  required
                />
              </div>

              {/* Table Selection Area (New Feature) */}
              <div className={styles.formRow}>
                <label>Select Table*</label>
                <div className={styles.tableSelectionArea}>
                    <div className={styles.screenLabel}>Entrance / Reception</div>
                    <div className={styles.tableGrid}>
                        {Array.from({length: totalTables}, (_, i) => i + 1).map((num) => {
                            const isOccupied = occupiedTables.includes(num);
                            return (
                                <button
                                    key={num}
                                    type="button"
                                    disabled={isOccupied}
                                    className={`${styles.seatBtn} ${form.tableNumber === num ? styles.seatSelected : ''} ${isOccupied ? styles.seatOccupied : ''}`}
                                    onClick={() => setForm({...form, tableNumber: num})}
                                >
                                    {num}
                                </button>
                            );
                        })}
                    </div>
                    <div className={styles.legend}>
                        <div className={styles.legendItem}><span className={`${styles.dot} ${styles.lAvail}`}></span> Available</div>
                        <div className={styles.legendItem}><span className={`${styles.dot} ${styles.lSel}`}></span> Selected</div>
                        <div className={styles.legendItem}><span className={`${styles.dot} ${styles.lOcc}`}></span> Occupied</div>
                    </div>
                </div>
              </div>

              <div className={styles.rowGrid}>
                <div className={styles.formRow}>
                  <label htmlFor="people">How many people*</label>
                  <input
                    id="people"
                    type="number"
                    className={styles.formInput}
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
                    className={styles.formInput}
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
                    className={styles.formInput}
                    value={form.time}
                    onChange={(e) => setForm({ ...form, time: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <label htmlFor="seating">Seating preference</label>
                <select
                  id="seating"
                  className={styles.formInput}
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
                <label htmlFor="requests">Special requests</label>
                <textarea
                  id="requests"
                  rows={3}
                  className={styles.formInput}
                  value={form.requests}
                  onChange={(e) => setForm({ ...form, requests: e.target.value })}
                  placeholder="Allergies, high chair, occasion, etc."
                />
              </div>

              {submitMsg && <div className={styles.toast}>{submitMsg}</div>}

              <div className={styles.modalActions}>
                <button type="button" className={styles.secondaryBtn} onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" className={styles.primaryBtn}>
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation Pop-up */}
      {showConfirmation && confirmedDetails && (
        <div className={styles.confirmationOverlay} role="alertdialog" aria-modal="true">
          <div className={styles.confirmationModal}>
            <img
              src="/images/Done.svg"
              alt="Booking Confirmed"
              className={styles.animatedDoneImage}
            />
            <h3>Booking Confirmed!</h3>
            <p className={styles.confText}>
              Thanks, <b>{confirmedDetails.user}</b>! Your request for a table at <b>Hotel Abhiruchi</b> has been received. 
              Please check your email (<b>{confirmedDetails.email}</b>) for your official booking confirmation ticket.
            </p>
            <button
              onClick={closeConfirmation}
              className={styles.primaryBtn}
              style={{ marginTop: "20px", width: "100%" }}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}