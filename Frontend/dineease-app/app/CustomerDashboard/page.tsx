"use client";
import React, { useEffect, useState, useMemo, useRef } from "react";
import styles from "./CustomerDashboard.module.css";

type Hotel = {
  id: string;
  name: string;
  place: string;
  type: "Veg" | "Non-Veg";
  rating: number;
  eta: number;
  priceLevel: 1 | 2 | 3;
  cuisines: string[];
};

export default function CustomerDashboard() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [showFavModal, setShowFavModal] = useState(false);

  // Replace with real API fetch
  useEffect(() => {
    // Example dummy data fetch or backend call
    setHotels([
      // Your real hotel data here after verification
    ]);
  }, []);

  const filteredHotels = useMemo(() => {
    const q = query.toLowerCase();
    return hotels.filter((hotel) => {
      const matchesQuery =
        hotel.name.toLowerCase().includes(q) ||
        hotel.place.toLowerCase().includes(q) ||
        hotel.cuisines.some((c) => c.toLowerCase().includes(q));
      const matchesFilter = filter ? hotel.type === filter : true;
      return matchesQuery && matchesFilter;
    });
  }, [hotels, query, filter]);

  const favoriteList = useMemo(
    () => hotels.filter((h) => favorites[h.name]),
    [favorites, hotels]
  );

  const toggleFav = (name: string) => {
    setFavorites((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <div className={styles.page}>
      <div className={styles.gridBg} />
      <div className={styles.blobA} />
      <div className={styles.blobB} />

      <div className={styles.brandTL}>🍽 DineEase</div>

      <nav className={styles.topRightNav}>
        <button className={styles.navBtn} aria-label="Profile">
          <span className={styles.btnDot}></span> CustomerName
        </button>
        <a href="/logout" className={styles.navBtn}>
          Logout
        </a>
      </nav>

      <section className={styles.centerHero}>
        <h1 className={styles.heroTitle}>Welcome, Customer!</h1>
        <p className={styles.heroSubtitle}>Discover and book hotels nearby 🍽</p>

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
            <a
              key={hotel.id}
              href={`/hotels/${hotel.id}`}
              className={styles.hotelCardRich}
              aria-label={`Go to ${hotel.name} page`}
            >
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
                  className={`${styles.heartBtnInline} ${
                    favorites[hotel.name] ? styles.hearted : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    toggleFav(hotel.name);
                  }}
                  aria-label={favorites[hotel.name] ? "Remove from favorites" : "Add to favorites"}
                >
                  ♥ <span className={styles.heartLabel}>{favorites[hotel.name] ? "Saved" : "Favorite"}</span>
                </button>
              </div>

              <div className={styles.cuisines}>
                {hotel.cuisines.map((c) => (
                  <span key={`${hotel.id}-${c}`} className={styles.cuisineTag}>
                    {c}
                  </span>
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
                  <span className={styles.price}>{"₹".repeat(hotel.priceLevel)}</span>
                </div>
              </div>

              <div className={styles.cardActionsRichSingle}>
                <button
                  type="button"
                  className={`${styles.primaryCta} ${styles.shimmer}`}
                  // onClick with booking modal or navigation
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
    </div>
  );
}
