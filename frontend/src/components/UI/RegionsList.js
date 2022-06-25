import React, {useState, useEffect, useContext, useMemo} from 'react';
import { useTranslation } from 'react-i18next';
import MarketContext from '../../contexts/marketContext';
import useApi from '../../hooks/useApi';
import _ from 'lodash';
import M from 'materialize-css';
import Checkbox from "./Checkbox";

function RegionList() {
    const [api] = useApi();
    const [regions, setRegions] = useState([]);
    const {arSelectedRegions, setFilterParam} = useContext(MarketContext);
    const { t } = useTranslation();

    const selectedText = useMemo(() => {
        let sSelectedRegions = t('All regions');

        if (arSelectedRegions.length === 1) {
            sSelectedRegions = _.get(
                _.find(regions, oRegion => Number(arSelectedRegions[0]) === oRegion._id),
                '' + 'name'
            );
        }
        else if (arSelectedRegions.length > 1 && arSelectedRegions.length < regions.length) {
            sSelectedRegions = t('Selected') + ' ' + arSelectedRegions.length;
        }
        else if (_.isEmpty(arSelectedRegions)) {
            sSelectedRegions = t('None selected');
        }

        return sSelectedRegions;
    }, [regions, arSelectedRegions, t]);

    const onChangeHandler = (event) => {
        let newSelected = [];
        const regionValue = Number(event.target.value);
        if (event.target.checked) {
            newSelected = regionValue ? [regionValue, ...arSelectedRegions] : _.map(regions, '_id');
        } else {
            newSelected = regionValue ? _.filter(arSelectedRegions, item => item !== regionValue) : [];
        }
        setFilterParam('selectedRegions', newSelected);
    }

    useEffect(() => {
        api('REGIONS').then(data => {
            if (_.isEmpty(arSelectedRegions)) {
                setFilterParam('selectedRegions', _.map(data, '_id'))
            }
            setRegions(_.orderBy(data, 'name', 'asc'));
        })
    }, []);

    useEffect(() => {
        const elems = document.querySelectorAll('.region-dropdown-trigger');

        M.Dropdown.init(elems, {
            alignment: 'left',
            closeOnClick: false,
            coverTrigger: false,
            constrainWidth: false,
        });
    }, [regions]);

    return (
        <div className='regions select'>
            <div className='select__title'>{ t('Region') }:</div>
            <div className='select__trigger region-dropdown-trigger' data-target="regions-dropdown">
                <span>{ selectedText }</span>
                <i className='material-icons select__icon'>arrow_drop_down</i>
            </div>
            <div id="regions-dropdown" className="select__dropdown dropdown-content">
                 <div className='select__item select__item--checkbox'>
                     <Checkbox
                         value={0}
                         onChange={ onChangeHandler }
                         checked={ arSelectedRegions.length === regions.length }
                         label={ t('All regions') }
                     />
                </div>
                {
                    regions.map((oRegion, index) => {
                        return (
                            <div className='select__item select__item--checkbox' key={ oRegion._id }>
                                <Checkbox
                                    onChange={ onChangeHandler }
                                    checked={ _.includes(arSelectedRegions, oRegion._id) }
                                    value={ oRegion._id }
                                    label={ oRegion.name }
                                />
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}

export default RegionList;