const chalk = require("chalk");
const boxen = require("boxen");

const boxenOptions = {
    padding: 1,
    margin: 1,
    borderStyle: "double",
    borderColor: "#343434",
    backgroundColor: "#343434",
};

function buildIntroText() {
    let chalkElements = {
        black: chalk.black.bgBlack("                                                                                           "),
        yellow: chalk.black.bgYellow("                                                                                           "),
        title: chalk.magenta.bgYellow.bold("                               made with ♥ for sperloos Inc.                               "),
        authorTitle: chalk.black.bgGreen(' author:        '),
        authorName: chalk.white('https://github.com/kia-nasirzadeh/get-accuweather'),
        versionTitle: chalk.black.bgGreen(' version:       '),
        version: chalk.white('1.0.4 - beta'),
        instructionTitle: chalk.white.bgBlack("                                        INSTRUCTION                                        "),
        codekiaSperloos: chalk.white.inverse(' get-accuweather                                     '),
        codekiaSperloosv: chalk.white.inverse(' get-accuweather -v                                  '),
        codekiaSperloosHelp: chalk.white.inverse(' get-accuweather help                                '),
        codekiaSperloosSetUrls: chalk.white.inverse(' get-accuweather set PATH-OF-URLs-FILE               '),
        codekiaSperloosGetDaysShell: chalk.white.inverse(' get-accuweather get days shell                      '),
        codekiaSperloosGetMonthShell: chalk.white.inverse(' get-accuweather get months shell                    '),
        codekiaSperloosGetDaysJson: chalk.white.inverse(' get-accuweather get days json PATH-OF-RESULTS-DIR   '),
        codekiaSperloosGetShellJson: chalk.white.inverse(' get-accuweather get months json PATH-OF-RESULTS-DIR ')
    }
    
    let instruction = chalk.white(`
    ${chalkElements.codekiaSperloosv}: get introduction message and version
    ${chalkElements.codekiaSperloosHelp}: get a detailed documentation
    ${chalkElements.codekiaSperloosSetUrls}: set urls txt file 
    ${chalkElements.codekiaSperloosGetDaysShell}: get in shell
    ${chalkElements.codekiaSperloosGetMonthShell}: get in json
    ${chalkElements.codekiaSperloosGetDaysJson}: get in json
    ${chalkElements.codekiaSperloosGetShellJson}: get in json
    `)

    let introductionText = `
    ${chalkElements.yellow}
    ${chalkElements.title}
    ${chalkElements.yellow}
    ${chalkElements.authorTitle} ${chalkElements.authorName}
    ${chalkElements.versionTitle} ${chalkElements.version}
    
    ${chalkElements.black}
    ${chalkElements.instructionTitle}
    ${chalkElements.black} ${instruction}
    `;
    return introductionText;
}

function show() {
    const msgBox = boxen(`${buildIntroText()}`, boxenOptions);
    console.log(msgBox);
}
module.exports = { show }