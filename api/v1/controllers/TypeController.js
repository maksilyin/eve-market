const { TypeProvider } = require('../providers/');

module.exports = {
    getById: async function(req, res) {
        const id = Number(req.params.id);
        const oType = await TypeProvider.getById(id);
        res.json(oType);
    },
    search: async function(req, res) {

        const name = req.query.name;

        if (!name) {
            res.status(400);
            return;
        }

        const oType = await TypeProvider.search(req.query);

        res.json(oType);
    }
};