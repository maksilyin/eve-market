const { importYaml } = require('../modules/importYaml');
const _ = require('lodash');
const Type = require('../models/type');
const MarketGroup = require('../models/marketGroup');
const Group = require('../models/group');
const Category = require('../models/category');
const Region = require('../models/region');
const System = require('../models/system');
const Station = require('../models/station');
const Icon = require('../models/icon');
const Structure = require('../models/structure');
const api = require('../eve.api');

module.exports = {
    importTypes: function(req, res) {
        const arTypes = importYaml('/sde/fsd/typeIDs.yaml');

        _.each(arTypes, async(oType, id) => {
            Type.findOrCreate({ _id: Number(id) }, function(err, type) {
                if (!err) {
                    type = _.merge(type, oType);
                    type.save();
                } else {
                    console.log(err);
                }
            })
        });

        res.end();
    },

    importMarketGroups: function(req, res) {
        let arMarketGroups = importYaml('/sde/fsd/marketGroups.yaml');
        arMarketGroups = _.reduce(arMarketGroups, (result, oMarketGroup, id) => {
            oMarketGroup._id = Number(id);
            result[id] = oMarketGroup
            return result;
        }, {})

        const setChildrenIds = (arItems) => {
            if (!arItems) {
                arItems = _.filter(arMarketGroups, oMarketGroup => !oMarketGroup.parentGroupID);
            }
            _.each(arItems, arItem => {
                const id = arItem._id;
                const arFiltered = _.filter(arMarketGroups, oMarketGroup => oMarketGroup.parentGroupID === id);

                if (arFiltered.length) {
                    setChildrenIds(arFiltered);
                    arMarketGroups[id].childrenGroups = _.map(arFiltered, '_id');
                }
            });
        }

        setChildrenIds();

        _.each(arMarketGroups, async(oMarketGroup, id) => {
            MarketGroup.findOrCreate({ _id: Number(id) }, function(err, marketGroup) {
                if (!err) {
                    marketGroup = _.merge(marketGroup, oMarketGroup);
                    marketGroup.save()
                } else {
                    console.log(err);
                }
            })
        });

        res.end();
    },

    importGroups: function(req, res) {
        const arGroups = importYaml('/sde/fsd/groupIDs.yaml');

        _.each(arGroups, async(oGroup, id) => {
            Group.findOrCreate({ _id: Number(id) }, function(err, group) {
                if (!err) {
                    group = _.merge(group, oGroup);
                    group.save();
                } else {
                    console.log(err);
                }
            })
        });

        res.end();
    },

    importCategory: function(req, res) {
        const arCategory = importYaml('/sde/fsd/categoryIDs.yaml');

        _.each(arCategory, async(oCategory, id) => {
            Category.findOrCreate({ _id: Number(id) }, function(err, category) {
                if (!err) {
                    category = _.merge(category, oCategory);
                    category.save();
                } else {
                    console.log(err);
                }
            })
        });

        res.end();
    },

    importRegions: async function(req, res) {
        const arRegions = await api.request('REGIONS_ALL');
        const deactivate = [
            11000007, 11000014, 11000021, 11000004, 11000012, 11000005, 11000013, 11000016, 11000028, 11000018, 12000005,
            11000023, 11000024, 11000029, 11000027, 11000025, 11000019, 11000002, 11000032, 12000002, 14000004, 11000003,
            11000011, 11000026, 11000001, 11000010, 11000017, 11000022, 14000005, 11000008, 14000001, 11000009, 11000020,
            11000030, 11000015, 12000004, 11000031, 12000003, 12000001, 14000002, 11000033, 11000006,
        ];

        _.each(arRegions.data, async iRegionId => {
            const params = {
                region_id: iRegionId
            };

            const oRegion = await api.request('REGION', params);

            if (oRegion.data) {
                Region.findOrCreate({ _id: Number(iRegionId) }, function(err, region) {
                    if (!err) {
                        if (_.includes(deactivate, region._id)) {
                            region.active = false;
                        }
                        region = _.merge(region, oRegion.data);
                        region.save();
                    } else {
                        console.log(err);
                    }
                });
            }
        });

        res.end();
    },

    importSystems: async function(req, res) {
        const arSystems = await api.request('SYSTEMS_ALL');
        console.log(arSystems.data.length);
        _.each(arSystems.data, async iSystemId => {
            const params = {
                system_id: iSystemId
            };

            const oSystem = await api.request('SYSTEM', params);
            if (oSystem.data) {
                System.findOrCreate({ _id: Number(iSystemId) }, function(err, system) {
                    if (!err) {
                        system = _.merge(system, oSystem.data);
                        system.save();
                    } else {
                        console.log(err);
                    }
                });
            }
        });

        console.log('end');

        res.end();
    },

    importStations: async function(req, res) {
        const arHub = [60005686, 60004588, 60008494, 60003760, 60011866];
        const arSystems = await System.find({
                stations: { $exists: true, $not: { $size: 0 } }
            })
            .select('stations')
            .exec()

        const arStationIds = _.uniq(_.reduce(arSystems, (result, oSystem) => {
            return result = _.concat(result, oSystem.stations);
        }, []));

        _.each(arStationIds, async iStationId => {
            const params = {
                station_id: iStationId
            };

            const oStation = await api.request('STATION', params);
            if (oStation.data) {
                Station.findOrCreate({ _id: Number(iStationId) }, function(err, station) {
                    if (!err) {
                        station = _.merge(station, oStation.data);
                        if (_.includes(arHub, station._id)) {
                            station.is_hub = true;
                        }
                        station.save();
                    } else {
                        console.log(err);
                    }
                });
            }
        });

        res.end();
    },

    importStructures: async function(req, res) {
        const arStructures = await api.request('STRUCTURES');

        _.each(arStructures.data, async iStructureId => {
            const params = {
                structure_id: iStructureId
            };

            const headers = {
             //   authorization: 'Bearer '
            }

            const oStructure = await api.request('STRUCTURE', params, {}, headers);
            if (oStructure.data) {
                Structure.findOrCreate({ _id: Number(iStructureId) }, function(err, structure) {
                    if (!err) {
                        structure = _.merge(structure, oStructure.data);
                        structure.save();
                    } else {
                        console.log(err);
                    }
                });
            }
        });

        res.end();
    },

    importIcons: function(req, res) {
        const arIcons = importYaml('/sde/fsd/iconIDs.yaml');

        _.each(arIcons, async(oIcon, id) => {
            Icon.findOrCreate({ _id: Number(id) }, function(err, icon) {
                if (!err) {
                    const p = _.split(oIcon.iconFile, '/');
                    oIcon.iconFile = _.last(p);
                    icon = _.merge(icon, oIcon);
                    icon.save();
                } else {
                    console.log(err);
                }
            })
        });

        res.end();
    },

    setMainParentMarketGroupIdToType: function(req, res) {
        Type.find({ 'marketGroupID': { $exists: true } }, (err, arTypes) => {
            _.each(arTypes, async(oType) => {
                let iMarketGroupId = oType.marketGroupID;
                let oMarketGroup = null;
                while (iMarketGroupId) {
                    oMarketGroup = await MarketGroup.findOne({ _id: iMarketGroupId }).select(['_id', 'nameID', 'iconID', 'parentGroupID']).populate('iconID');
                    iMarketGroupId = oMarketGroup.parentGroupID;
                }
                if (oMarketGroup) {
                    oType.mainParentGroup = {
                        _id: oMarketGroup._id,
                        nameID: oMarketGroup.nameID,
                    }
                    if (!_.isUndefined(oMarketGroup.iconID)) {
                        oType.mainParentGroup.iconID = {
                            _id: _.get(oMarketGroup, ['iconID', '_id']),
                            iconFile: _.get(oMarketGroup, ['iconID', 'iconFile']),
                        }
                    }
                    oType.save();
                }
            })
        });
        res.end();
    },

    setTypesBp: async function(req, res) {
        const arBp = importYaml('/sde/fsd/blueprints.yaml');
        _.each(arBp, async (oBp, iBpId) => {
            Type.findById(iBpId, (err, oType) => {
                if (!err) {
                    if (!_.isUndefined(oType.marketGroupID)) {
                        oType.blueprint = true;
                    }
                    oType.bpc = true;
                    oType.save();
                }
            });
        });
        res.json(true);
    }
};