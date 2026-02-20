const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Ensure this path matches your file structure
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// --- 1. SIGNUP ROUTE ---
router.post('/signup', async (req, res) => {
  try {
    // We receive 'fullName' now, NOT 'username'
    const { fullName, email, password, role, location } = req.body;

    // Validation
    if (!fullName || !email || !password || !role) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if user exists by EMAIL
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists with this email" });
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create User (Saving to fullName and email fields)
    const newUser = new User({
      fullName: fullName,
      email: email,
      password: hashedPassword,
      role: role,
      location: location || ""
    });

    await newUser.save();

    // Create Token
    const token = jwt.sign(
      { id: newUser._id, role: newUser.role }, 
      process.env.JWT_SECRET || "secret_key", 
      { expiresIn: "1h" }
    );

    res.status(201).json({ message: "Signup successful", token, role: newUser.role });

  } catch (err) {
    console.error("Signup Route Error:", err);
    res.status(500).json({ error: "Server error during signup" });
  }
});

// --- 2. LOGIN ROUTE (Fixes your Crash) ---
router.post('/login', async (req, res) => {
  try {
    // The frontend sends { username: "email@example.com", password: "..." }
    // We capture that 'username' input
    const { username, password } = req.body;

    // Validation
    if (!username || !password) {
      return res.status(400).json({ error: "Please provide email and password" });
    }

    // CRITICAL FIX: The database does NOT have a 'username' field anymore.
    // We must search the 'email' field using the input we got.
    const user = await User.findOne({ email: username });

    if (!user) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }

    // Check Password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }

    // Generate Token
    const token = jwt.sign(
      { id: user._id, role: user.role }, 
      process.env.JWT_SECRET || "secret_key", 
      { expiresIn: "1h" }
    );

    res.json({ 
      token, 
      role: user.role,
      user: { id: user._id, name: user.fullName, email: user.email } 
    });

  } catch (err) {
    console.error("Login Route Error:", err);
    // If it crashes, this ensures we get JSON back, not HTML
    res.status(500).json({ error: "Server error during login" });
  }
});

module.exports = router;