const express = require('express');
const router = express.Router();

router.get('/categories', getCategories)
router.post('/categories', addCategory);
router.get('/categories/:id', readCategory);
router.put('/categories/:id', updateCategory);
router.delete('/categories/:id', deleteCategory);

module.exports = router;