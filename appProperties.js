const appJson = require('jsonfile')
const appJsonPath = __dirname.replaceAll(/\\/g, '/') + '/app.json';


 


function setProp (property, value) {
    let oldJson = appJson.readFileSync(appJsonPath);
    oldJson[property] = value;
    let newJson = oldJson;
    console.log('Loading... writing local Database');
    appJson.writeFileSync(appJsonPath, newJson, { spaces: 2, EOL: '\r\n' })
    console.log('Done');
}

function getProp (property) {
    console.log('Loading... reading local Database');
    return appJson.readFileSync(appJsonPath)[property];
}

module.exports = {
    getProp,
    setProp
}