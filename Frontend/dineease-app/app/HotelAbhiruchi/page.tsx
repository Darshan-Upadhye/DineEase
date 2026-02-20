"use client";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import styles from "./HotelAbhiruchi.module.css";
import Link from "next/link";

const COIN_IMG = "/images/DineCoin.svg";

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
  img?: string;
  ingredients?: string[];
  preparation?: string;
  calories?: number;
  healthEffects?: string;
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
  name: "Hotel Abhiruchi",
  city: "Jaysingpur",
  rating: 4.4,
  eta: 20,
  priceLevel: 2,
  type: "Veg" as "Veg" | "Non-Veg",
};

const menuItems: FoodItem[] = [
  // --- STARTERS (Original) ---
  {
    id: "m1",
    name: "Masala Papad",
    price: 30,
    category: "Starters",
    tags: ["spicy", "light"],
    desc: "Crispy papad topped with chopped onions, tomatoes & tangy masala.",
    addons: [
      { label: "Extra Masala (+₹10)", price: 10 },
      { label: "Cheese Topping (+₹20)", price: 20 },
    ],
    img: `https://tse2.mm.bing.net/th?q=Masala%20Papad%20food&w=400&h=300`,
    ingredients: ["Papad", "Onion", "Tomato", "Coriander", "Chaat Masala"],
    preparation: "Fried or roasted papad topped with fresh salad mix.",
    calories: 70,
    healthEffects: "Low calorie appetizer; good for digestion.",
  },
  {
    id: "m2",
    name: "Paneer Tikka",
    price: 180,
    category: "Starters",
    tags: ["spicy", "tandoor"],
    desc: "Grilled cottage cheese cubes marinated in yogurt and spices.",
    addons: [
      { label: "Extra Cheese (+₹30)", price: 30 },
      { label: "Mint Chutney (+₹15)", price: 15 },
    ],
    img: `https://tse2.mm.bing.net/th?q=Paneer%20Tikka%20Kebab&w=400&h=300`,
    ingredients: ["Paneer", "Yogurt", "Besan", "Spices", "Capsicum"],
    preparation: "Marinated paneer grilled in tandoor until charred.",
    calories: 250,
    healthEffects: "High protein content; good for muscle repair.",
  },
  {
    id: "m3",
    name: "Hara Bhara Kabab",
    price: 160,
    category: "Starters",
    tags: ["healthy", "green"],
    desc: "Healthy patties made with spinach, green peas, and potatoes.",
    addons: [
      { label: "Mayonnaise (+₹15)", price: 15 },
    ],
    img: `https://tse2.mm.bing.net/th?q=Hara%20Bhara%20Kabab&w=400&h=300`,
    ingredients: ["Spinach", "Green Peas", "Potato", "Spices", "Cashews"],
    preparation: "Deep fried or pan seared spiced vegetable patties.",
    calories: 180,
    healthEffects: "Rich in iron and fiber from spinach.",
  },
  {
    id: "m4",
    name: "Crispy Corn",
    price: 140,
    category: "Starters",
    tags: ["crispy", "snack"],
    desc: "Deep fried corn kernels tossed with spices and capsicum.",
    addons: [
      { label: "Extra Spicy (+₹0)", price: 0 },
    ],
    img: `https://tse2.mm.bing.net/th?q=Crispy%20Corn%20Starter&w=400&h=300`,
    ingredients: ["Sweet Corn", "Corn Flour", "Black Pepper", "Capsicum"],
    preparation: "Boiled corn coated in flour and fried till golden.",
    calories: 220,
    healthEffects: "High energy snack; moderate oil content.",
  },

  // --- SOUPS (New) ---
  {
    id: "m22",
    name: "Cream of Tomato",
    price: 110,
    category: "Soups",
    tags: ["warm", "starter"],
    desc: "Classic tangy tomato soup served with crispy bread croutons.",
    addons: [
      { label: "Extra Cream (+₹10)", price: 10 },
      { label: "Extra Croutons (+₹10)", price: 10 },
    ],
    img: `https://tse2.mm.bing.net/th?q=Tomato%20Soup&w=400&h=300`,
    ingredients: ["Tomato", "Cream", "Butter", "Pepper", "Bread"],
    preparation: "Pureed tomatoes simmered with mild spices and cream.",
    calories: 120,
    healthEffects: "Rich in lycopene and Vitamin C.",
  },
  {
    id: "m23",
    name: "Veg Manchow Soup",
    price: 120,
    category: "Soups",
    tags: ["spicy", "chinese"],
    desc: "Spicy soy-based soup with minced vegetables and fried noodles.",
    addons: [
      { label: "Extra Fried Noodles (+₹10)", price: 10 },
    ],
    img: `https://tse2.mm.bing.net/th?q=Veg%20Manchow%20Soup&w=400&h=300`,
    ingredients: ["Cabbage", "Carrot", "Soy Sauce", "Ginger", "Chili"],
    preparation: "Vegetables simmered in spicy broth thickened with cornstarch.",
    calories: 140,
    healthEffects: "Warm and soothing for throat; contains sodium.",
  },

  // --- SOUTH INDIAN (New) ---
  {
    id: "m19",
    name: "Masala Dosa",
    price: 90,
    category: "South Indian",
    tags: ["breakfast", "crispy"],
    desc: "Thin fermented rice crepe filled with spiced potato mash.",
    addons: [
      { label: "Extra Butter (+₹15)", price: 15 },
      { label: "Cheese (+₹25)", price: 25 },
    ],
    img: `https://tse2.mm.bing.net/th?q=Masala%20Dosa&w=400&h=300`,
    ingredients: ["Rice Batter", "Potato", "Onion", "Mustard Seeds", "Curry Leaves"],
    preparation: "Batter spread on hot griddle, filled with bhaji and folded.",
    calories: 350,
    healthEffects: "Fermented batter provides probiotics; high carbs.",
  },
  {
    id: "m20",
    name: "Idli Sambar",
    price: 70,
    category: "South Indian",
    tags: ["healthy", "steamed"],
    desc: "Soft steamed rice cakes served with lentil soup and coconut chutney.",
    addons: [
      { label: "Vada (+₹20)", price: 20 },
    ],
    img: `https://tse2.mm.bing.net/th?q=Idli%20Sambar&w=400&h=300`,
    ingredients: ["Rice", "Urad Dal", "Lentils", "Vegetables"],
    preparation: "Steamed fermented batter served hot.",
    calories: 180,
    healthEffects: "Oil-free, easily digestible, and gut-friendly.",
  },
  {
    id: "m21",
    name: "Onion Uttapam",
    price: 100,
    category: "South Indian",
    tags: ["pancake", "savory"],
    desc: "Thick rice pancake topped with chopped onions and cilantro.",
    addons: [
      { label: "Butter (+₹15)", price: 15 },
      { label: "Gunpowder Masala (+₹10)", price: 10 },
    ],
    img: `https://tse2.mm.bing.net/th?q=Onion%20Uttapam&w=400&h=300`,
    ingredients: ["Rice Batter", "Onion", "Green Chilies", "Coriander"],
    preparation: "Thick batter cooked with toppings on a tawa.",
    calories: 280,
    healthEffects: "Good source of energy; onions provide antioxidants.",
  },

  // --- CHINESE (New) ---
  {
    id: "m24",
    name: "Veg Manchurian Dry",
    price: 150,
    category: "Chinese",
    tags: ["spicy", "starter"],
    desc: "Deep-fried mixed vegetable balls tossed in spicy soy-garlic sauce.",
    addons: [
      { label: "Extra Gravy (+₹30)", price: 30 },
    ],
    img: `https://tse2.mm.bing.net/th?q=Veg%20Manchurian%20Dry&w=400&h=300`,
    ingredients: ["Cabbage", "Carrot", "Maida", "Soy Sauce", "Ginger-Garlic"],
    preparation: "Fried veggie balls tossed in high-flame wok sauce.",
    calories: 280,
    healthEffects: "Contains MSG and high sodium; consume moderately.",
  },
  {
    id: "m25",
    name: "Veg Hakka Noodles",
    price: 160,
    category: "Chinese",
    tags: ["noodles", "kids-choice"],
    desc: "Boiled noodles stir-fried with crunchy vegetables and mild sauces.",
    addons: [
      { label: "Schezwan Sauce (+₹20)", price: 20 },
      { label: "Paneer Cubes (+₹40)", price: 40 },
    ],
    img: `https://tse2.mm.bing.net/th?q=Veg%20Hakka%20Noodles&w=400&h=300`,
    ingredients: ["Noodles", "Cabbage", "Capsicum", "Soy Sauce", "Vinegar"],
    preparation: "Wok-tossed noodles with julienned veggies.",
    calories: 320,
    healthEffects: "High carb dish; veggies add fiber.",
  },
  {
    id: "m26",
    name: "Paneer Chilli",
    price: 190,
    category: "Chinese",
    tags: ["spicy", "paneer"],
    desc: "Battered paneer cubes tossed with capsicum, onion and chilies.",
    addons: [
      { label: "Extra Spicy (+₹0)", price: 0 },
    ],
    img: `https://tse2.mm.bing.net/th?q=Paneer%20Chilli%20Dry&w=400&h=300`,
    ingredients: ["Paneer", "Capsicum", "Onion", "Soy Sauce", "Green Chili"],
    preparation: "Fried paneer tossed in spicy chili sauce.",
    calories: 350,
    healthEffects: "High protein but high sodium and oil.",
  },

  // --- MAIN COURSE (Original & New) ---
  {
    id: "m5",
    name: "Paneer Butter Masala",
    price: 220,
    category: "Main Course",
    tags: ["rich", "creamy"],
    desc: "Soft paneer cubes simmered in a rich and creamy tomato gravy.",
    addons: [
      { label: "Extra Butter (+₹20)", price: 20 },
      { label: "Cheese Garnish (+₹25)", price: 25 },
    ],
    img: `https://tse2.mm.bing.net/th?q=Paneer%20Butter%20Masala&w=400&h=300`,
    ingredients: ["Paneer", "Butter", "Cream", "Cashew Paste", "Tomato"],
    preparation: "Slow cooked tomato gravy finished with cream and butter.",
    calories: 450,
    healthEffects: "Calcium rich but high in saturated fats.",
  },
  {
    id: "m6",
    name: "Veg Kolhapuri",
    price: 200,
    category: "Main Course",
    tags: ["spicy", "hot"],
    desc: "Mixed vegetables cooked in a spicy and flavorful Kolhapuri masala.",
    addons: [
      { label: "Extra Spicy (+₹0)", price: 0 },
      { label: "Roasted Papad (+₹10)", price: 10 },
    ],
    img: `https://tse2.mm.bing.net/th?q=Veg%20Kolhapuri&w=400&h=300`,
    ingredients: ["Mixed Veggies", "Dry Coconut", "Red Chilies", "Spices"],
    preparation: "Vegetables cooked in a spicy coconut-based gravy.",
    calories: 300,
    healthEffects: "Rich in vitamins from mixed vegetables.",
  },
  {
    id: "m32",
    name: "Veg Handi",
    price: 210,
    category: "Main Course",
    tags: ["mixed-veg", "spicy"],
    desc: "Mixed vegetables cooked in a pot with traditional spices.",
    addons: [
      { label: "Butter Roti Combo (+₹40)", price: 40 },
    ],
    img: `https://tse2.mm.bing.net/th?q=Veg%20Handi&w=400&h=300`,
    ingredients: ["Carrot", "Beans", "Cauliflower", "Paneer", "Handi Masala"],
    preparation: "Veggies stir fried and simmered in onion gravy.",
    calories: 280,
    healthEffects: "Fiber rich from assorted vegetables.",
  },
  {
    id: "m31",
    name: "Kaju Curry",
    price: 260,
    category: "Main Course",
    tags: ["royal", "rich"],
    desc: "Roasted cashews simmered in a rich, sweet and spicy onion-tomato gravy.",
    addons: [
      { label: "Cheese Grated (+₹30)", price: 30 },
    ],
    img: `https://tse2.mm.bing.net/th?q=Kaju%20Curry&w=400&h=300`,
    ingredients: ["Cashew Nuts", "Onion", "Tomato", "Cream", "Khoya"],
    preparation: "Roasted cashews added to rich makhani gravy.",
    calories: 550,
    healthEffects: "High calorie and high fat; energy dense.",
  },
  {
    id: "m33",
    name: "Methi Matar Malai",
    price: 230,
    category: "Main Course",
    tags: ["creamy", "mild"],
    desc: "Fresh fenugreek leaves and green peas in a rich white cashew gravy.",
    addons: [
      { label: "Sweet Corn (+₹20)", price: 20 },
    ],
    img: `https://tse2.mm.bing.net/th?q=Methi%20Matar%20Malai&w=400&h=300`,
    ingredients: ["Methi", "Green Peas", "Cream", "Cashew", "Milk"],
    preparation: "Mildly spiced creamy white curry.",
    calories: 400,
    healthEffects: "Methi aids digestion; dish is high in fat.",
  },
  {
    id: "m7",
    name: "Dal Tadka",
    price: 140,
    category: "Main Course",
    tags: ["comfort food", "protein"],
    desc: "Yellow lentils tempered with ghee, garlic, and cumin seeds.",
    addons: [
      { label: "Jeera Rice Combo (+₹80)", price: 80 },
      { label: "Extra Ghee (+₹15)", price: 15 },
    ],
    img: `https://tse2.mm.bing.net/th?q=Dal%20Tadka%20Yellow&w=400&h=300`,
    ingredients: ["Toor Dal", "Ghee", "Garlic", "Cumin", "Chili"],
    preparation: "Boiled lentils tempered with aromatic spices.",
    calories: 200,
    healthEffects: "Excellent source of plant-based protein and fiber.",
  },
  {
    id: "m8",
    name: "Malai Kofta",
    price: 240,
    category: "Main Course",
    tags: ["sweet-savory", "rich"],
    desc: "Fried potato and paneer balls in a smooth cashew cream gravy.",
    addons: [
      { label: "Extra Cream (+₹20)", price: 20 },
    ],
    img: `https://tse2.mm.bing.net/th?q=Malai%20Kofta&w=400&h=300`,
    ingredients: ["Potato", "Paneer", "Cashew", "Cream", "Cardamom"],
    preparation: "Delicate koftas simmered in white cashew gravy.",
    calories: 500,
    healthEffects: "Very rich dish; consume in moderation.",
  },

  // --- MAHARASHTRIAN (New) ---
  {
    id: "m27",
    name: "Misal Pav",
    price: 90,
    category: "Maharashtrian",
    tags: ["spicy", "local-favorite"],
    desc: "Spicy sprouted bean curry topped with farsan, served with pav.",
    addons: [
      { label: "Extra Pav (+₹10)", price: 10 },
      { label: "Extra Rassa (+₹20)", price: 20 },
      { label: "Curd Bowl (+₹20)", price: 20 },
    ],
    img: `https://tse2.mm.bing.net/th?q=Misal%20Pav&w=400&h=300`,
    ingredients: ["Sprouts", "Farsan", "Onion", "Misal Masala", "Oil"],
    preparation: "Sprouts cooked in spicy watery gravy (kat/rassa).",
    calories: 450,
    healthEffects: "High protein from sprouts, but very spicy and oily.",
  },
  {
    id: "m28",
    name: "Pithla Bhakri",
    price: 120,
    category: "Maharashtrian",
    tags: ["traditional", "healthy"],
    desc: "Gram flour curry (Pithla) served with Jowar Bhakri and Thecha.",
    addons: [
      { label: "Extra Bhakri (+₹20)", price: 20 },
      { label: "Extra Thecha (+₹10)", price: 10 },
    ],
    img: `https://tse2.mm.bing.net/th?q=Pithla%20Bhakri&w=400&h=300`,
    ingredients: ["Besan", "Jowar Flour", "Green Chili", "Garlic"],
    preparation: "Slow cooked besan curry with handmade millet bread.",
    calories: 300,
    healthEffects: "Gluten-free (Bhakri); high fiber and protein.",
  },

  // --- RICE (Original & New) ---
  {
    id: "m9",
    name: "Veg Biryani",
    price: 180,
    category: "Rice",
    tags: ["aromatic", "rice"],
    desc: "Aromatic basmati rice cooked with mixed vegetables and spices.",
    addons: [
      { label: "Raita (+₹20)", price: 20 },
      { label: "Extra Salan (+₹15)", price: 15 },
    ],
    img: `https://tse2.mm.bing.net/th?q=Veg%20Biryani&w=400&h=300`,
    ingredients: ["Basmati Rice", "Carrot", "Beans", "Biryani Masala", "Yogurt"],
    preparation: "Dum cooked rice layered with spiced vegetables.",
    calories: 450,
    healthEffects: "Carbohydrate rich; provides sustained energy.",
  },
  {
    id: "m10",
    name: "Jeera Rice",
    price: 120,
    category: "Rice",
    tags: ["simple", "rice"],
    desc: "Steamed basmati rice tossed with cumin seeds and coriander.",
    addons: [
      { label: "Dal Fry (+₹100)", price: 100 },
    ],
    img: `https://tse2.mm.bing.net/th?q=Jeera%20Rice&w=400&h=300`,
    ingredients: ["Basmati Rice", "Cumin Seeds", "Ghee", "Coriander"],
    preparation: "Rice tempered with ghee and cumin.",
    calories: 300,
    healthEffects: "Light on the stomach; aids digestion.",
  },
  {
    id: "m34",
    name: "Curd Rice",
    price: 130,
    category: "Rice",
    tags: ["cooling", "south-indian"],
    desc: "Soft rice mixed with yogurt, tempered with mustard seeds and curry leaves.",
    addons: [
      { label: "Pickle (+₹0)", price: 0 },
      { label: "Papad (+₹10)", price: 10 },
    ],
    img: `https://tse2.mm.bing.net/th?q=Curd%20Rice&w=400&h=300`,
    ingredients: ["Rice", "Yogurt", "Mustard Seeds", "Curry Leaves", "Pomegranate"],
    preparation: "Mashed rice mixed with fresh curd and tempering.",
    calories: 220,
    healthEffects: "Excellent for digestion and cooling the stomach.",
  },

  // --- BREADS (Original) ---
  {
    id: "m11",
    name: "Butter Naan",
    price: 45,
    category: "Breads",
    tags: ["tandoor"],
    desc: "Soft Indian flatbread cooked in tandoor with butter on top.",
    addons: [],
    img: `https://tse2.mm.bing.net/th?q=Butter%20Naan&w=400&h=300`,
    ingredients: ["Maida", "Butter", "Yeast", "Milk"],
    preparation: "Dough baked in clay oven and brushed with butter.",
    calories: 150,
    healthEffects: "High glycemic index; moderate calories.",
  },
  {
    id: "m12",
    name: "Tandoori Roti",
    price: 30,
    category: "Breads",
    tags: ["healthy", "whole wheat"],
    desc: "Whole wheat bread baked in a clay oven.",
    addons: [
      { label: "Butter (+₹10)", price: 10 },
    ],
    img: `https://tse2.mm.bing.net/th?q=Tandoori%20Roti&w=400&h=300`,
    ingredients: ["Whole Wheat Flour", "Water"],
    preparation: "Traditional wheat bread baked in tandoor.",
    calories: 100,
    healthEffects: "Good source of fiber; healthier than naan.",
  },
  {
    id: "m13",
    name: "Garlic Naan",
    price: 55,
    category: "Breads",
    tags: ["flavorful"],
    desc: "Naan topped with minced garlic and coriander.",
    addons: [],
    img: `https://tse2.mm.bing.net/th?q=Garlic%20Naan&w=400&h=300`,
    ingredients: ["Maida", "Garlic", "Butter", "Coriander"],
    preparation: "Naan dough infused with garlic flavor and baked.",
    calories: 160,
    healthEffects: "Garlic has immune-boosting properties.",
  },

  // --- SNACKS (New) ---
  {
    id: "m29",
    name: "Pav Bhaji",
    price: 130,
    category: "Snacks",
    tags: ["street-food", "butter"],
    desc: "Mashed vegetable curry cooked with plenty of butter, served with soft buns.",
    addons: [
      { label: "Extra Butter (+₹20)", price: 20 },
      { label: "Cheese Grated (+₹25)", price: 25 },
      { label: "Extra Pav (+₹10)", price: 10 },
    ],
    img: `https://tse2.mm.bing.net/th?q=Pav%20Bhaji&w=400&h=300`,
    ingredients: ["Potato", "Cauliflower", "Peas", "Butter", "Pav Bhaji Masala"],
    preparation: "Boiled veggies mashed and cooked with butter on tawa.",
    calories: 500,
    healthEffects: "Vegetable rich but high in saturated fats (butter).",
  },
  {
    id: "m30",
    name: "Veg Grilled Sandwich",
    price: 110,
    category: "Snacks",
    tags: ["light", "quick"],
    desc: "Bread stuffed with cucumber, tomato, potato and grilled crisp.",
    addons: [
      { label: "Cheese Slice (+₹20)", price: 20 },
      { label: "Mayo Dip (+₹15)", price: 15 },
    ],
    img: `https://tse2.mm.bing.net/th?q=Veg%20Grilled%20Sandwich&w=400&h=300`,
    ingredients: ["Bread", "Cucumber", "Tomato", "Potato", "Green Chutney"],
    preparation: "Layered vegetables in bread, buttered and grilled.",
    calories: 250,
    healthEffects: "Balanced snack with carbs and veggies.",
  },

  // --- DESSERTS (Original & New) ---
  {
    id: "m14",
    name: "Gulab Jamun",
    price: 80,
    category: "Desserts",
    tags: ["sweet", "traditional"],
    desc: "Soft deep-fried dough balls soaked in rose-flavored sugar syrup.",
    addons: [
      { label: "Vanilla Ice Cream (+₹40)", price: 40 },
    ],
    img: `https://tse2.mm.bing.net/th?q=Gulab%20Jamun&w=400&h=300`,
    ingredients: ["Khoya", "Sugar", "Rose Water", "Cardamom"],
    preparation: "Deep fried khoya balls soaked in warm syrup.",
    calories: 300,
    healthEffects: "High sugar; treat for special occasions.",
  },
  {
    id: "m15",
    name: "Sizzling Brownie",
    price: 180,
    category: "Desserts",
    tags: ["chocolate", "hot-cold"],
    desc: "Hot walnut brownie served on a sizzler plate with ice cream.",
    addons: [
      { label: "Extra Chocolate Sauce (+₹20)", price: 20 },
    ],
    img: `https://tse2.mm.bing.net/th?q=Sizzling%20Brownie&w=400&h=300`,
    ingredients: ["Brownie", "Vanilla Ice Cream", "Chocolate Sauce", "Walnuts"],
    preparation: "Served on a hot iron plate for sizzling effect.",
    calories: 450,
    healthEffects: "High calorie decadent dessert.",
  },
  {
    id: "m35",
    name: "Rasmalai",
    price: 100,
    category: "Desserts",
    tags: ["sweet", "cold"],
    desc: "Soft paneer discs soaked in chilled sweetened milk with saffron.",
    addons: [
      { label: "Extra Saffron Milk (+₹30)", price: 30 },
    ],
    img: `https://tse2.mm.bing.net/th?q=Rasmalai&w=400&h=300`,
    ingredients: ["Chhena", "Milk", "Saffron", "Pistachios", "Sugar"],
    preparation: "Milk boiled to half volume and sweetened.",
    calories: 250,
    healthEffects: "High calcium, but high sugar content.",
  },

  // --- BEVERAGES (Original) ---
  {
    id: "m16",
    name: "Masala Chai",
    price: 30,
    category: "Beverages",
    tags: ["hot", "tea"],
    desc: "Traditional Indian spiced tea brewed with fresh milk.",
    addons: [],
    img: `https://tse2.mm.bing.net/th?q=Masala%20Chai&w=400&h=300`,
    ingredients: ["Tea Dust", "Ginger", "Cardamom", "Milk", "Sugar"],
    preparation: "Boiled mixture of milk, tea, and spices.",
    calories: 90,
    healthEffects: "Refreshing and good for colds.",
  },
  {
    id: "m17",
    name: "Sweet Lassi",
    price: 60,
    category: "Beverages",
    tags: ["cold", "yogurt"],
    desc: "Thick and creamy beaten yogurt topped with malai.",
    addons: [
      { label: "Dry Fruits (+₹20)", price: 20 },
    ],
    img: `https://tse2.mm.bing.net/th?q=Sweet%20Lassi&w=400&h=300`,
    ingredients: ["Yogurt", "Sugar", "Cardamom", "Cream"],
    preparation: "Churned yogurt sweetened and chilled.",
    calories: 200,
    healthEffects: "Good probiotic; cools the body.",
  },
  {
    id: "m18",
    name: "Cold Coffee",
    price: 80,
    category: "Beverages",
    tags: ["cold", "caffeine"],
    desc: "Chilled coffee blended with creamy milk and ice cream.",
    addons: [
      { label: "Choco Chips (+₹10)", price: 10 },
      { label: "Extra Ice Cream (+₹30)", price: 30 },
    ],
    img: `https://tse2.mm.bing.net/th?q=Cold%20Coffee%20Milkshake&w=400&h=300`,
    ingredients: ["Coffee Powder", "Milk", "Sugar", "Ice Cream"],
    preparation: "Blended coffee served chilled.",
    calories: 180,
    healthEffects: "Instant energy boost; contains sugar.",
  }
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
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paidStatus, setPaidStatus] = useState(false);

  const [showInfoModal, setShowInfoModal] = useState(false);
  const [infoItem, setInfoItem] = useState<FoodItem | null>(null);

  const [showScratchModal, setShowScratchModal] = useState(false);

  const closeInstructionModal = () => setShowInstructionModal(false);

  const onPayNow = () => {
    setShowPaymentModal(false);
    setPaymentSuccess(true);
    setPaidStatus(true);
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

  const hasAllOrdersReceived = cart.length > 0 && cart.every((item) => item.received);

  const addToCart = (
    item: FoodItem,
    customization: { spice: string; addons: Addon[]; notes: string } | null = null
  ) => {
    // If all current orders received and step is placed,
    // disallow add to cart except by "Order More / Extra Items" button option (which sets step to "menu")
    if (step === "placed" && hasAllOrdersReceived) {
      // prevent addToCart unless user is on menu (step "menu")
      return;
    }

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
    setShowInfoModal(false);
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
    // If all current orders received and step is placed, block customization add
    if (step === "placed" && hasAllOrdersReceived) {
      return;
    }
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
        <div className={styles.modalOverlay} onClick={() => setShowInstructionModal(false)}>
          <div
            className={`${styles.modal} ${styles.modalAnimatedContainer}`}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="instruction-modal-title"
          >
            <button className={styles.modalClose} aria-label="Close instruction modal" onClick={closeInstructionModal}>
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

      {orderPlacedPopup && (
        <div className={styles.popupOrderPlaced}>
          <div>
            <h3 style={{ margin: "10px 0", color: "#4caf50" }}>Order Placed!</h3>
            <div>
              <img src="/images/Done.svg" alt="Done" style={{ width: 96, verticalAlign: 'middle', animation: "popIn 0.8s ease" }} />
            </div>
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
            <input placeholder="Table Number" type="text"
              value={orderDetails.table}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setOrderDetails({ ...orderDetails, table: e.target.value })
              }
              required
            />
          </div>
          <div className={styles.formRow}>
            <label>Name</label>
            <input placeholder="Your Name" type="text"
              value={orderDetails.name}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setOrderDetails({ ...orderDetails, name: e.target.value })
              }
              required
            />
          </div>
          <div className={styles.formRow}>
            <label>Contact</label>
            <input placeholder="Phone or Email" type="text"
              value={orderDetails.contact}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setOrderDetails({ ...orderDetails, contact: e.target.value })
              }
              required
            />
          </div>
          <button className={styles.primaryCta} type="submit">Proceed to Menu</button>
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
                      <article
                        key={item.id}
                        className={styles.menuCard}
                        onClick={() => {
                          setInfoItem(item);
                          setShowInfoModal(true);
                        }}
                        tabIndex={0}
                        style={{ cursor: "pointer" }}
                      >
                        <button
                          className={styles.infoBtn}
                          aria-label="Food Info"
                          tabIndex={-1}
                          onClick={e => {
                            e.stopPropagation();
                            setInfoItem(item);
                            setShowInfoModal(true);
                          }}
                        >
                          i
                        </button>
                        <h4>{item.name}</h4>
                        <p className={styles.desc}>{item.desc}</p>
                        <div className={styles.metaRow}>
                          <span>₹{item.price}</span>
                          <span className={styles.tags}>{item.tags.join(", ")}</span>
                        </div>
                        <button
                          className={styles.primaryCta}
                          onClick={e => {
                            e.stopPropagation();
                            openCustomization(item);
                          }}
                          disabled={step === "placed" && hasAllOrdersReceived}
                          title={
                            step === "placed" && hasAllOrdersReceived ? "Add items by clicking Order More / Extra Items" : undefined
                          }
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
              <p><b>Table:</b> {orderDetails.table}</p>
              <p><b>Name:</b> {orderDetails.name}</p>
              <p><b>Contact:</b> {orderDetails.contact}</p>
            </div>
            <h3>Your Cart</h3>
            {cart.length === 0 ? (
              <p>Cart is empty</p>
            ) : (
              <>
                <ul>
                  {cart.map((i) => (
                    <li key={i.key} className={i.received ? styles.receivedItem : undefined}>
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
                          title={!canMarkReceived ? "Mark Received after order placed" : ""}
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
                  <button className={styles.primaryCta} onClick={placeOrder}>Place Order</button>
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
                    <button className={styles.primaryCta} style={{ marginTop: 10 }} onClick={() => setStep("menu")}>
                      Order More / Extra Items
                    </button>
                    <button className={styles.primaryCta} style={{ marginTop: 12 }} onClick={finishOrder}>
                      Finish & View Receipt
                    </button>
                  </>
                )}
              </>
            )}
          </aside>
        </div>
      )}

      {showInfoModal && infoItem && (
        <div className={styles.modalOverlay} onClick={() => setShowInfoModal(false)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={() => setShowInfoModal(false)} aria-label="Close Info Modal">&times;</button>
            <h3>{infoItem.name}</h3>
            {infoItem.img && (
              <img src={infoItem.img} alt={infoItem.name + " image"} style={{ width: "160px", borderRadius: "12px", margin: "16px auto", display: "block" }} />
            )}
            <p><b>Description:</b> {infoItem.desc}</p>
            {infoItem.ingredients && (
              <p><b>Ingredients:</b> {infoItem.ingredients.join(", ")}</p>
            )}
            {infoItem.preparation && (
              <p><b>Preparation:</b> {infoItem.preparation}</p>
            )}
            {infoItem.calories && (
              <p><b>Calories:</b> {infoItem.calories} kcal</p>
            )}
            {infoItem.healthEffects && (
              <p><b>Health Info:</b> {infoItem.healthEffects}</p>
            )}
            <div className={styles.modalActions}>
              <button className={styles.primaryCta} onClick={() => addToCart(infoItem, null)}>
                Add to Cart
              </button>
              <button className={styles.secondaryBtn} onClick={() => setShowInfoModal(false)}>
                Close
              </button>
            </div>
          </div>
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
            <button
              className={styles.rewardBtn}
              style={{ marginLeft: "8px", color: "#ff6b35", fontWeight: "600" }}
              onClick={() => setShowScratchModal(true)}
            >
              Scratch Card / Rewards
            </button>
          </div>
        </section>
      )}

      {showScratchModal && (
        <div className={styles.modalOverlay} onClick={() => setShowScratchModal(false)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <button className={styles.modalClose} aria-label="Close reward modal" onClick={() => setShowScratchModal(false)}>
              &times;
            </button>
            <div style={{ textAlign: "center", marginBottom: 5 }}>
              <img src={COIN_IMG} alt="Dine Coin" className={styles.coinLarge} style={{ width: "200px", height: "200px", margin: "-50px" }} />
            </div>
            <h3 style={{ color: "#ff6b35", fontWeight: 800, textAlign: "center" }}>Login Required</h3>
            <p style={{ fontSize: "16px", margin: "14px 0 12px 0", color: "#222", fontWeight: 600, textAlign: "center" }}>
              Login to access <span style={{ color: "#ff6b35" }}>Scratch Card</span> and <span style={{ color: "#ff6b35" }}>Reward</span> features!
            </p>
            <ul style={{ textAlign: "left", fontSize: "15px", color: "#222", margin: "0 auto 10px", padding: 0, listStyle: "none", maxWidth: 320 }}>
              <li style={{ marginBottom: 8 }}>✨ Earn <b style={{ color: "#ff6b35" }}>DineCoins</b> daily by scratching/spinning!</li>
              <li style={{ marginBottom: 8 }}>🎉 More orders = more rewards!</li>
              <li style={{ marginBottom: 8 }}>🏆 Redeem coins for gifts, coupons, and discounts.</li>
            </ul>
            <div style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}>
              <Link href="/Login" className={styles.primaryCta} style={{ fontSize: "17px", padding: "12px 36px", textAlign: "center" }}>
                Login / Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}

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
                <p><b>UPI ID:</b> hotelmoraya@upi</p>
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

      {paymentSuccess && (
        <div className={styles.popupOrderPlaced}>
          <div>
            <h3 style={{ margin: "10px 0", color: "#4caf50" }}>Payment Successful!</h3>
            <div>
              <img src="/images/Done.svg" alt="Done" style={{ width: 96, verticalAlign: 'middle', animation: "popIn 0.8s ease" }} />
            </div>
            <div style={{ color: "#ff6b35" }}>{orderID && <>Order ID: <b>{orderID}</b></>}</div>
            <div style={{ marginTop: "8px", fontSize: "15px" }}>Thank you; payment received.</div>
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
