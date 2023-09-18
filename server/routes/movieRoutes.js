const express = require('express');
const router = express.Router();

router.get('/movies', getMovies)
router.post('/movies', addMovie);
router.get('/movies/:id', readMovie);
router.put('/movies/:id', updateMovie);
router.delete('/movies/:id', deleteMovie);

module.exports = router;