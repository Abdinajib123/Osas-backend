import express from "express";
import dotenv from "dotenv";
import userRoutes from "./src/routes/userRutes.js";
import programRoutes from "./src/routes/programRoute.js";



import connectDB from "./dbconfig/dbconfig.js"; // Import the database connection


dotenv.config();

// Initialize Express App
const app = express();

app.use("/api", userRoutes);
app.use("/api/programs", programRoutes);



// Middleware for parsing JSON bodies
app.use(express.json());



// Start the server after successful DB connection
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});