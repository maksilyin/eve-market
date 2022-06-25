const api = require('../eve.api');
const Region = require('../models/region');
const Type = require('../models/type');
const System = require('../models/system');
const Station = require('../models/station');
const Structure = require('../models/structure');
const _ = require('lodash');
const { Promise } = require('mongoose');
const { concat, reject} = require('lodash');

module.exports = {
    async setNamesToOrdersData(arOrders) {
        const arTypeIds = _
            .chain(arOrders)
            .map('type_id')
            .uniq()
            .value();

        const arSystemIds = _
            .chain(arOrders)
            .map('system_id')
            .uniq()
            .value();

        const arStationIds = _
            .chain(arOrders)
            .map('location_id')
            .uniq()
            .value();

        const arStructure = _.filter(arStationIds, iStation => {
            return iStation >= 1000000000000
        })

        const oTypes = _.keyBy(
            await Type.find().where({ '_id': { $in: arTypeIds } }).select(['name', 'volume']).all(), '_id'
        );
        const oSystems = _.keyBy(
            await System.find().where({ '_id': { $in: arSystemIds } }).select(['name', 'security_class', 'security_status']).all(), '_id'
        );
        const oStations = _.keyBy(
            await Station.find().where({ '_id': { $in: arStationIds } }).select(['name', 'is_hub']).all(), '_id'
        );
        const oStructures = _.keyBy(
            await Structure.find().where({ '_id': { $in: arStructure } }).select(['name']).all(), '_id'
        );

        _.each(arOrders, oOrder => {
            oOrder.system = _.get(oSystems, _.get(oOrder, 'system_id'));
            oOrder.type = _.get(oTypes, _.get(oOrder, 'type_id'));

            if (_.get(oStructures, _.get(oOrder, 'location_id'))) {
                oOrder.station = _.get(oStructures, _.get(oOrder, 'location_id'));
            }
            else {
                oOrder.station = _.get(oStations, _.get(oOrder, 'location_id'));
            }
        });

        arOrders = _.keyBy(arOrders, 'order_id');
    },

    getOrdersByType(type_id) {
        return new Promise(async(resolve) => {
            const arRegions = await Region.find().select('_id').all();
            let data = [];

            const arRequests = _.map(arRegions, oRegion => {
                return this.requestOrders({
                    type_id,
                    region_id: _.get(oRegion, '_id'),
                    page: 1,
                    order_type: 'all'
                });
            });

            Promise.allSettled(arRequests).then(async responses => {
                data = _.concat(...data, ..._
                    .chain(responses)
                    .filter(response => response.status === 'fulfilled')
                    .map(response => response.value)
                );
                try {
                    await this.setNamesToOrdersData(data);
                } catch (err) {
                    console.error(err.message)
                } finally {
                    resolve(data);
                }
            });
        });
    },

    requestOrders({ region_id, type_id, page, order_type }) {
        return new Promise(async(resolve, reject) => {
            const dataParams = {
                type_id,
                page,
                order_type
            };
            try {
                const response = await api.request('MARKETS_ORDERS', { region_id }, dataParams);
                let data = response.data;
                const pages = Number(response.headers['x-pages']);
                const arRequests = [];

                while (pages > dataParams.page) {
                    dataParams.page++;
                    arRequests.push(api.request('MARKETS_ORDERS', { region_id }, dataParams));
                }

                Promise.all(arRequests).then(responses => {
                    data = _.concat(...data, ..._.map(responses, response => response.data));
                    data = _.map(data, dataItem => {
                        dataItem.region_id = region_id;
                        return dataItem
                    });
                    resolve(data);
                });
            } catch (err) {
                console.error(err.message)
                reject(err);
            }
        });
    },
}