import React, {useContext} from 'react';
import { useTranslation } from 'react-i18next';
import MarketContext from "../contexts/marketContext";
import RegionList from './UI/RegionsList';
import Checkbox from "./UI/Checkbox";

function OrdersFilter() {
    const {oFilter, setFilterParam} = useContext(MarketContext);
    const { t } = useTranslation();

    return (
        <div className='filter-row'>
            <RegionList />
            <Checkbox
                label={ t('Only hubs') }
                onChange={(event) => setFilterParam('onlyHubs', event.target.checked)}
                checked={oFilter.onlyHubs}
            />
        </div>
    )
}

export default OrdersFilter;