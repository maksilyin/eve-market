import React, { useState, useContext } from 'react';
import ConfigContext from "../../contexts/configContext";
import ListTypes from './ListTypes';
import useApi from '../../hooks/useApi';
import _ from 'lodash';
import Icon from "./Icon";

function ListGroupTree(props) {
    const {lang} = useContext(ConfigContext);
    const items = _.orderBy(props.items, item => item.nameID[lang], 'asc');

    return ( 
        <ul className = "group-list" > 
            {_.map(items, item => {
                return <ListItem item = { item } key = { item._id } />
            })} 
        </ul>
    )

    function ListItem({ item }) {
        const [arTypes, setTypes] = useState(item.types ? item.types : []);
        const [isOpen, setIsOpen] = useState(item.isOpen);
        const [api] = useApi();
    
        let childrenList = [];
        let typesList = [];
    
        const getTypes = async(oMarketGroup) => {
            if (oMarketGroup.hasTypes && !arTypes.length) {
                const data = await api('MARKET_GROUP_TYPES', {
                    id: oMarketGroup._id
                });

                item.types = data;
                setTypes(data);
            }
        }

        const toggle = () => {
            item.isOpen = !isOpen;
            setIsOpen(!isOpen);
        }
    
        if (!_.isNil(item.childrenGroups) && isOpen) {
            childrenList = <ListGroupTree
                items = { item.childrenGroups }
                typeClickHandler={ props.typeClickHandler }
                selected = { props.selected }
            />
        }
    
        if (arTypes.length && isOpen) {
            typesList = <ListTypes
                items = { arTypes }
                onClickHandler = { props.typeClickHandler }
                selected = { props.selected }
            />
        }
    
        return ( 
            <li className = 'group-list__item'>
                <div 
                    className = {'group-list__title arrow-dropdown' + (isOpen ? ' open' : '')}
                    onClick = {async() => {
                        await getTypes(item);
                        toggle();
                    }} 
                >
                    {!_.isUndefined(_.get(item, 'iconID')) &&
                        <Icon icon={ _.get(item, 'iconID') }/>
                    }
                    { _.get(item, ['nameID', lang]) }
                </div>
    
                <div className = 'group-list__dropdown' > 
                    { childrenList } 
                    { typesList } 
                </div> 
            </li>
        );
    }
}

export default ListGroupTree;