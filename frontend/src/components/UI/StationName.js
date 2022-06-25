import React from 'react';
import _ from 'lodash';

function StationName({oOrder}) {
    const security = _.round(_.get(oOrder, ['system', 'security_status']), 1).toFixed(1);
    
    return (
        <>
            <span className={'order__security_' + (Number(security) > 0 ? security.replace('.', '-') : 'nullsec')}>
                {security}
            </span>&nbsp;
            <span> 
                {_.get(oOrder, ['station', 'name'])}
            </span>
        </>
    )
}

export default StationName;