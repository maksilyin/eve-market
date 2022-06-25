import React from "react";

function Icon({icon}) {
    const sPath = `/img/icons/${icon.iconFile}`;

    return (
        <img src= {sPath} alt="" />
    )
}

export default Icon;