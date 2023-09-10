import express, { json } from "express";
import { PORT, MONGODB_URL } from "./config.js";
import mongoose from "mongoose";
import booksRoutes from "./routes/bookRoutes.js";
import cors from "cors";

const app = express();

// Middleware for parsing request
// Option 1: Allow all origins with default of CORS(*)
// app.use(cors());
// Option 2: Allow custom origins
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
}))


app.get("/", (req, res) => {
  res.status(200).send("MERN Stack Book Store Project");
});

// Book Routes
app.use('/books', booksRoutes);

// MongoDB connection
mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.info("Database connection successfuull");

    app.listen(PORT, () => {
      console.log(`Backend is running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });
