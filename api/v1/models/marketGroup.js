const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const marketGroupSchema = mongoose.Schema({
    _id: Number,
    nameID: {
        de: String,
        en: String,
        fr: String,
        ja: String,
        ru: String,
        zh: String,
    },
    descriptionID: {
        de: String,
        en: String,
        fr: String,
        ja: String,
        ru: String,
        zh: String,
    },
    iconID: {
        type: Number,
        ref: 'Icon',
    },
    hasTypes: Boolean,
    parentGroupID: Number,
    childrenGroups: {
        type: Array,
        ref: 'MarketGroup',
    }
});

marketGroupSchema.pre('find', function(next) {
    this.populate("childrenGroups");
    this.populate("iconID");
    next();
});

marketGroupSchema.pre('findOne', function(next) {
    this.populate("iconID");
    next();
});

marketGroupSchema.plugin(findOrCreate);

module.exports = mongoose.model('MarketGroup', marketGroupSchema);