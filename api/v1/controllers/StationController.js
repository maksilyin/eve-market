const { default: axios } = require('axios');
const api = require('../eve.api');

module.exports = {
    jumps: async function(req, res) {
        const origin = req.query.from;
        const destination = req.query.to;

        if (Number(origin) && Number(destination)) {
            const response = await api.request('ROUTE', { origin, destination });
            if (response.status === 200) {
                return res.json(response.data.length);
            }
        }

        res.status(400).json({ 'error': 'bad request' });
    }
};