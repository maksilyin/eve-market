import { useEffect, useState } from 'react';
import _ from "lodash";
import settings from '../settings';

const useConfig = () => {
    const [config, setConfig] = useState(settings)

    const availableLang = [
        'ru',
        'en',
        'de',
        'fr',
        'ja',
        'zh',
    ];

    const saveConfig = (key, value) => {
        setConfig(prevConfig => {
            const newConfig = {...prevConfig, [key]: value}
            localStorage.setItem('config', JSON.stringify(newConfig));
            return newConfig;
        })
    }

    useEffect(() => {
        if (!_.includes(availableLang, config.lang)) {
            saveConfig('lang', _.head(availableLang));
        }
    }, [config]);

    return {
        ...config,
        availableLang,
        saveConfig,
    }
}

export default useConfig;