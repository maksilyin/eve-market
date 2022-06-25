import React, {useRef, useEffect, useContext} from 'react';
import { Link } from "react-router-dom";
import M from "materialize-css";
import ConfigContext from "../../contexts/configContext";
import {useTranslation} from "react-i18next";

function Menu({id, className}) {
    const { t, i18n } = useTranslation();
    const langDropdownTrigger = useRef(null);
    const {lang, availableLang, saveConfig} = useContext(ConfigContext);

    const changeLang = (sLangCode) => {
        i18n.changeLanguage(sLangCode).catch(err => {
            console.log(err)
        })
        saveConfig('lang', sLangCode);
    }

    useEffect(() => {
        M.Dropdown.init(langDropdownTrigger.current, {
            coverTrigger: false,
        });
    }, [availableLang]);

    return (
        <>
            <ul id={ id } className={ className }>
                <li><Link to="/">{ t('Market') }</Link></li>
                <li><Link to="/manufacture/">{ t('Manufacture') }</Link></li>
                <li className="lang">
                    <a ref={ langDropdownTrigger } className="dropdown-trigger" data-target={"lang-dropdown" + id}>
                        {lang.toUpperCase()} <i className="material-icons right">arrow_drop_down</i>
                    </a>
                </li>
                <li className="settings">
                    <a className='modal-trigger' href='#config-modal'>
                        <i className="material-icons">settings</i>
                    </a>
                </li>
            </ul>
            <div id={'lang-dropdown' + id} className="dropdown-content lang-dropdown">
                {
                    availableLang.map(sLangCode => {
                        return (
                            <div key={sLangCode}>
                                <a onClick={() => { changeLang(sLangCode) }}>{ sLangCode.toUpperCase() }</a>
                            </div>
                        )
                    })
                }
            </div>
        </>
    );
}

export default Menu;