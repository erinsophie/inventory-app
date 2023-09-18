require("dotenv").config();
const mongoose = require("mongoose");

const dbURI =
  "mongodb+srv://sophie:<password>@movieinventorycluster.ssajbsf.mongodb.net/?retryWrites=true&w=majority";

// connect to database
const connectDB = async () => {
  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected");
  } catch (err) {
    console.error(`Error connecting to database: ${err}`);
    process.exit(1);
  }
};

module.exports = connectDB;
