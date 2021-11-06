// requiring modules:
const messageManager = require('./../messageManager.js');
const path = require('path');
const appProperties = require('./../../appProperties.js');

function setUrls(argv) {
    let urlsTxtFilePath = argv[3];
    if (urlsTxtFilePath === undefined) {
        messageManager.show('please set a url\nneed help? use get-accuweather help', 'error')
        return false;
    }
    appProperties.setProp('urlsPath', path.resolve(urlsTxtFilePath));
    messageManager.show('url txt file has been successfully set', 'success');
}
module.exports = { setUrls };


 
