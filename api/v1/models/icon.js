const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const iconSchema = mongoose.Schema({
    _id: Number,
    description: String,
    iconFile: String,
});

iconSchema.plugin(findOrCreate);

module.exports = mongoose.model('Icon', iconSchema);