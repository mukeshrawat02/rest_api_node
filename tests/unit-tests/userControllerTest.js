process.env.NODE_ENV = 'test';

var should = require('should');

describe('User API Test', function () {
    it('Get User', function () {
        should.equal("This shouldn't fail", "This shouldn't fail");
        should.equal("This should fail", "This should fail");
    })
})
