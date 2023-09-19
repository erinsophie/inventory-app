const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController");

router.get("/", movieController.getMovies);
//router.post("/", addMovie);
router.get("/:id", movieController.readMovie);
//router.put("/:id", updateMovie);
//router.delete("/:id", deleteMovie);

module.exports = router;
