const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController");

router.get("/", movieController.getMovies);
router.post("/", movieController.addMovie);
router.get("/:id", movieController.readMovie);
//router.put("/:id", updateMovie);
router.delete("/:id", movieController.deleteMovie);

module.exports = router;
