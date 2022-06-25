const Region = require('../models/region');

module.exports = {
    all: async function(req, res) {
        const oRegion = await Region.find({ active: true }).all();
        res.json(oRegion);
    }
};