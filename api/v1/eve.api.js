const axios = require("axios");

module.exports = {
    BASE: 'https://esi.evetech.net/latest',
    endpoints: {
        MARKETS_ORDERS: 'GET:/markets/{region_id}/orders/',
        MARKETS_TYPES: 'GET:/markets/{region_id}/types/',
        MARKETS_STRUCTURES: 'GET:/markets/structures/{structure_id}/',
        REGIONS_ALL: 'GET:/universe/regions/',
        REGION: 'GET:/universe/regions/{region_id}/',
        SYSTEMS_ALL: 'GET:/universe/systems/',
        SYSTEM: 'GET:/universe/systems/{system_id}/',
        STATION: 'GET:/universe/stations/{station_id}/',
        ROUTE: 'GET:/route/{origin}/{destination}/',
        STRUCTURE: 'GET:/universe/structures/{structure_id}/',
        STRUCTURES: 'GET:/universe/structures/',
    },
    getEndpoint(endpointName, params = {}) {
        if (!this.endpoints[endpointName]) {
            throw new Error('Endpoint not found');
        }

        let url, method;

        if (/\D+:.+/.test(this.endpoints[endpointName])) {
            const arValues = this.endpoints[endpointName].split(':');
            url = arValues[1];
            method = arValues[0];
        } else {
            url = this.endpoints[endpointName];
            method = 'GET';
        }

        const matches = url.matchAll(/{(.+?)}/g);

        if (matches) {
            Array.from(matches).forEach(match => {
                if (params[match[1]]) {
                    url = url.replace(match[0], params[match[1]]);
                } else {
                    throw new Error('Invalid params')
                }
            });
        }

        return [method, this.BASE + url];
    },

    async request(endpointName, params = {}, data = null, headers = null) {
        try {
            const [method, url] = this.getEndpoint(endpointName, params);
            //console.log(url)
            const response = await axios({ method, url, params: data, headers: headers });
            return response;
        } catch (e) {
            return false;
        }
    }
}