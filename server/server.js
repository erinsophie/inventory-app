const express = require("express");
const cors = require("cors");

// start express server
const app = express();

// middlewares
app.use(cors());
// parses JSON into an object before it reaches the controllers so its properties can be accessed
app.use(express.json());

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
