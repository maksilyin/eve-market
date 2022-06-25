const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const typeSchema = mongoose.Schema({
    _id: Number,
    groupID: {
        type: Number,
        ref: 'Group'
    },
    mass: Number,
    name: {
        de: String,
        en: String,
        fr: String,
        ja: String,
        ru: String,
        zh: String,
    },
    portionSize: Number,
    published: Boolean,
    volume: Number,
    radius: Number,
    description: {
        de: String,
        en: String,
        fr: String,
        ja: String,
        ru: String,
        zh: String,
    },
    graphicID: Number,
    iconID: {
        type: Number,
        ref: 'Icon',
    },
    basePrice: Number,
    marketGroupID: {
        type: Number,
        ref: 'MarketGroup'
    },
    mainParentGroup: {},
    metaGroupID: {
        type: Number,
        ref: 'MetaGroup'
    },
    variationParentTypeID: Number,
    bpc: Boolean,
    blueprint: Boolean,
});

typeSchema.plugin(findOrCreate);

module.exports = mongoose.model('Type', typeSchema);