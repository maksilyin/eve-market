const defaultConfig = {
    lang: 'ru',
    brokerCommission: 5,
    salesTax: 5,
}

const config = localStorage.getItem('config')
    ? JSON.parse(localStorage.getItem('config'))
    : defaultConfig;

export default {...config};