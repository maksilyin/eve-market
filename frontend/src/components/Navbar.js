import React, {useEffect, useRef, useContext, useState} from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import TaxOptions from "./UI/TaxOptions";
import Modal from "./UI/Modal";
import Menu from  './UI/Menu'
import Sidebar from "./Sidebar";

function Navbar() {
    const { t } = useTranslation();

    return (
        <nav>
            <div className="nav-wrapper">
                <a data-target="slide-out" className='mobile-sidebar-trigger sidenav-trigger'>
                    <i className="material-icons">menu</i>
                </a>
                <Link to="/" className="brand-logo">EVE Market</Link>
                <div className="right menu">
                    <Menu id="desktop" className="hide-on-med-and-down"/>
                    <a data-target="nav-mobile" className='right sidenav-trigger mobile-menu-trigger'>
                        <i className="material-icons">more_vert</i>
                    </a>
                </div>
            </div>
            <Sidebar id="nav-mobile" className="mobile-menu" options={ {edge: 'right'} }>
                <Menu id="mobile"/>
            </Sidebar>
            <Modal
                id='config-modal'
                head={t('Settings')}
            >
                <TaxOptions className='config-tax'/>
            </Modal>
        </nav>
    );
}

export default Navbar;