import React from 'react';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import StationName from './StationName';
import Price from './Price';

function SelectedOrder({oOrder}) {
    const { t } = useTranslation();
    const price = _.get(oOrder, 'price');
    const count = _.get(oOrder, 'volume_total');
    const typeTotalVolume = count * _.get(oOrder, ['type', 'volume']);
    const sum = count * _.get(oOrder, 'price');

    return (
        <div className='selected-order'>
            <div className='selected-order__station'>
                <StationName oOrder={oOrder}/>
            </div>
            <div className='selected-order__price'>
                { t('Price') }: <Price className='order__price' price = {price}/>
            </div>
            <div className='selected-order__count'>
                { t('Quantity') }: {count} ({typeTotalVolume} m<sup>3</sup>) (<Price price = {sum}/> isk)
            </div>
        </div>
    )
}

export default SelectedOrder;