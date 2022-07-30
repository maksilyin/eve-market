import React, {useEffect, useRef, useContext} from 'react';
import M from 'materialize-css'
import ConfigContext from "../../contexts/configContext";
import _ from "lodash";
import ImgType from "./ImgType";

function SelectedType({oType}) {
    const {lang} = useContext(ConfigContext)
    const dropdownTrigger = useRef(null)

    useEffect(() => {
        M.Dropdown.init(dropdownTrigger.current, {
            coverTrigger: false,
            hover: true,
            constrainWidth: false,
        });
    }, []);

    return (
        <div
            ref={dropdownTrigger}
            className='selected-type dropdown-trigger'
            data-target='description-dropdown'
        >
            <ImgType oType = { oType } size={64} />
            <div className='selected-type__info'>
                <div className='selected-type__title'>
                    {oType.name[lang]}
                </div>
                <div className='selected-type__volume'>
                    {oType.volume} m<sup>3</sup>
                </div>
            </div>
            <div
                id='description-dropdown'
                className='selected-type__description dropdown-content'
                dangerouslySetInnerHTML={{__html: _.get(oType, ['description', lang])}}
            >
            </div>
        </div>
    )
}

export default SelectedType;