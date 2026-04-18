let express = require("express");

let path = require("path");

let dotenv = require("dotenv");

let cors = require("cors");
let cookieParser = require("cookie-parser");

dotenv.config();

let app = express();

app.use(cors({
  
  origin: process.env.CORS_ORIGIN || "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));

const { connectDB } = require("./dbconnection");
const router = require("./router");

app.use("/api", router);

const PORT = process.env.PORT || 7000;

// Connect to database before starting the server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});