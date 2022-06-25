import React, {useContext} from "react";
import { useTranslation } from 'react-i18next';
import ConfigContext from "../../contexts/configContext";
import Input from "./Input";

function TaxOptions({className}) {
    const {brokerCommission, salesTax, saveConfig} = useContext(ConfigContext);
    const { t } = useTranslation();

    const changeConfig = (event, option) => {
        saveConfig(option, event.target.value);
    }

    return (
        <div className={className}>
            <Input
                label={ t('Broker commission') + ' (%)' }
                type='number'
                value={brokerCommission}
                onChange={(event) => changeConfig(event, 'brokerCommission')}
            />
            <Input
                label={ t('Sales tax') + ' (%)' }
                type='number'
                value={salesTax}
                onChange={(event) => changeConfig(event, 'salesTax')}
            />
        </div>
    );
}

export default TaxOptions;