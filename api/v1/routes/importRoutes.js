const express = require('express');
const router = express.Router();
const controller = require('../controllers/ImportController');

router.get('/types', controller.importTypes);

router.get('/market-groups', controller.importMarketGroups);

router.get('/groups', controller.importGroups);

router.get('/category', controller.importCategory);

router.get('/regions', controller.importRegions);

router.get('/systems', controller.importSystems);

router.get('/stations', controller.importStations);

router.get('/structures', controller.importStructures);

router.get('/icons', controller.importIcons);

router.get('/set-main-parent-group', controller.setMainParentMarketGroupIdToType);

module.exports = router