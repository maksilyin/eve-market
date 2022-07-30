function ImgType ({oType, size= 32}) {
    let iconType = 'icon';
    if (oType.blueprint === true) {
        iconType = 'bp';
    }
    else if (oType.bpc === true) {
        iconType = 'bpc';
    }
    return <img src={`https://images.evetech.net/types/${oType._id}/${iconType}?size=${size}`}/>
}

export default ImgType;