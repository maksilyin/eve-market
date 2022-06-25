import axios from 'axios';
import endpoints from '../endpoints'

class Api {

    endpoints = endpoints;

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

        url = '/api' + (params.version ? params.version : '/v1') + url;

        return [method, url];
    };

    async request(endpointName, params = {}, query = null) {
        const [method, url] = this.getEndpoint(endpointName, params);
        const { data } = await axios({ method, url, params: query });

        return data;
    }
}

export default new Api()