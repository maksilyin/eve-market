const fs = require('fs');
const yaml = require('yaml');

module.exports.importYaml = (yamlPath) => {
    try {
        const file = fs.readFileSync(global.rootPath + '/import' + yamlPath, 'utf8');
        return yaml.parse(file);
    } catch (e) {}

    return null;
}