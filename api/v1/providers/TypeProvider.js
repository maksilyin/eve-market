const Type = require('../models/type');
const _ = require('lodash');

module.exports = {
    getById: function(id) {
        return Type.findById(id);
    },

    getByMarketGroup: function(marketGroupId) {
        return Type.find({ marketGroupID: marketGroupId }).exec();
    },

    search: function(query) {
        const lang = query.lang ? query.lang : 'ru';
        const search = new RegExp([".*", query.name].join(""), "i");
        return Type.find()
            .where('name.' + lang)
            .regex(search)
            .exists('marketGroupID', true)
            .exec();
    }
}