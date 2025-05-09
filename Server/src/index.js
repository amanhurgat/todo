const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./Routes/user.routes");
const todoRoutes = require("./Routes/todo.routes");
const { verifyToken } = require("./Middleware/user.middleware");
require("dotenv").config();

const app = express();
app.use(express.json());
const allowedOrigins = [
  "https://todo-eta-eight-15.vercel.app",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
//app.use(cors({origin:'https://todo-eta-eight-15.vercel.app/' |'http://localhost:5173', credentials: true}));
app.use(bodyParser.json());

userRoutes(app);
todoRoutes(app);

app.get("/", (req, res) => {
  res.send("API is running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

mongoose.connect(process.env.DB_URL).then(() => {
  console.log("Connected to MongoDB");
});
