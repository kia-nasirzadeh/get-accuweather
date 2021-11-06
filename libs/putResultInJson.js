const jsonfile = require('jsonfile');
const messageManager = require('./messageManager.js');

module.exports = class putInJson {
    constructor(result, outputPath) {
        this.output = result;
        this.outputPath = outputPath;
    }
    putInJson () {
        // #TODO: check os before writing, maybe we need \n instead of \r\n
        jsonfile.writeFileSync(this.outputPath, this.output, { spaces: 2, EOL: '\r\n' });
        messageManager.show('wrote in file successfully', 'success');
    }
}