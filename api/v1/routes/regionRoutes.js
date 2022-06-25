const express = require('express');
const router = express.Router();
const RegionController = require('../controllers/RegionController');

router.get('/', RegionController.all);

module.exports = router;