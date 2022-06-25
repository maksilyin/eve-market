const express = require('express');
const router = express.Router();
const importRoutes = require('./importRoutes');
const typeRoutes = require('./typeRoutes');
const regionRoutes = require('./regionRoutes');
const marketGroupRoutes = require('./marketGroupRoutes');
const orderRoutes = require('./orderRoutes');
const stationRoutes = require('./stationRoutes');

//router.use('/import/', importRoutes);

router.use('/types/', typeRoutes);

router.use('/regions/', regionRoutes);

router.use('/marketGroups/', marketGroupRoutes);

router.use('/orders/', orderRoutes);

router.use('/stations/', stationRoutes);

module.exports = router