import React, {useEffect, useRef} from "react";
import M from 'materialize-css'

function Sidebar({id, className, children, options}) {
    const sidebar = useRef(null);

    useEffect(()=>{
        M.Sidenav.init(sidebar.current, options)
    })

    return (
        <div id={ id } ref={ sidebar } className={ className + ' sidenav' }>
            {children}
        </div>
    );
}

export default Sidebar;