const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  // Changed from 'username' to 'fullName' to store the actual name
  fullName: { type: String, required: true },
  
  // Email is now the unique identifier (used as username for login)
  email: { type: String, required: true, unique: true },
  
  password: { type: String, required: true },
  
  role: {
    type: String,
    enum: ["customer", "hotel"],
    required: true
  },
  
  // Added location because your Hotel Sign Up form sends it
  location: { type: String, default: "" }
});

module.exports = mongoose.model("User", UserSchema);