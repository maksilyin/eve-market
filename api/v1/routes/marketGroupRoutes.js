const express = require('express');
const router = express.Router();
const MarketGroupController = require('../controllers/MarketGroupController');

router.get('/', MarketGroupController.marketGroups);
router.get('/parent/:parent_id/', MarketGroupController.marketGroupsByParentId);
router.get('/:id/types/', MarketGroupController.marketGroupTypes);

module.exports = router;