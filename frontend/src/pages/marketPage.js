import React, {useContext, useState} from 'react';
import MarketContext from '../contexts/marketContext';
import MarketGroupList from '../components/MarketGroupList';
import OrdersTable from '../components/OrdersTable';
import MarketInfo from '../components/MarketInfo';
import useMarket from "../hooks/useMarket";
import Sidebar from "../components/Sidebar";

function MarketPage() {
    const market = useMarket();

    return (
        <MarketContext.Provider value= { {...market} }>
            <Sidebar id="slide-out" className="sidebar">
                <MarketGroupList />
            </Sidebar>
            <div className="content">
                <MarketInfo />
                <OrdersTable />
            </div>
        </MarketContext.Provider>
    )
}

export default MarketPage;