const path =require('path');
const fs = require('fs');
const ini = require('ini');

/**
 * Gets credentials from the solenopsis credentials file
 * @param {String} env The environment name
 * @returns {Promise} The solenopsis credentials file
 */
function getCredentials(env) {
    return new Promise(function (resolve, reject) {
        const solenopsis_config_path = path.join(process.env.HOME, `.solenopsis/credentials/${env}.properties`);
        fs.readFile(solenopsis_config_path, 'utf-8', function (err, data) {
            if (err) {
                reject(err);
            } else {
                const sol_config = ini.parse(data);
                sol_config.name = env;
                resolve(sol_config);
            }
        });
    });
}

module.exports = {
    getCredentials: getCredentials
};