import React, {useEffect, useRef} from "react";
import M from 'materialize-css';

function Modal({id, head, params, children}) {
    const modal = useRef();

    useEffect(() => {
        M.Modal.init(modal.current, {
            dismissible: false,
            ...params
        })
    }, []);

    return (
        <div ref={modal} id={id} className='modal'>
            <div className='modal-header'>
                {head &&
                    <span className='modal-header__title'>{head}</span>
                }
                <a className='modal-close'>
                    <i className="tiny material-icons">close</i>
                </a>
            </div>
            <div className="modal-content">
                {children}
            </div>
        </div>
    );
}

export default Modal;