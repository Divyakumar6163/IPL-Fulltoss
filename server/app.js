const express = require("express");
const cors = require("cors");
const userroutes = require("./routes/userroutes");
const cookieParser = require("cookie-parser");
const app = express();

// Middleware to parse cookies
app.use(cookieParser());

// CORS Configuration
app.use(
  cors({
    origin: [
      "http://localhost:3000", // Local development
      "https://ipl-fulltoss-kfi8.vercel.app", // Vercel Frontend
      "https://ipl-fulltoss.onrender.com", // Render Frontend
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], // Allowed HTTP methods
    credentials: true, // Allow cookies and credentials
    allowedHeaders: ["Content-Type", "Authorization"], // Allow these headers
  })
);

// Handle preflight requests for all routes
app.options("*", cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// API Routes
app.use("/", userroutes);

module.exports = app;
