const express = require("express");
const User = require("../database/models/user");
const bcrypt = require("bcrypt");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      role,
      favoriteGenre,
      address,
      booksToLend,
      preferredDuration,
      interestedBooks,
      pickupLocation
    } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with all relevant data
    const user = new User({
      fullName,
      email,
      password: hashedPassword,
      role,
      favoriteGenre,
      address,
      booksToLend: role === "lender" ? booksToLend : undefined,
      preferredDuration: role === "lender" ? preferredDuration : undefined,
      interestedBooks: role === "borrower" ? interestedBooks : undefined,
      pickupLocation: role === "borrower" ? pickupLocation : undefined,
    });

    await user.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (err) {
    let errorMessage;

    if (err.code === 11000) {
      errorMessage = "Email already exists";
    } else if (err.name === "ValidationError") {
      errorMessage = Object.values(err.errors)
        .map((val) => val.message)
        .join(", ");
    } else {
      errorMessage = err.message;
    }

    res.status(500).json({
      success: false,
      message: errorMessage,
    });
  }
});

module.exports = router;