import express from "express";
import dotenv from "dotenv";

import connectDB from "./dbconfig/dbconfig.js"; // Import the database connection


dotenv.config();

// Initialize Express App
const app = express();



// Middleware for parsing JSON bodies
app.use(express.json());



// Start the server after successful DB connection
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});