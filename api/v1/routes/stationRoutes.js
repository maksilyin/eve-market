const express = require('express');
const router = express.Router();
const stationController = require('../controllers/StationController');

router.get('/jumps/', stationController.jumps)

module.exports = router;