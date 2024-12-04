const express = require("express");
const cors = require("cors");
const userroutes = require("./routes/userroutes");
const cookieParser = require("cookie-parser");
const app = express();

app.use(cookieParser());

// var corsOptions = {
//   origin: "http://localhost:3000",
//   // origin:"https://digital-library-alpha.vercel.app/",
//   credentials: true,
// };
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://ipl-fulltoss-kfi8.vercel.app/",
      "https://ipl-fulltoss.onrender.com",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.options("*", cors());

app.use(express.json());
app.use("/", userroutes);
module.exports = app;
