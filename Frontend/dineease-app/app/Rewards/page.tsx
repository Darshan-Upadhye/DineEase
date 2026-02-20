"use client";

import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import Image from "next/image";
import styles from "./Rewards.module.css";

// --- Assets ---
const PROFILE_CARD_IMAGE = "/images/Profile_Card_DineEase.svg";
const WALLET_CARD_IMAGE = "/images/DineCoin_Card_DineEase.svg";
const COIN_IMAGE = "/images/DineCoin.svg";
const SCRATCH_ICON = "/images/Scratch_Card_Icon.svg"; // Icon for the button
const SCRATCH_COVER = "/images/Scratch_Card_Cover.svg"; // Actual cover for the modal

// --- Mock Data for Visual Purpose ---
const DEMO_USER = {
  name: "Darshan Upadhye",
  id: "DU1001",
  tier: "Ace",
  coins: 850,
  tierColor: "#daad21",
};

// --- Reusable Modal Component ---
const Modal = ({
  isOpen,
  onClose,
  children,
  className,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}) => {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={`${styles.modalContent} ${className || ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.closeBtn} onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  );
};

const RewardsPage: NextPage = () => {
  // UI State
  const [profileOpen, setProfileOpen] = useState(false);
  const [walletOpen, setWalletOpen] = useState(false);
  const [quizOpen, setQuizOpen] = useState(false);
  const [referOpen, setReferOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  
  // Scratch Card State
  const [scratchModalOpen, setScratchModalOpen] = useState(false);
  const [isScratched, setIsScratched] = useState(false);

  // Handlers
  const handleScratch = () => {
    setIsScratched(true);
  };

  const closeScratch = () => {
    setScratchModalOpen(false);
    // Reset after a delay so it's fresh next time
    setTimeout(() => setIsScratched(false), 500);
  };

  return (
    <div className={styles.page}>
      {/* Background Decor */}
      <div className={styles.blobA} />
      <div className={styles.blobB} />
      <div className={styles.gridBg} />

      {/* --- Header --- */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.title}>DineEase Rewards</h1>
          <button className={styles.infoBtn} onClick={() => setInfoOpen(true)} title="Info">
            <span>i</span>
          </button>
        </div>
        <div className={styles.headerRight}>
          <button className={styles.iconBtn} onClick={() => setProfileOpen(true)}>
            <span>👤</span> <small>Profile</small>
          </button>
          <button className={styles.iconBtn} onClick={() => setWalletOpen(true)}>
            <span>💰</span> <small>{DEMO_USER.coins}</small>
          </button>
        </div>
      </header>

      {/* --- Main Content --- */}
      <main className={styles.main}>
        {/* Hero Illustration */}
        <section className={styles.hero}>
          <div className={styles.heroTextBox}>
            <h2>Unlock Exclusive Tastes</h2>
            <p>Earn coins, scratch cards, and elevate your dining tier.</p>
          </div>
          <div className={styles.heroImageWrapper}>
            <Image
              src="/images/Reward_Illustrate.svg"
              alt="Rewards Hero"
              width={400}
              height={300}
              className={styles.heroImg}
              priority
            />
          </div>
        </section>

        {/* Action Cards Grid */}
        <section className={styles.actionsGrid}>
          
          {/* 1. Scratch Card Action */}
          <div className={styles.actionCard}>
            <div className={styles.cardHeader}>Daily Scratch</div>
            <div className={styles.cardIconArea}>
              <Image src={SCRATCH_ICON} alt="Scratch" width={120} height={120} className={styles.floatingIcon} />
            </div>
            <button className={styles.primaryBtn} onClick={() => setScratchModalOpen(true)}>
              Play Now
            </button>
          </div>

          {/* 2. Quiz Action */}
          <div className={styles.actionCard}>
            <div className={styles.cardHeader}>Weekly Quiz</div>
            <p className={styles.cardSub}>Test your knowledge and earn +20 coins.</p>
            <button className={styles.secondaryBtn} onClick={() => setQuizOpen(true)}>
              Start Quiz
            </button>
          </div>

          {/* 3. Refer Action */}
          <div className={styles.actionCard}>
            <div className={styles.cardHeader}>Refer a Friend</div>
            <p className={styles.cardSub}>Invite friends to DineEase and get rewards.</p>
            <button className={styles.secondaryBtn} onClick={() => setReferOpen(true)}>
              Invite
            </button>
          </div>

        </section>
      </main>

      {/* --- Disclaimer Footer --- */}
      <footer className={styles.footerDisclaimer}>
        <p>⚠️ <strong>Visual Prototype Only:</strong> This is for demonstration and reward idea purposes. The actual project logic will be live soon.</p>
      </footer>

      {/* ================= MODALS ================= */}

      {/* 1. Profile Modal (Flip Effect) */}
      <Modal isOpen={profileOpen} onClose={() => setProfileOpen(false)} className={styles.flipCardModal}>
        <div className={styles.modalTitle}>My Profile</div>
        <div className={styles.visualCardContainer}>
          <img src={PROFILE_CARD_IMAGE} alt="Profile Card" className={styles.cardBgImage} />
          <div className={styles.cardOverlayContent}>
            <div className={styles.cardName}>{DEMO_USER.name}</div>
            <div className={styles.cardLabel}>User ID</div>
            <div className={styles.cardValue}>{DEMO_USER.id}</div>
          </div>
        </div>
        <div className={styles.modalActions}>
            <button className={styles.primaryBtn}>Edit Details</button>
            <button className={styles.secondaryBtn} onClick={() => setProfileOpen(false)}>Logout</button>
        </div>
      </Modal>

      {/* 2. Wallet Modal (Flip Effect) */}
      <Modal isOpen={walletOpen} onClose={() => setWalletOpen(false)} className={styles.flipCardModal}>
        <div className={styles.modalTitle}>My Wallet</div>
        <div className={styles.visualCardContainer}>
          <img src={WALLET_CARD_IMAGE} alt="Wallet Card" className={styles.cardBgImage} />
          <div className={styles.cardOverlayContent}>
            <div className={styles.cardName}>{DEMO_USER.name}</div>
            <div className={styles.tierBadge} style={{ background: DEMO_USER.tierColor }}>
              {DEMO_USER.tier} Member
            </div>
          </div>
        </div>
        <div className={styles.balanceDisplay}>
            <span>Total Balance:</span>
            <strong>{DEMO_USER.coins} DineCoins</strong>
        </div>
        <div className={styles.modalActions}>
            <button className={styles.primaryBtn}>Redeem Coupon</button>
        </div>
      </Modal>

      {/* 3. Scratch Card Game Modal */}
      <Modal isOpen={scratchModalOpen} onClose={closeScratch} className={styles.fadeScale}>
        <div className={styles.modalTitle}>Scratch & Win</div>
        <div className={styles.scratchGameArea}>
            {/* The Reward (Behind) */}
            <div className={styles.scratchReward}>
                <Image src={COIN_IMAGE} alt="Coin" width={80} height={80} className={styles.coinSpin} />
                <h3>+50 Coins!</h3>
            </div>
            
            {/* The Cover (Front) - Click to "scratch" (fade out) */}
            <div 
                className={`${styles.scratchCover} ${isScratched ? styles.revealed : ''}`}
                onClick={handleScratch}
            >
                <img src={SCRATCH_COVER} alt="Scratch me" />
                <div className={styles.scratchHint}>👆 Tap to Scratch</div>
            </div>
        </div>
        <div style={{textAlign: 'center', marginTop: 12}}>
            {isScratched ? 
                <button className={styles.primaryBtn} onClick={closeScratch}>Collect Reward</button> : 
                <p style={{color:'#888', fontSize: 14}}>Tap the card to reveal your prize.</p>
            }
        </div>
      </Modal>

      {/* 4. Quiz Modal (Static Visual) */}
      <Modal isOpen={quizOpen} onClose={() => setQuizOpen(false)} className={styles.fadeScale}>
        <div className={styles.modalTitle}>Weekly Quiz</div>
        <div className={styles.quizQuestion}>
            Which color represents the "Ace" tier in DineEase?
        </div>
        <div className={styles.quizOptions}>
            <button className={styles.quizOption}>Blue</button>
            <button className={`${styles.quizOption} ${styles.correctOption}`}>Gold/Yellow</button>
            <button className={styles.quizOption}>Green</button>
        </div>
      </Modal>

      {/* 5. Refer Modal */}
      <Modal isOpen={referOpen} onClose={() => setReferOpen(false)} className={styles.fadeScale}>
        <div className={styles.modalTitle}>Refer & Earn</div>
        <div className={styles.referBox}>
            <input readOnly value={`dineease.app/ref/${DEMO_USER.id}`} />
            <button className={styles.primaryBtn}>Copy Link</button>
        </div>
        <p style={{textAlign:'center', color:'#666', marginTop:12, fontSize:13}}>
            Earn 50 coins for every friend who signs up.
        </p>
      </Modal>

      {/* 6. Info Modal */}
      <Modal isOpen={infoOpen} onClose={() => setInfoOpen(false)} className={styles.fadeScale}>
        <div className={styles.modalTitle}>About Rewards</div>
        <ul className={styles.infoList}>
            <li>🥉 <strong>Bronze:</strong> 0 - 200 Coins</li>
            <li>🥈 <strong>Gold:</strong> 200 - 300 Coins</li>
            <li>💎 <strong>Platinum:</strong> 300 - 500 Coins</li>
            <li>👑 <strong>Ace:</strong> 500+ Coins</li>
        </ul>
      </Modal>

    </div>
  );
};

export default RewardsPage;