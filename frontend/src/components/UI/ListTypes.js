import React, { useContext } from "react";
import ConfigContext from "../../contexts/configContext";

function ListTypes({ items, onClickHandler }) {
    const {lang} = useContext(ConfigContext);

    const imgPath = (id, additional = 'icon') => {
        return `https://images.evetech.net/types/${id}/${additional}?size=32`;
    }

    const list = items.map(oType => {
        return ( 
        <li className = 'group-list__item' key = { oType._id } >
            <div className = 'group-list__title' onClick={ () => { onClickHandler(oType) } } >
                <img src= { imgPath(oType._id) } alt=""/>
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