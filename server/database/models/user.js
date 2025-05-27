const mongoose = require("mongoose");

// Define a new schema for user registration
const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["borrower", "admin", "lender"],
    default: "lender",
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 128,
  },
  age: {
    type: Number,
    validate: {
      validator: function (value) {
        return value >= 18;
      },
      message: "Age must be at least 18.",
    },
  },
  favoriteGenre: {
    type: String,
  },
  address: {
    type: String,
  },
  booksToLend: {
    type: String,
  },
  preferredDuration: {
    type: String,
  },
  interestedBooks: {
    type: String,
  },
  pickupLocation: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create a model from the schema
const User = mongoose.model("User", UserSchema, "user");

// Export the User model
module.exports = User;
