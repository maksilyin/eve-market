import { useState, useMemo } from 'react';
import _ from 'lodash';
import useApi from './useApi';

const storageOrders = localStorage.getItem('orders') ?
    JSON.parse(localStorage.getItem('orders')) : {};

const storageSelectedRegions = localStorage.getItem('selectedRegions') ?
    JSON.parse(localStorage.getItem('selectedRegions')) : [];

const storageSelectedType = localStorage.getItem('selectedType') ?
    JSON.parse(localStorage.getItem('selectedType')) : {}

const storageSelectedOrder = localStorage.getItem('selectedOrder') ?
    JSON.parse(localStorage.getItem('selectedOrder')) : 0

const storageFilter = localStorage.getItem('filter') ?
    JSON.parse(localStorage.getItem('filter')) : {
        onlyHubs: false,
        selectedRegions: [],
    }

const useMarket = () => {
    const [arOrders, setOrders] = useState(storageOrders);
    const [oSelectedType, setSelectedType] = useState(storageSelectedType);
    const [iSelectedOrder, setSelectedOrder] = useState(storageSelectedOrder);
    const [oFilter, setFilter] = useState(storageFilter);
    const [api, isLoading] = useApi();

    const orders = useMemo(() => {

        const arFilteredOrders = _.filter(arOrders, oOrder => {
            return _.includes(oFilter.selectedRegions, oOrder.region_id)
                && ((oFilter.onlyHubs && _.get(oOrder, ['station', 'is_hub'])) || !oFilter.onlyHubs)
        });

        const sell = _.filter(arFilteredOrders, oOrder => !_.get(oOrder, 'is_buy_order'));
        const buy = _.filter(arFilteredOrders, oOrder => _.get(oOrder, 'is_buy_order'));

        return { sell, buy };

    }, [arOrders, oFilter]);

    const oSelectedOrder = useMemo(() => {
        return _.get(arOrders, iSelectedOrder);
    }, [arOrders, iSelectedOrder])

    const getOrders = async(oType) => {
        const data = await api('ORDERS', { type_id: _.get(oType, '_id') });

        if (data) {
            const oOrders = _.keyBy(data, 'order_id');
            localStorage.setItem('orders', JSON.stringify(oOrders));
            localStorage.setItem('selectedType', JSON.stringify(oType));

            const iOrderId = _
                .chain(oOrders)
                .orderBy('price', 'asc')
                .find(oOrder => !_.get(oOrder, 'is_buy_order'))
                .get('order_id')
                .value();

            setOrders(oOrders);
            setSelectedType(oType);
            updateSelectedOrder(iOrderId);
        }
    }

    const setFilterParam = (key, value) => {
        setFilter(prevFilter => {
            const newFilter = {...prevFilter, [key]: value}
            localStorage.setItem('filter', JSON.stringify(newFilter));
            return newFilter;
        });
    }

    const updateSelectedOrder = (iOrderId) => {
        localStorage.setItem('selectedOrder', iOrderId);
        setSelectedOrder(iOrderId);
    }

    const arSelectedRegions = _.get(oFilter, 'selectedRegions');

    return {
        orders,
        arOrders,
        arSelectedRegions,
        oSelectedType,
        oSelectedOrder,
        oFilter,
        isLoading,
        getOrders,
        updateSelectedOrder,
        setFilterParam,
    }
}

export default useMarket;