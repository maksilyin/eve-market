const { OrderService } = require('../services');

module.exports = {
    getOrders: async function(req, res) {
        const iTypeId = req.params.type_id;
        const oOrders = await OrderService.getOrdersByType(iTypeId);

        res.json(oOrders);
    }
};