const solenopsis = require('..');
const jsforce = require('jsforce');

jest.mock('fs');
jest.mock('jsforce');

const MOCK_FILE_INFO = {
    'dev': `username=bob@example.com
password=test123
token=abcdefg
url=https://test.salesforce.com`
};

describe('login', function () {
    beforeEach(function () {
        require('fs').__setMockFiles(MOCK_FILE_INFO); // eslint-disable-line global-require
    });

    test('Valid environment', function () {
        expect.assertions(3);

        return solenopsis.login('dev').then(function () {
            return new Promise(function (resolve) {
                expect(jsforce.Connection).toHaveBeenCalledWith({
                    loginUrl: 'https://test.salesforce.com'
                });
                expect(jsforce.__loginMock).toHaveBeenCalled();
                expect(jsforce.__loginMock).toHaveBeenCalledWith('bob@example.com', 'test123abcdefg', expect.anything());
                resolve();
            });
        });
    });

    test('Valid environment with client name', function () {
        expect.assertions(3);

        const opts = {
            client_name: 'test_client'
        };

        return solenopsis.login('dev', opts).then(function () {
            return new Promise(function (resolve) {
                expect(jsforce.Connection).toHaveBeenCalledWith({
                    loginUrl: 'https://test.salesforce.com',
                    callOptions: {
                        client: 'test_client'
                    }
                });
                expect(jsforce.__loginMock).toHaveBeenCalled();
                expect(jsforce.__loginMock).toHaveBeenCalledWith('bob@example.com', 'test123abcdefg', expect.anything());
                resolve();
            });
        });
    });

    test('Valid environment with client name and version', function () {
        expect.assertions(3);

        const opts = {
            client_name: 'test_client',
            client_version: '1.0.0'
        };

        return solenopsis.login('dev', opts).then(function () {
            return new Promise(function (resolve) {
                expect(jsforce.Connection).toHaveBeenCalledWith({
                    loginUrl: 'https://test.salesforce.com',
                    callOptions: {
                        client: 'test_client/1.0.0'
                    }
                });
                expect(jsforce.__loginMock).toHaveBeenCalled();
                expect(jsforce.__loginMock).toHaveBeenCalledWith('bob@example.com', 'test123abcdefg', expect.anything());
                resolve();
            });
        });
    });

    test('Invalid environment', function () {
        expect.assertions(1);
        return expect(solenopsis.login('unknown')).rejects.toThrow();
    });

    test('Bad login', function () {
        jsforce.__loginMock = jest.fn(function (user, pass, cb) {
            cb(new Error('Whoops'));
        });

        expect.assertions(1);
        return expect(solenopsis.login('dev')).rejects.toThrow();
    });
});