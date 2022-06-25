const _ = require('lodash');

module.exports.treeArray = function(arr, idKey, parentIdKey) {
    const arTree = _.filter(arr, oItem => {
        return !oItem[parentIdKey];
    })

    getChildren(arTree, idKey, parentIdKey)

    return arTree;

    function getChildren(arrParent, idKey, parentIdKey) {
        _.each(arrParent, (arrItem, i) => {
            const arChildren = _.filter(arr, oItem => {
                return arrItem[idKey] === oItem[parentIdKey];
            });

            if (arChildren) {
                getChildren(arChildren, idKey, parentIdKey);
                arrParent[i].sub = arChildren;
            }
        });
    }
}