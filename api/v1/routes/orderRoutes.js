const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/OrderController');

router.get('/:type_id/', OrderController.getOrders);

module.exports = router;