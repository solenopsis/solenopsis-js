const jsforce = require('jsforce');
const config = require('./config');

/**
 * Logs into Salesforce using a Solenopsis credentials file
 * @param {String} env The environment name
 * @returns {Promise} A promise for the jsforce connection
 */
function login(env) {
    return new Promise(function (resolve, reject) {
        config.getCredentials(env)
            .then(function (credentials) {
                const con_opts = {
                    loginUrl: credentials.url
                };

                let conn = new jsforce.Connection(con_opts);
                let pass = credentials.password;

                if (credentials.token) {
                    pass += credentials.token;
                }

                conn.login(credentials.username, pass, function (error) {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(conn);
                    }
                });
            })
            .catch(reject);
    });
}

module.exports = {
    config: config,
    login: login
};