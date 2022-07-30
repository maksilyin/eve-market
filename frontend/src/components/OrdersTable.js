import React, {useContext, useState, useCallback, useMemo} from 'react';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import MarketContext from '../contexts/marketContext';
import OrderFilter from './OrdersFilter';
import Preloader from "./UI/Preloader";
import Table from "./UI/Table";
import ConfigContext from "../contexts/configContext";

function OrdersTable() {
    const { t } = useTranslation();
    const {orders, updateSelectedOrder, oSelectedOrder, isLoading} = useContext(MarketContext);
    const [activeTab, setActiveTab] = useState(0);
    const [sort, setSort] = useState({sell: ['price', 'asc'], buy: ['price', 'desc']});
    const {lang} = useContext(ConfigContext);
    const columns = useMemo(() => {
        return [
            {
                name: t('Region'),
                field: 'region_name',
                width: '15%',
            },
            {
                name: t('System'),
                field: ['system', 'security_status'],
                width: '15%',
                additional: [
                    {
                        field: ['system', 'name'],
                    }
                ],
                class: function (value) {
                    if (value) {
                        const className = Number(value) <= 0 ? 'nullsec' : value.replace('.', '-');
                        return 'order__security_' + className;
                    }
                },
                modifyValue: function (value) {
                    if (value) {
                        return value.toFixed(1);
                    }
                }
            },
            {
                name: t('Price'),
                field: 'price',
                class: 'order__price',
                width: '15%',
                modifyValue: function (value) {
                    return new Intl.NumberFormat('ru').format(value)
                }
            },
            {
                name: t('Quantity'),
                field: 'volume_total',
                width: '10%',
            },
            {
                name: t('Station'),
                field: ['station', 'name'],
                width: '30%',
                className: 'station',
            },
            {
                name: t('Issued'),
                field: 'issued',
                width: '15%',
                modifyValue: function (value) {
                    const date = new Date(value);
                    const options = {
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric',
                        timezone: 'UTC',
                        hour: 'numeric',
                        minute: 'numeric',
                        second: 'numeric'
                    };
                    return date.toLocaleString(lang, options);
                }
            },
        ]
    }, [t]);

    const sortColumn = (sort, setSort, key) => {
        const sortColumn = (field) => {
            const newSort = [field, 'asc'];

            setSort(prevSort => {
                if (_.isEqual(field, _.get(prevSort, [key, 0]))) {
                    if (_.get(prevSort, [key, 1]) === 'asc') {
                        newSort[1] = 'desc';
                    }
                }
                prevSort[key] = newSort
                return prevSort;
            })

            return newSort;
        }

        return [_.get(sort, key), sortColumn]
    }

    return (
       <>
            {isLoading &&
               <div className="preloader">
                   <Preloader/>
               </div>
            }
            <div className='filter'>
                <div className='tab-nav col s1'>
                    <span 
                        className={activeTab === 0 ? 'active' : ''} 
                        onClick={ ()=>{ setActiveTab(0) } }
                    >
                        Sell
                    </span>
                    <span 
                        className={activeTab === 1 ? 'active' : ''} 
                        onClick={ ()=>{ setActiveTab(1) } }
                    >
                        Buy
                    </span>
                </div>
                <OrderFilter />
            </div>
           <div className='tab-content scroll-y'>
                {activeTab === 0 &&
                    <Table
                        columns = { columns }
                        ordersData = { orders.sell }
                        sortColumn = { sortColumn(sort, setSort, 'sell') }
                        orderClickHandler = { updateSelectedOrder }
                        oSelectedOrder = { oSelectedOrder }
                    />
                }
                {activeTab === 1 &&
                    <Table
                        columns = { columns }
                        ordersData = { orders.buy }
                        sortColumn = { sortColumn(sort, setSort, 'buy') }
                        orderClickHandler = { updateSelectedOrder }
                        oSelectedOrder = { oSelectedOrder }
                    />
                }
           </div>
       </>
    );
} 

export default OrdersTable;