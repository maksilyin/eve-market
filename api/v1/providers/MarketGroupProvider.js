const MarketGroup = require('../models/marketGroup');

module.exports = {
    getMarketGroups: function() {
        return MarketGroup.find({ published: true })
            .where('parentGroupID')
            .exists(false)
            .exec()
    },
    getMarketGroupByParentId: function(iParentId) {
        return MarketGroup.find({ published: true, parentGroupID: iParentId }).exec()
    }
}