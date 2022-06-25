import React, { useState, useEffect, useContext } from 'react'
import ListGroupTree from './UI/ListGroupTree';
import Search from './UI/Search';
import MarketContext from '../contexts/marketContext';
import ConfigContext from '../contexts/configContext';
import useApi from "../hooks/useApi";
import _ from 'lodash';

function MarketGroupList() {
    let isSearch = false;
    const [arMarketGroups, setMarketGroups] = useState([]);
    const {getOrders} = useContext(MarketContext);
    const {lang} = useContext(ConfigContext);
    const [api] = useApi();

    const loadMarketGroups = () => {
        const storageMarkedGroups = localStorage.getItem('markedGroups');
        if (storageMarkedGroups) {
            setMarketGroups(JSON.parse(storageMarkedGroups));
        }
        else {
            api('MARKET_GROUPS')
                .then(data => {
                    localStorage.setItem('markedGroups', JSON.stringify(data));
                    setMarketGroups(data);
                })
                .catch(err => {
                    console.log(err)
                });
        }
    }

    useEffect(() => {
        return loadMarketGroups();
    }, []);

    const searchRequest = (search) => {
        isSearch = true;
        const queryParams = {
            lang: lang,
            name: search
        }

        api('TYPES_SEARCH', {}, queryParams).then(response => {
            const marketGroups = _
            .chain(response)
            .cloneDeep()
            .uniqBy('mainParentGroup._id')
            .map(item => _.get(item, 'mainParentGroup'))
            .each(oMarketGroup => {
                oMarketGroup.types = _.filter(response, oType => _.get(oType, ['mainParentGroup', '_id']) === _.get(oMarketGroup, '_id'));
            })
            .value()
            setMarketGroups(marketGroups);
        });
    };

    const onInputSearchHandler = (event) => {
        const search = event.target.value;
        if (!search.length) {
            return loadMarketGroups();
        }
        if (search.length < 3) {
            return;
        }

        searchRequest(search);
    }

    return (
        <>
            <Search onInput = { onInputSearchHandler }/>
            <div className = 'group-list-wrapper'>
                <ListGroupTree items = { arMarketGroups } typeClickHandler={ getOrders }/>
            </div>
        </>
    )
}

export default MarketGroupList;