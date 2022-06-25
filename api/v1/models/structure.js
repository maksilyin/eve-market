const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const structureSchema = mongoose.Schema({
    _id: Number,
    owner_id: Number,
    name: String,
    solar_system_id: {
        type: Number,
        ref: 'System'
    },
    type_id: {
        type: Number,
        ref: 'Type'
    }
});

structureSchema.plugin(findOrCreate);

module.exports = mongoose.model('Structure', structureSchema);