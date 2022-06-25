function Price ({price, className}) {
    return (
        <span className={className}>
            {new Intl.NumberFormat('ru').format(price)}
        </span>
    )
}

export default Price;