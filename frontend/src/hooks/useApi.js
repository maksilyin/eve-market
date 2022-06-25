import { useState } from 'react'
import Api from '../classes/Api'

const useApi = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const request = async(endpointName, params, query) => {
        try {
            setIsLoading(true);
            const data = await Api.request(endpointName, params, query);
            return data
        } catch (e) {
            setError(e.message)
        } finally {
            setIsLoading(false);
        }
    };

    return [request, isLoading, error];
}

export default useApi;