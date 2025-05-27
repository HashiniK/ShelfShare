const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path"); // Import path for static files
const connectDB = require("./database/connect.js");

const register = require("./routes/register.route");
const login = require("./routes/login.route");
const loginJWT = require("./routes/login.route.JWT");
const bookRoutes = require("./routes/book.route");

require("dotenv").config();

const app = express();
const PORT = 8080;

// Middleware setup BEFORE routes
app.use(cors());
app.use(bodyParser.json());

// Serve the uploads directory statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Connect to database
connectDB();

// Routes
app.use("/register", register);
app.use("/login", login);
app.use("/loginJWT", loginJWT);
app.use("/books", bookRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
    console.log(`📂 Static files are served from http://localhost:${PORT}/uploads`);
});