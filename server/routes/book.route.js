const express = require("express");
const multer = require("multer");
const Book = require("../database/models/book");
const BorrowRequest = require("../database/models/borrowRequest");
const { authenticate } = require("../middleware/auth");

const router = express.Router();

// ========================
// Multer Setup for File Uploads
// ========================
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// ========================
// Add a New Book (Authenticated Lender)
// ========================
router.post("/", authenticate, upload.single("image"), async (req, res) => {
  try {
    const { title, author, genre, description } = req.body;

    if (!title || !author) {
      return res.status(400).json({ message: "Title and author are required." });
    }

    const book = new Book({
      title,
      author,
      genre,
      description,
      image: req.file ? `/uploads/${req.file.filename}` : null,
      userId: req.user._id,
      status: "Available", // Default status is Available
    });

    await book.save();
    res.status(201).json({ message: "Book listed successfully", book });
  } catch (err) {
    console.error("Error listing book:", err);
    res.status(500).json({ message: "Server error while listing book." });
  }
});

// ========================
// Get Available Books for Borrowing
// ========================
router.get("/", authenticate, async (req, res) => {
  try {
    const { genre } = req.query;
    const filter = { status: "Available" };

    if (genre) {
      filter.genre = { $regex: new RegExp(genre, "i") };
    }

    const books = await Book.find(filter).sort({ createdAt: -1 });
    res.status(200).json(books);
  } catch (err) {
    console.error("Error fetching books:", err);
    res.status(500).json({ message: "Server error while fetching books." });
  }
});

// ========================
// Borrow a Book (Authenticated Borrower)
// ========================
router.post("/borrow", authenticate, async (req, res) => {
  try {
    const { bookId } = req.body;
    const userId = req.user._id;

    const book = await Book.findById(bookId);
    if (!book || book.status !== "Available") {
      return res.status(400).json({ message: "Book is not available for borrowing." });
    }

    const existingRequest = await BorrowRequest.findOne({ bookId, userId });
    if (existingRequest) {
      return res.status(400).json({ message: "Borrow request already exists for this book." });
    }

    const borrowRequest = new BorrowRequest({ bookId, userId });
    await borrowRequest.save();

    res.status(201).json({ message: "Borrow request created successfully." });
  } catch (error) {
    console.error("Error creating borrow request:", error);
    res.status(500).json({ message: "Failed to create borrow request." });
  }
});

// ========================
// Manage Borrow Requests (Authenticated Lender)
// ========================
router.get("/lender-requests", authenticate, async (req, res) => {
  try {
    const userId = req.user._id;

    const requests = await BorrowRequest.find()
      .populate({
        path: "bookId",
        match: { userId }, // Only books owned by this lender
      })
      .populate("userId", "name email");

    const filteredRequests = requests.filter((req) => req.bookId !== null);

    res.status(200).json(filteredRequests);
  } catch (error) {
    console.error("Error fetching lender requests:", error);
    res.status(500).json({ message: "Failed to fetch requests." });
  }
});

// ========================
// Approve or Reject Borrow Requests
// ========================
router.patch("/requests/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value." });
    }

    const request = await BorrowRequest.findById(id).populate("bookId");
    if (!request || !request.bookId.userId.equals(req.user._id)) {
      return res.status(403).json({ message: "Unauthorized to manage this request." });
    }

    if (status === "Approved") {
      request.bookId.status = "Borrowed";
      await request.bookId.save();
    }

    request.status = status;
    await request.save();

    res.status(200).json({ message: `Request ${status.toLowerCase()} successfully.` });
  } catch (error) {
    console.error("Error updating request:", error);
    res.status(500).json({ message: "Failed to update request." });
  }
});

// ========================
// Delete a Book (Authenticated Lender)
// ========================
router.delete("/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found." });
    }

    if (!book.userId.equals(req.user._id)) {
      return res.status(403).json({ message: "Unauthorized to delete this book." });
    }

    await book.remove();
    res.status(200).json({ message: "Book deleted successfully." });
  } catch (err) {
    console.error("Error deleting book:", err);
    res.status(500).json({ message: "Server error while deleting book." });
  }
});

module.exports = router;
git remote add origin https://github.com/HashiniK/ShelfShare.git
git branch -M main
git push -u origin main