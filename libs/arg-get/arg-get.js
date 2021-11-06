// requiring modules:
const messageManager = require('./../messageManager.js');
const appProperties = require('./../../appProperties.js');
const Retriever = require('../Retriever.js');
const retriever = new Retriever();

function getUrls (argv) {
    let urlsPath = appProperties.getProp('urlsPath');
    if (urlsPath == false || urlsPath == undefined || urlsPath == '' || urlsPath == " ") {
        messageManager.show('please first set a txt file\nneed help? use kia-sperloos help', 'error');
        return;
    }
    if (argv[3] == 'days' && argv[4] == 'shell') {
        retriever.init((retriever) => {
            retriever.retriveDays_fromFile()
        })
    } else if (argv[3] == 'months' && argv[4] == 'shell') {
        retriever.init((retriever) => {
            retriever.retrieveMonth_fromFile()
        })
    } else if (argv[3] == 'days' && argv[4] == 'json') {
        if (argv[5] == undefined || argv[5] == '' || argv[5] == ' ') {
            messageManager.show('please set a output file\nneed help? use kia-sperloos help', 'error');
            return;
        }
        retriever.init((retriever) => {
            retriever.retriveDays_fromFile(argv[5])
        })
    } else if (argv[3] == 'months' && argv[4] == 'json') {
        if (argv[5] == undefined || argv[5] == '' || argv[5] == ' ') {
            messageManager.show('please set a output file\nneed help? use kia-sperloos help', 'error');
            return;
        }
        retriever.init((retriever) => {
            retriever.retrieveMonth_fromFile(argv[5])
        })
    }
}

module.exports = {
    getUrls
}