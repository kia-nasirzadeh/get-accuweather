// requiring modules:
const chalk = require("chalk");
const boxen = require("boxen");

function returnBoxenOptions (type) {
    let messageBgColor = () => {
        if (type == 'error') return 'red'
        else if (type == 'success') return 'green'
    }
    let boxenOptions = {
        padding: 1,
        margin: 1,
        borderStyle: "double",
        borderColor: messageBgColor(),
        backgroundColor: messageBgColor(),
    };
    return boxenOptions;
}


function buildErrorText(message) {
    return chalk.white.bold(message);
}

function show(message, type) {
    const msgBox = boxen(`${buildErrorText(message)}`, returnBoxenOptions(type));
    console.log(msgBox);
}
module.exports = { show }