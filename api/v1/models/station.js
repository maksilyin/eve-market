const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const stationSchema = mongoose.Schema({
    _id: Number,
    owner: Number,
    name: String,
    reprocessing_efficiency: Number,
    reprocessing_stations_take: Number,
    services: Array,
    type_id: {
        type: Number,
        ref: 'Type'
    },
    system_id: {
        type: Number,
        ref: 'System'
    },
    is_hub: Boolean
});

stationSchema.plugin(findOrCreate);

module.exports = mongoose.model('Station', stationSchema);