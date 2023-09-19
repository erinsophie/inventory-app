const Movie = require("../models/movie");

// get all movies
exports.getMovies = async (req, res) => {
  try {
    const movies = await Movie.find().sort({ name: 1 }).exec();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.readMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id).exec();
    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addMovie = async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.status(201).json(movie)
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
