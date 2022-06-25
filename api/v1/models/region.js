const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const regionSchema = mongoose.Schema({
    _id: Number,
    description: String,
    name: String,
    constellations: Array,
    active: {
        type: Boolean,
        default: true,
    }
});

regionSchema.plugin(findOrCreate);

module.exports = mongoose.model('Region', regionSchema);