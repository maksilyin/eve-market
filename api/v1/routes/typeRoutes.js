const express = require('express');
const router = express.Router();
const typeController = require('../controllers/TypeController');

router.get('/search/', typeController.search)
router.get('/:id/', typeController.getById)

module.exports = router;