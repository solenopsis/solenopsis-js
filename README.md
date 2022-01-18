# solenopsis-js
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