const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const envFile =
  process.env.NODE_ENV === 'production'
    ? '.env.production'
    : '.env.development';
require('dotenv').config({ path: envFile });

// connect to database
connectDB();

// route handlers
const movieRoutes = require('./routes/movieRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

// start express server
const app = express();

const currentOrigin = process.env.CORS_ORIGIN;

// middlewares
app.use(cors({ origin: currentOrigin }));
// parses JSON into an object before it reaches the controllers so its properties can be accessed
app.use(express.json());

// define route handlers
app.use('/api/movies', movieRoutes);
app.use('/api/categories', categoryRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
