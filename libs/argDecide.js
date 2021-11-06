// requiring modules:
const argSet = require('./../libs/arg-set/arg-set.js');
const argGet = require('./../libs/arg-get/arg-get.js');
const argHelp = require('./../libs/arg-help/arg-help.js');
const introText = require('./introText.js');
const messageManager = require('./messageManager.js');

function decide(argv) {
    switch (argv[2]) {
        case 'help':
            argHelp.openHelpPage();
            break;
        case 'set':
            argSet.setUrls(argv);
            break;
        case 'get':
            argGet.getUrls(argv);
            break;
        case '-v':
            introText.show();
            break;
        default:
            messageManager.show('we can\'t recognize this cmdlet \nneed help? use "get-accuweather help"', 'error')
            break;
    }
}
module.exports = {
    decide
}