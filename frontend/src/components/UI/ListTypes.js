import React, { useContext } from "react";
import ConfigContext from "../../contexts/configContext";
import ImgType from "./ImgType";

function ListTypes({ items, onClickHandler, selected }) {
    const {lang} = useContext(ConfigContext);

    const isSelected = (iTypeId) => {
        return iTypeId === selected;
    }

    const list = items.map(oType => {
        return ( 
        <li
            className = 'group-list__item'
            key = { oType._id }
        >
            <div className = {'group-list__title' + (isSelected(oType._id) ? ' selected' : '')} onClick={ () => { onClickHandler(oType) } } >
                <ImgType oType = { oType } />
                { oType.name[lang] } 
            </div> 
        </li>
        )
    })

    return ( 
        <ul className = "group-list--types" > 
            { list }
        </ul>
    );
}

export default ListTypes;