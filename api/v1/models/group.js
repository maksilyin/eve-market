const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const groupSchema = mongoose.Schema({
    _id: Number,
    name: {
        de: String,
        en: String,
        fr: String,
        ja: String,
        ru: String,
        zh: String,
    },
    categoryID: {
        type: Number,
        ref: 'Category'
    },
    anchorable: Boolean,
    anchored: Boolean,
    fittableNonSingleton: Boolean,
    published: Boolean,
    useBasePrice: Boolean,
});

groupSchema.plugin(findOrCreate);

module.exports = mongoose.model('Group', groupSchema);