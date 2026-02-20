"use client";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import styles from "./HotelShatakshi.module.css";

type Addon = {
  label: string;
  price: number;
};

type FoodItem = {
  id: string;
  name: string;
  price: number;
  category: string;
  tags: string[];
  desc: string;
  addons: Addon[];
};

type CartItem = FoodItem & {
  key: string;
  qty: number;
  spice: string;
  addons: Addon[];
  notes: string;
  price: number;
  received: boolean;
};

const hotel = {
  name: "Hotel Shatakshi",
  city: "Jaysingpur",
  rating: 4.4,
  eta: 20,
  priceLevel: 2,
  type: "Veg" as "Veg" | "Non-Veg",
};

const menuItems: FoodItem[] = [
  {
    id: "m1",
    name: "Masala Papad",
    price: 30,
    category: "Starters",
    tags: ["spicy"],
    desc: "Crispy papad topped with onions & masala.",
    addons: [
      { label: "Extra Masala (+₹10)", price: 10 },
      { label: "Cheese Topping (+₹20)", price: 20 },
    ],
  },
  {
    id: "m8",
    name: "Chili Paneer",
    price: 160,
    category: "Starters",
    tags: ["spicy", "paneer"],
    desc: "Paneer tossed in spicy chili sauce.",
    addons: [
      { label: "Extra Chili (+₹10)", price: 10 },
      { label: "Capsicum (+₹15)", price: 15 },
    ],
  },
  {
    id: "m9",
    name: "Veg Spring Roll",
    price: 90,
    category: "Starters",
    tags: ["crispy", "veg"],
    desc: "Stuffed rolls with veggies.",
    addons: [{ label: "Extra Dip (+₹10)", price: 10 }],
  },
  {
    id: "m18",
    name: "Paneer Tikka",
    price: 210,
    category: "Starters",
    tags: ["grilled", "spicy"],
    desc: "Grilled spicy paneer cubes.",
    addons: [{ label: "Extra Masala (+₹20)", price: 20 }],
  },
  {
    id: "m2",
    name: "Tomato Soup",
    price: 90,
    category: "Soup",
    tags: ["vegan"],
    desc: "Fresh tangy tomato soup, served hot.",
    addons: [
      { label: "Extra Bread (+₹15)", price: 15 },
      { label: "Cheese Croutons (+₹25)", price: 25 },
    ],
  },
  {
    id: "m10",
    name: "Sweet Corn Soup",
    price: 100,
    category: "Soup",
    tags: ["veg"],
    desc: "Sweet corn in creamy soup base.",
    addons: [
      { label: "Add Chili Sauce (+₹10)", price: 10 },
      { label: "Butter (+₹10)", price: 10 },
    ],
  },
  {
    id: "m19",
    name: "Hot and Sour Soup",
    price: 110,
    category: "Soup",
    tags: ["spicy", "veg"],
    desc: "Tangy and spicy vegetable soup.",
    addons: [{ label: "Extra Chili (+₹10)", price: 10 }],
  },
  {
    id: "m3",
    name: "Paneer Chatpata",
    price: 180,
    category: "Paneer Dishes",
    tags: ["veg"],
    desc: "Paneer in spicy tangy sauce with bell peppers.",
    addons: [
      { label: "Extra Paneer (+₹50)", price: 50 },
      { label: "Add Nuts (+₹30)", price: 30 },
    ],
  },
  {
    id: "m11",
    name: "Paneer Butter Masala",
    price: 200,
    category: "Paneer Dishes",
    tags: ["rich", "veg"],
    desc: "Paneer cubes in buttery tomato gravy.",
    addons: [
      { label: "Extra Butter (+₹20)", price: 20 },
      { label: "Extra Cream (+₹20)", price: 20 },
    ],
  },
  {
    id: "m5",
    name: "Veg Sairat",
    price: 190,
    category: "Veg Dishes",
    tags: ["spicy"],
    desc: "Signature spicy veg dish.",
    addons: [
      { label: "Extra Spice (+₹15)", price: 15 },
      { label: "Butter Add-on (+₹20)", price: 20 },
    ],
  },
  {
    id: "m12",
    name: "Mix Veg Curry",
    price: 140,
    category: "Veg Dishes",
    tags: ["veg"],
    desc: "Seasonal vegetables in curry.",
    addons: [{ label: "Add Paneer (+₹40)", price: 40 }],
  },
  {
    id: "m20",
    name: "Paneer Tikka Masala",
    price: 220,
    category: "Veg Dishes",
    tags: ["rich", "spicy"],
    desc: "Paneer in spiced creamy gravy.",
    addons: [{ label: "Extra Paneer (+₹50)", price: 50 }],
  },
  {
    id: "m7",
    name: "Dal Fry",
    price: 100,
    category: "Dal",
    tags: ["vegan", "protein-rich"],
    desc: "Yellow dal cooked with spices.",
    addons: [
      { label: "Extra Dal (+₹35)", price: 35 },
      { label: "Butter Ghee (+₹25)", price: 25 },
    ],
  },
  {
    id: "m13",
    name: "Dal Makhani",
    price: 150,
    category: "Dal",
    tags: ["veg", "rich"],
    desc: "Black dal in creamy sauce.",
    addons: [{ label: "Add Cream (+₹20)", price: 20 }],
  },
  {
    id: "m14",
    name: "Veg Manchurian",
    price: 140,
    category: "Chinese",
    tags: ["veg"],
    desc: "Veg balls in spicy sauce.",
    addons: [{ label: "Extra Gravy (+₹15)", price: 15 }],
  },
  {
    id: "m15",
    name: "Noodles",
    price: 120,
    category: "Chinese",
    tags: ["vegan"],
    desc: "Stir fried with vegetables.",
    addons: [{ label: "Extra Chili Sauce (+₹10)", price: 10 }],
  },
  {
    id: "m21",
    name: "Fried Rice",
    price: 130,
    category: "Chinese",
    tags: ["veg"],
    desc: "Veg fried rice with sauces.",
    addons: [{ label: "Extra Egg (+₹30)", price: 30 }],
  },
  {
    id: "m6",
    name: "Mango Juice",
    price: 50,
    category: "Cold Beverages",
    tags: ["vegan", "refreshing"],
    desc: "Fresh mango juice served chilled.",
    addons: [
      { label: "Add Ice Cream (+₹30)", price: 30 },
      { label: "Extra Mango Pulp (+₹20)", price: 20 },
    ],
  },
  {
    id: "m16",
    name: "Plain Lassi",
    price: 40,
    category: "Cold Beverages",
    tags: ["yogurt", "refreshing"],
    desc: "Sweet churned yogurt.",
    addons: [{ label: "Extra Sugar (+₹5)", price: 5 }],
  },
  {
    id: "m4",
    name: "Coffee",
    price: 50,
    category: "Hot Beverages",
    tags: [],
    desc: "Aromatic hot coffee.",
    addons: [
      { label: "Extra Cookies (+₹20)", price: 20 },
      { label: "Extra Milk (+₹15)", price: 15 },
    ],
  },
  {
    id: "m17",
    name: "Chai",
    price: 20,
    category: "Hot Beverages",
    tags: [],
    desc: "Classic Indian tea.",
    addons: [
      { label: "Ginger (+₹8)", price: 8 },
      { label: "Cardamom (+₹10)", price: 10 },
    ],
  },
];

const categories = [...new Set(menuItems.map((m) => m.category))];

function generateOrderID(): string {
  return "ORD" + Math.random().toString(36).substr(2, 6).toUpperCase();
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export default function HotelPage() {
  const [showInstructionModal, setShowInstructionModal] = useState(true);
  const [step, setStep] = useState<"form" | "menu" | "placed" | "receipt">("form");
  const [orderDetails, setOrderDetails] = useState({ table: "", name: "", contact: "" });
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orderID, setOrderID] = useState<string | null>(null);
  const [showReceipt, setShowReceipt] = useState(false);
  const [showCustomization, setShowCustomization] = useState(false);
  const [customizingItem, setCustomizingItem] = useState<FoodItem | null>(null);
  const [customSpice, setCustomSpice] = useState("Medium");
  const [customAddons, setCustomAddons] = useState<Addon[]>([]);
  const [customNotes, setCustomNotes] = useState("");
  const [orderTimer, setOrderTimer] = useState(0);
  const [orderPlacedPopup, setOrderPlacedPopup] = useState(false);
  const [splitBillCount, setSplitBillCount] = useState(1);
  const [showSplitInput, setShowSplitInput] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const closeInstructionModal = () => setShowInstructionModal(false);
  
  // New state for payment success popup and paid status
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paidStatus, setPaidStatus] = useState(false);

  // Handler when user clicks Pay Now in modal
  const onPayNow = () => {
    setShowPaymentModal(false);
    setPaymentSuccess(true);
    setPaidStatus(true);

    // Hide the success popup after 3 seconds
    setTimeout(() => {
      setPaymentSuccess(false);
    }, 3000);
  };

  useEffect(() => {
    if (step !== "placed" || orderTimer <= 0) return;
    const interval = setInterval(() => {
      setOrderTimer((t) => {
        if (t <= 1) {
          clearInterval(interval);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [orderTimer, step]);

  useEffect(() => {
    if (step !== "placed") return;
    const allReceived = cart.length > 0 && cart.every((i) => i.received);
    if (allReceived) setOrderTimer(0);
  }, [cart, step]);

  useEffect(() => {
    if (cart.length === 0) setOrderPlacedPopup(false);
  }, [cart.length]);

  const canMarkReceived = step === "placed";

  const addToCart = (
    item: FoodItem,
    customization: { spice: string; addons: Addon[]; notes: string } | null = null
  ) => {
    const id = customization ? item.id + JSON.stringify(customization) : item.id;
    setCart((prev) => {
      const found = prev.find((i) => i.key === id);
      if (found) {
        return prev.map((i) =>
          i.key === id ? { ...i, qty: i.qty + 1, received: false } : i
        );
      }
      const basePrice = item.price;
      const addonsPrice = customization ? customization.addons.reduce((acc, a) => acc + a.price, 0) : 0;
      const totalPrice = basePrice + addonsPrice;
      return [
        ...prev,
        {
          ...item,
          key: id,
          qty: 1,
          spice: customization?.spice || "Medium",
          addons: customization?.addons || [],
          notes: customization?.notes || "",
          price: totalPrice,
          received: false,
        },
      ];
    });
    closeCustomization();
  };

  const updateQty = (key: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) => (i.key === key ? { ...i, qty: Math.max(i.qty + delta, 0), received: false } : i))
        .filter((i) => i.qty > 0)
    );
  };

  const toggleReceived = (key: string) => {
    if (!canMarkReceived) return;
    setCart((prev) => prev.map((i) => (i.key === key ? { ...i, received: !i.received } : i)));
  };

  const totalPrice = cart.reduce((acc, i) => acc + i.price * i.qty, 0);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!orderDetails.table.trim() || !orderDetails.name.trim() || !orderDetails.contact.trim()) {
      alert("Please fill all details");
      return;
    }
    setOrderID(generateOrderID());
    setStep("menu");
  };

  const placeOrder = () => {
    if (cart.length === 0) {
      alert("Cart Empty!");
      return;
    }
    setOrderTimer(hotel.eta * 60);
    setStep("placed");
    setOrderPlacedPopup(true);
    setTimeout(() => {
      setOrderPlacedPopup(false);
    }, 3000);
  };

  const finishOrder = () => {
    setShowSplitInput(false);
    setShowReceipt(true);
    setStep("receipt");
  };

  const openCustomization = (item: FoodItem) => {
    setCustomizingItem(item);
    setCustomSpice("Medium");
    setCustomAddons([]);
    setCustomNotes("");
    setShowCustomization(true);
  };

  const closeCustomization = () => {
    setShowCustomization(false);
    setCustomizingItem(null);
  };

  const toggleAddon = (addon: Addon) => {
    setCustomAddons((prev) => {
      if (prev.find((a) => a.label === addon.label)) {
        return prev.filter((a) => a.label !== addon.label);
      }
      return [...prev, addon];
    });
  };

  const getCustomizedPrice = () => {
    if (!customizingItem) return 0;
    return customizingItem.price + customAddons.reduce((acc, a) => acc + a.price, 0);
  };

  const printBill = () => {
    const billContent = document.getElementById("billContent");
    if (!billContent) return;
    const perPerson = (totalPrice / splitBillCount).toFixed(2);
    const html = `
      ${billContent.innerHTML}
      <p style="margin-top:30px;">
        Thank you for dining with <b>DineEase!</b>
        <br/>
        We appreciate your trust and look forward to serving you again.
        <br/>
        <span style="margin-top:10px; display:block;">
          Have a wonderful day!
        </span>
      </p>
    `;
    const newWin = window.open("", "PrintBill", "width=600,height=700");
    if (!newWin) return;
    newWin.document.write(
      `<html><head><title>Bill</title><style>
      body { font-family: monospace; padding: 20px; }
      h2 { color: #ff6b35; }
      ul { list-style: none; padding: 0; }
      li { margin: 6px 0; }
      a { color: #ff6b35; text-decoration: underline; }
      </style></head><body>${html}</body></html>`
    );
    newWin.document.close();
    newWin.focus();
    newWin.print();
    newWin.close();
  };

  /// Inside your component function:
const paymentMethods = [
  { label: "By Cash", value: "cash" },
  { label: "UPI", value: "upi" },
  { label: "Credit Card", value: "credit" },
  { label: "Internet Banking", value: "netbank" },
  { label: "Debit Card", value: "debit" },
  { label: "Other", value: "other" },
];


  const [selectedPayment, setSelectedPayment] = useState(paymentMethods[0].value);
  return (
    <div className={styles.page}>
      <div className={styles.gridBg}></div>
      <div className={styles.blobA}></div>
      <div className={styles.blobB}></div>
      <div className={styles.brandTL}>🍽 DineEase</div>

      {showInstructionModal && (
  <div className={styles.modalOverlay} onClick={closeInstructionModal}>
    <div
      className={`${styles.modal} ${styles.modalAnimatedContainer}`}
      onClick={(e) => e.stopPropagation()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="instruction-modal-title"
    >
      <button
        className={styles.modalClose}
        aria-label="Close instruction modal"
        onClick={closeInstructionModal}
      >
        &times;
      </button>
      <h3 id="instruction-modal-title" className={styles.modalTitle}>
        ℹ️ How to Order & How It Works
      </h3>
      <ul className={styles.instructionList}>
        <li>No login or account required.</li>
        <li>Select food and add to cart.</li>
        <li>Click proceed and type your table number.</li>
        <li>Add suggestions like "Make food Spicy/Sweet".</li>
        <li>Customize Dishes: Choose spice levels, add‑ons, and special notes with real-time price updates.</li>
        <li>Real‑time ETA: View preparation time and status clearly.</li>
        <li>Easy, Secure Pay: Pay online, split bills, or settle at the counter quickly and flexibly.</li>
        <li>Enjoy seamless dining with <strong>DineEase</strong>.</li>
      </ul>
    </div>
  </div>
)}


      {/* Order placed pop-up */}
      {orderPlacedPopup && (
        <div className={styles.popupOrderPlaced}>
          <div>
            <h3 style={{ margin: "10px 0", color: "#4caf50" }}>Order Placed!</h3>
            <div style={{ color: "#ff6b35" }}>Order ID: <b>{orderID}</b></div>
            <div style={{ marginTop: "8px", fontSize: "15px" }}>Thank you, your order has been successfully placed.</div>
          </div>
        </div>
      )}
      <section className={styles.centerHero}>
        <h1 className={styles.heroTitle}>
          {hotel.name}{" "}
          <span className={hotel.type === "Veg" ? styles.vegTag : styles.nonVegTag}>
            {hotel.type}
          </span>
        </h1>
        <p className={styles.heroSubtitle}>Located at {hotel.city}</p>
        <div>⭐ {hotel.rating} | ⏱ {hotel.eta} mins | {"₹".repeat(hotel.priceLevel)}</div>
      </section>

      {step === "form" && (
        <form className={styles.formCard} onSubmit={handleFormSubmit}>
          <div className={styles.formRow}>
            <label>Table Number</label>
            <input
              placeholder="Table Number"
              type="text"
              value={orderDetails.table}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setOrderDetails({ ...orderDetails, table: e.target.value })
              }
              required
            ></input>
          </div>
          <div className={styles.formRow}>
            <label>Name</label>
            <input
              placeholder="Your Name"
              type="text"
              value={orderDetails.name}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setOrderDetails({ ...orderDetails, name: e.target.value })
              }
              required
            ></input>
          </div>
          <div className={styles.formRow}>
            <label>Contact</label>
            <input
              placeholder="Phone or Email"
              type="text"
              value={orderDetails.contact}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setOrderDetails({ ...orderDetails, contact: e.target.value })
              }
              required
            ></input>
          </div>
          <button className={styles.primaryCta} type="submit">
            Proceed to Menu
          </button>
        </form>
      )}

      {(step === "menu" || step === "placed") && (
        <div className={styles.menuLayout}>
          <div className={styles.menuSection}>
            {categories.map((cat) => (
              <section key={cat} className={styles.menuCategory}>
                <h2>{cat}</h2>
                <div className={styles.menuGrid}>
                  {menuItems
                    .filter((i) => i.category === cat)
                    .map((item) => (
                      <article key={item.id} className={styles.menuCard}>
                        <h4>{item.name}</h4>
                        <p className={styles.desc}>{item.desc}</p>
                        <div className={styles.metaRow}>
                          <span>₹{item.price}</span>
                          <span className={styles.tags}>{item.tags.join(", ")}</span>
                        </div>
                        <button
                          className={styles.primaryCta}
                          onClick={() => openCustomization(item)}
                        >
                          Add to Cart
                        </button>
                      </article>
                    ))}
                </div>
              </section>
            ))}
          </div>

          <aside className={styles.cart}>
            <div className={styles.customerInfo}>
              <h4>Customer Info</h4>
              <p>
                <b>Table:</b> {orderDetails.table}
              </p>
              <p>
                <b>Name:</b> {orderDetails.name}
              </p>
              <p>
                <b>Contact:</b> {orderDetails.contact}
              </p>
            </div>

            <h3>Your Cart</h3>
            {cart.length === 0 ? (
              <p>Cart is empty</p>
            ) : (
              <>
                <ul>
                  {cart.map((i) => (
                    <li
                      key={i.key}
                      className={i.received ? styles.receivedItem : undefined}
                    >
                      <div>
                        <b>{i.name}</b> x{i.qty} <br />
                        <small>Spice: {i.spice}</small>
                        <br />
                        {i.addons.length > 0 && (
                          <small>
                            Addons: {i.addons.map((a) => a.label).join(", ")}
                          </small>
                        )}
                        <br />
                        <small>Notes: {i.notes || "None"}</small>
                      </div>
                      <p>₹{i.price * i.qty}</p>
                      <div>
                        <button onClick={() => updateQty(i.key, 1)}>+</button>
                        <button onClick={() => updateQty(i.key, -1)}>-</button>
                      </div>
                      <div>
                        <button
                          disabled={!canMarkReceived}
                          onClick={() => toggleReceived(i.key)}
                          className={
                            i.received
                              ? styles.receivedBtnActive
                              : styles.receivedBtn
                          }
                          title={
                            !canMarkReceived
                              ? "Mark Received after order placed"
                              : ""
                          }
                        >
                          {i.received ? "Received" : "Mark Received"}
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
                <p>
                  <b>Total: ₹{totalPrice}</b>
                </p>
                {step === "menu" && (
                  <button className={styles.primaryCta} onClick={placeOrder}>
                    Place Order
                  </button>
                )}
                {step === "placed" && (
                  <>
                    {orderTimer > 0 && (
                      <p
                        style={{
                          marginTop: 10,
                          color: "#ff6b35",
                          fontWeight: "bold",
                        }}
                      >
                        Estimated Time Remaining: {formatTime(orderTimer)}
                      </p>
                    )}
                    <button
                      className={styles.primaryCta}
                      style={{ marginTop: 10 }}
                      onClick={() => setStep("menu")}
                    >
                      Order More / Extra Items
                    </button>
                    <button
                      className={styles.primaryCta}
                      style={{ marginTop: 12 }}
                      onClick={finishOrder}
                    >
                      Finish & View Receipt
                    </button>
                  </>
                )}
              </>
            )}
          </aside>
        </div>
      )}

      {showReceipt && (
        <section className={styles.receiptBox}>
          <h2>🧾 E-Receipt</h2>
          <div id="billContent">
            <p><b>Order ID:</b> {orderID}</p>
            <p><b>Name:</b> {orderDetails.name} | <b>Table:</b> {orderDetails.table}</p>
            <ul>
              {cart.map(i => <li key={i.key}>{i.name} x{i.qty} = ₹{i.price * i.qty}</li>)}
            </ul>
            <p><b>Total: ₹{totalPrice}</b></p>
          </div>

          {paidStatus && <div className={styles.paidLabel}>Paid &#10003;</div>}

          {showSplitInput && (
            <p style={{ fontWeight: "bold", marginTop: "10px" }}>
              Split between {splitBillCount} person(s): ₹
              {(totalPrice / splitBillCount).toFixed(2)} each
            </p>
          )}

          <p style={{ marginTop: "30px" }}>
            Thank you for dining with <b>DineEase!</b>
            <p>We appreciate your trust and look forward to serving you again.</p>
            <p style={{ marginTop: "10px" }}>Have a wonderful day!</p>
          </p>

          <div className={styles.receiptActions}>
            <button className={styles.primaryCta} onClick={printBill}>🖨 Print Bill</button>
            <button className={styles.secondaryBtn} onClick={() => setShowPaymentModal(true)}>💳 Pay</button>
            <a href="/Feedback" className={styles.secondaryBtn}>⭐ Feedback</a>
            <button className={styles.secondaryBtn} onClick={() => setShowSplitInput(s => !s)}>Split Bill</button>
            {showSplitInput && (
              <input
                type="number"
                min={1}
                value={splitBillCount}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  if (val > 0) setSplitBillCount(val);
                }}
                placeholder="No. of people"
                className={styles.splitInput}
                style={{ marginLeft: "10px" }}
              />
            )}
          </div>
        </section>
      )}

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className={styles.modalOverlay} onClick={() => setShowPaymentModal(false)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <button className={styles.modalClose} aria-label="Close payment modal" onClick={() => setShowPaymentModal(false)}>×</button>
            <h3 style={{ textAlign: "center", color: "#ff6b35" }}>Choose Payment Method</h3>
            <div style={{ marginBottom: "18px", textAlign: "center" }}>
              <b>Total Amount:</b> ₹{totalPrice}
            </div>
            <label htmlFor="payment-select" style={{ fontWeight: "600" }}>Payment Method</label>
            <select
              id="payment-select"
              className={styles.formRow}
              value={selectedPayment}
              onChange={e => setSelectedPayment(e.target.value)}
            >
              {paymentMethods.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
            </select>

            {selectedPayment === "upi" && (
              <div style={{ margin: "10px 0", textAlign: "center" }}>
                <p><b>UPI ID:</b> hotelshatakshi@upi</p>
                <img src="/images/qr-code.png" alt="Scan UPI QR" style={{ width: "140px", borderRadius: "8px" }} />
              </div>
            )}

            <div style={{ marginTop: "18px", textAlign: "center", fontSize: "13px", color: "#555" }}>
              {selectedPayment === "cash" && "Pay cash to your server after meal."}
              {selectedPayment === "credit" && "Pay by credit card at the counter or online."}
              {selectedPayment === "netbank" && "Select your internet banking provider at counter."}
              {selectedPayment === "debit" && "Pay by debit card at the counter."}
              {selectedPayment === "other" && "Ask the staff for more payment options."}
            </div>

            <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginTop: "16px" }}>
              <button className={styles.secondaryBtn} onClick={() => setShowPaymentModal(false)}>Cancel</button>
              <button className={styles.primaryCta} onClick={onPayNow}>Pay Now</button>
            </div>
          </div>
        </div>
      )}

      {showCustomization && customizingItem && (
        <div className={styles.modalOverlay} onClick={closeCustomization}>
          <div
            className={styles.modal}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <button
              onClick={closeCustomization}
              className={styles.modalClose}
              aria-label="Close customization modal"
            >
              &times;
            </button>
            <h3>Customize "{customizingItem.name}"</h3>
            <label>Spice Level:</label>
            <select
              value={customSpice}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setCustomSpice(e.target.value)
              }
            >
              {["Mild", "Medium", "Hot", "Extra Hot"].map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
            <label>Add-ons:</label>
            <div className={styles.addonOptions}>
              {customizingItem.addons.map((addon) => (
                <label key={addon.label} className={styles.addonLabel}>
                  <input
                    type="checkbox"
                    checked={customAddons.some((a) => a.label === addon.label)}
                    onChange={() => toggleAddon(addon)}
                  />
                  {addon.label}
                </label>
              ))}
            </div>
            <label>Special Notes:</label>
            <textarea
              value={customNotes}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                setCustomNotes(e.target.value)
              }
              placeholder="e.g. no onions"
            />

            <p>
              <b>Price: ₹{getCustomizedPrice()}</b>
            </p>

            <div className={styles.modalActions}>
              <button
                className={styles.primaryCta}
                onClick={() =>
                  addToCart(customizingItem, {
                    spice: customSpice,
                    addons: customAddons,
                    notes: customNotes,
                  })
                }
              >
                Add to Cart
              </button>
              <button className={styles.secondaryBtn} onClick={closeCustomization}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
