import React, { useContext } from 'react';
import SelectedType from './UI/SelectedType';
import SelectedOrder from './UI/SelectedOrder';
import ProfitOrderInfo from './UI/ProfitOrderInfo';
import MarketContext from '../contexts/marketContext';
import _ from 'lodash';

function MarketInfo() {

    const { oSelectedType, oSelectedOrder, orders } = useContext(MarketContext);

    if (_.every({oSelectedType, oSelectedOrder, orders})) {
        return ( 
            <div className='market-info'>
                <SelectedType oType={oSelectedType} />
                <SelectedOrder oOrder={oSelectedOrder} />
                <ProfitOrderInfo selectedOrder={oSelectedOrder} arOrders={orders}/>
            </div>
        );
    }
}

export default MarketInfo;