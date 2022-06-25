import React, {useMemo, useState, useEffect, useCallback, useContext} from 'react';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import M from 'materialize-css';
import ConfigContext from "../../contexts/configContext";
import useApi from '../../hooks/useApi';
import StationName from './StationName';
import Price from './Price';

function ProfitOrderInfo({selectedOrder, arOrders}) {
    const [api] = useApi();
    const {brokerCommission, salesTax} = useContext(ConfigContext);
    const { t } = useTranslation();
    const volume = _.get(selectedOrder, 'volume_total');
    const [iJumps, setJumps] = useState();
    const [selectedProfitOrder, setSelectedProfitOrder] = useState();

    const hasProfit = useCallback((price, oOrder) => {
        const tax = Number(salesTax) + (!_.get(oOrder, 'is_by_order') ? Number(brokerCommission) : 0);
        oOrder.taxPrice = _.get(oOrder, 'price') - tax / 100 * _.get(oOrder, 'price') - price;
        
        return oOrder.taxPrice > 0;
    }, [brokerCommission, salesTax]);

    const arFirstSystemOrders = (arOrders) => {
        return _
            .chain(arOrders)
            .orderBy('price', 'asc')
            .reduce((result, oOrder) => {
                const iSystemId = _.get(oOrder, 'system_id');

                if (!_.findKey(result, {'system_id': iSystemId})) {
                    result = _.concat(...result, oOrder);
                }
                return result
            },[])
            .value();
    }

    const profitOrders = useMemo(() => {
        const price = _.get(selectedOrder, 'price');
        const firstOrders = [
            ...arFirstSystemOrders(_.get(arOrders, 'sell')),
            ...arFirstSystemOrders(_.get(arOrders, 'buy'))
        ];

        return _
            .chain(firstOrders)
            .filter(oOrder => hasProfit(price, oOrder))
            .orderBy('price', 'desc')
            .value();

    }, [selectedOrder, arOrders, hasProfit]);

    useEffect(() => {
        setSelectedProfitOrder(_.head(profitOrders))
    }, [profitOrders]);

    useEffect(() => {
        if (!_.isEmpty(selectedProfitOrder)) {
            const from = _.get(selectedOrder, 'system_id');
            const to = _.get(selectedProfitOrder, 'system_id');

            if (!_.isEqual(from, to)) {
                api('JUMPS', {}, {from, to}).then(data => {
                    setJumps(data);
                })
            }
        } else { setJumps(null) }
    }, [selectedProfitOrder, selectedOrder]);

    useEffect(() => {
        const elems = document.querySelectorAll('.order-profit__trigger');

        M.Dropdown.init(elems, {
            alignment: 'left',
            closeOnClick: false,
            coverTrigger: false,
            constrainWidth: false,
        });
    }, [profitOrders])

    if (!_.isEmpty(profitOrders)) {
        return (
            <div className='order-profit'>
                <div className='order-profit__current'>
                    <div>
                        <StationName oOrder={ selectedProfitOrder } />&nbsp;
                        ({ t('Distance') }:&nbsp;
                        <span
                            className="order-profit__jumps"
                            style={{color: '#24D7F9'}}
                        >
                            { iJumps }
                        </span>)
                    </div>
                    <div>
                        { t('Profit') }: <Price className='order__price' price = {_.get(selectedProfitOrder, 'taxPrice') * volume} />
                        &nbsp;(<Price price = {_.get(selectedProfitOrder, 'taxPrice')}/> isk/шт.)
                        &nbsp;<span style={{color: _.get(selectedProfitOrder, 'is_buy_order') ? '#02CB03' : 'red'}}>
                            {_.get(selectedProfitOrder, 'is_buy_order') ? 'Buy' : 'Sell'}
                        </span>
                    </div>
                    <div>{ t('Price') }: <Price price = {_.get(selectedProfitOrder, 'price')}/> </div>
                </div>
                <div className='order-profit__trigger' data-target='order-profit-dropdown'>
                    <i className='material-icons'>expand_more</i>
                </div>
                <div id="order-profit-dropdown" className='dropdown-content order-profit__dropdown'>
                    {_.map(profitOrders, oOrder => {
                        return (
                            <div key={_.get(oOrder, 'order_id')} onClick={ ()=>{setSelectedProfitOrder(oOrder)} }>
                                <StationName oOrder={oOrder} />
                                <div>
                                    { t('Profit') }: <Price className='order__price' price = { _.get(oOrder, 'taxPrice') * volume }/>
                                    &nbsp;<span style={{color: _.get(oOrder, 'is_buy_order') ? '#02CB03' : 'red'}}>
                                        {_.get(selectedProfitOrder, 'is_buy_order') ? 'Buy' : 'Sell'}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default ProfitOrderInfo;