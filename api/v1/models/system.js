const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const systemSchema = mongoose.Schema({
    _id: Number,
    stations: Array,
    stargates: Array,
    constellation_id: {
        type: Number,
        ref: 'Constellation',
    },
    name: String,
    planets: [{
        asteroid_belts: Array,
        planet_id: {
            type: Number,
            ref: 'Planet',
        }
    }],
    security_class: String,
    security_status: Number,
    star_id: {
        type: Number,
        ref: 'Star',
    }
});

systemSchema.plugin(findOrCreate);

module.exports = mongoose.model('System', systemSchema);