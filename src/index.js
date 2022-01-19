const jsforce = require('jsforce');
const config = require('./config');

/**
 * Logs into Salesforce using a Solenopsis credentials file
 * @param {String} env The environment name
 * @param {Object} opts Login options
 * @returns {Promise} A promise for the jsforce connection
 */
function login(env, opts) {
    return new Promise(function (resolve, reject) {
        config.getCredentials(env)
            .then(function (credentials) {
                let client;

                if (opts && opts.client_name && opts.client_version) {
                    client = `${opts.client_name}/${opts.client_version}`;
                } else if (opts && opts.client_name) {
                    client = opts.client_name;
                }

                const con_opts = {
                    loginUrl: credentials.url
                };

                if (client) {
                    con_opts.callOptions = {
                        client: client
                    };
                }

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