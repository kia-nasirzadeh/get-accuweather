const os = require('os');
const chalk = require("chalk");
const boxen = require("boxen");

const boxenOptions = {
    padding: 1,
    margin: 1,
    borderStyle: "double",
    borderColor: "#343434",
    backgroundColor: "#343434",
};

module.exports = {
    report: {},
    startProperties: {},
    endProperties: {},
    getOsType () {
        return os.type();
    },
    getOsArch () {
        return os.arch();
    },
    getOsHostname () {
        return os.hostname();
    },
    getHeapUsed () {
        return process.memoryUsage().heapUsed;
    },
    getDate () {
        let seconds = new Date().getTime() / 1000;
        return seconds;
    },
    fillStartPropertiesNow () {
        this.startProperties = {
            osType: this.getOsType(),
            osArch: this.getOsArch(),
            osHostname: this.getOsHostname(),
            heapUsed: this.getHeapUsed(),
            date: this.getDate()
        }
    },
    fillEndPropertiesNow () {
        this.endProperties = {
            osType: this.getOsType(),
            osArch: this.getOsArch(),
            osHostname: this.getOsHostname(),
            heapUsed: this.getHeapUsed(),
            date: this.getDate()
        }
    },
    fillProperties () {
        this.report = {
            osType: this.getOsType(),
            osArch: this.getOsArch(),
            osHostname: this.getOsHostname(),
            duration: this.endProperties.date - this.startProperties.date,
            heapUsed_start: this.startProperties.heapUsed,
            heapUsed_end: this.endProperties.heapUsed,
            headDiff: this.endProperties.heapUsed - this.startProperties.heapUsed
        }
    },
    getReport () {
        this.fillProperties();
        return this.report;
    },
    showReport () {
        let report = this.getReport();
        let beautyReport = chalk.white(`*****************************   Report   *****************************
        os type:                            ${report.osType}
        os architecture:                    ${report.osArch}
        os name:                            ${report.osHostname}
        task duration:                      ${report.duration} seconds
        memory used prior to starting task: ${report.heapUsed_start} bytes
        memory used after task:             ${report.heapUsed_end} bytes
        program used memory:                ${report.headDiff} bytes

        made with ♥ by kia
        `);
        const msgBox = boxen(`${beautyReport}`, boxenOptions);
        console.log(msgBox);
    }
}