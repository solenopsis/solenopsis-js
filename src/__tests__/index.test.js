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
        expect.assertions(2);

        return solenopsis.login('dev').then(function () {
            return new Promise(function (resolve) {
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
});