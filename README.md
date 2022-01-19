# solenopsis-js
[![Code Climate](https://api.codeclimate.com/v1/badges/10206747ee80ab74bdd6/maintainability)](https://codeclimate.com/github/solenopsis/solenopsis-js/maintainability)
[![Coverage Status](https://api.codeclimate.com/v1/badges/10206747ee80ab74bdd6/test_coverage)](https://codeclimate.com/github/solenopsis/solenopsis-js/test_coverage)

Javascript utility methods around Solenopsis

## Configuration
You will need to have your `environment.properties` files configured based on the standard [Solenopsis configuration](https://github.com/solenopsis/Solenopsis/wiki/1.1-Configuration#credentials-configuration) pattern.

## Usage
### Getting login credentials
Parse the `environment.properties` file and return the values inside

```
const solenopsis = require('solenopsis');

solenopsis.getCredentials('production')
    .then(function (credentials) {
        console.log(credentials.username);
    })
    .catch(console.error);
```

### Logging in to an instance
A helper method is provided to automatically create a [jsforce](https://jsforce.github.io) connection based on an environment name.

```
const solenopsis = require('solenopsis');

solenopsis.login('production')
    .then(function (conn) {
        conn.query('select Id from Account limit 1', function (error, rows) {
            console.error(error);
            console.log(rows);
        })
    })
    .catch(console.error);
```

#### Setting a client name / version
You can pass in the client name with / without a version that will be made with SOAP / REST calls.  This is useful if the user is being used for multiple applications

```
const opts = {
    client_name: 'myApp'
};

solenopsis.login('production', opts)
```

```
const opts = {
    client_name: 'myApp'
    client_version: '1.0.0'
};

solenopsis.login('production', opts)
```