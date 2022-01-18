const jsforce = jest.createMockFromModule('jsforce');

const __loginMock = jest.fn(function (user, pass, cb) {
    cb();
});

jsforce.Connection = jest.fn().mockImplementation(() => {
    return {
        login: __loginMock
    };
});

jsforce.__loginMock = __loginMock;

module.exports = jsforce;