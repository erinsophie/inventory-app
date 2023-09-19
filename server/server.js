const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");

// connect to database
connectDB();

// route handlers
const movieRoutes = require("./routes/movieRoutes");
const categoryRoutes = require("./routes/categoryRoutes");

// start express server
const app = express();

// middlewares
app.use(cors());
// parses JSON into an object before it reaches the controllers so its properties can be accessed
app.use(express.json());

// define route handlers
app.use("/api/movies", movieRoutes);
app.use("/api/categories", categoryRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
