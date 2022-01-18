const path = require('path');
const fs = jest.createMockFromModule('fs');

let mockFiles = Object.create(null);

/**
 * Gets the filename for the environment
 * @param {String} environment The environment name
 * @returns {String} The path for the properties file
 */
function __getFilename(environment) {
    return path.join(process.env.HOME, `.solenopsis/credentials/${environment}.properties`);
}

/**
 * Sets the mock files to use
 * @param {Object[]} newMockFiles The new mockfiles to use
 * @returns {undefined}
 */
function __setMockFiles(newMockFiles) {
    mockFiles = Object.create(null);

    Object.entries(newMockFiles).forEach(function (entry) {
        const [env, file] = entry;
        mockFiles[__getFilename(env)] = file;
    });
}

/**
 * Returns the mockfile or errors
 * @param {String} filename The filename
 * @param {String} enc The encoding
 * @param {Function} cb The callback
 * @returns {undefined}
 */
function readFile(filename, enc, cb) {
    if (!mockFiles[filename]) {
        cb(new Error(`ENOENT: no such file or directory, open ${filename}`));
    } else {
        cb(undefined, mockFiles[filename]);
    }
}

fs.__setMockFiles = __setMockFiles;
fs.readFile = readFile;

module.exports = fs;