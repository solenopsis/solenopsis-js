const jsforce = jest.createMockFromModule('jsforce');

const __loginMock = jest.fn(function (user, pass, cb) {
    cb();
});

jsforce.__loginMock = __loginMock;
jsforce.Connection = jest.fn().mockImplementation(() => {
    return {
        login: jsforce.__loginMock
    };
});

module.exports = jsforce;