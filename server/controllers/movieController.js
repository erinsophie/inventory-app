const Movie = require("../models/movie");

// get all movies
exports.getMovies = async (req, res) => {
  try {
    const movies = await Movie.find()
      .populate("category")
      .sort({ name: 1 })
      .exec();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.readMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id)
      .populate("category")
      .exec();
    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addMovie = async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.status(201).json(movie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndRemove(req.params.id);
    res.status(200).json({ message: "Movie has been deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
