const endpoints = {
    REGIONS: "GET:/regions/",
    MARKET_GROUPS: "GET:/marketGroups/",
    MARKET_GROUP_BY_PARENT: "GET:/marketGroups/parent/{parent_id}/",
    MARKET_GROUP_TYPES: "GET:/marketGroups/{id}/types/",
    ORDERS: 'GET:/orders/{type_id}/',
    JUMPS: 'GET:/stations/jumps/',
    TYPES_SEARCH: 'GET:/types/search/',
}

export default endpoints;