const mongoose = require('mongoose')
const findOrCreate = require('mongoose-findorcreate');

const categorySchema = mongoose.Schema({
    _id: Number,
    name: {
        de: String,
        en: String,
        fr: String,
        ja: String,
        ru: String,
        zh: String,
    },
    published: Boolean,
});

categorySchema.plugin(findOrCreate);

module.exports = mongoose.model('Category', categorySchema);