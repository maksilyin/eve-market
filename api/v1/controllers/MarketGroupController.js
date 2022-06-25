const _ = require('lodash');
const { MarketGroupProvider, TypeProvider } = require('../providers/');
const MarketGroup = require('../models/marketGroup');

module.exports = {
    marketGroups: async function(req, res) {
        const arMarketGroup = await MarketGroupProvider.getMarketGroups();
        res.json(arMarketGroup)
    },
    marketGroupsByParentId: async function(req, res) {
        const iParentId = req.params.parent_id;
        const arMarketGroup = await MarketGroupProvider.getMarketGroupByParentId(iParentId);
        res.json(arMarketGroup)
    },
    marketGroupTypes: async function(req, res) {
        const id = req.params.id;
        const arTypes = await TypeProvider.getByMarketGroup(id);
        res.json(arTypes)
    }
}