process.env.NODE_ENV = 'test';

var sinon = require('sinon'),
    chai = require('chai'),
    expect = chai.expect,
    should = chai.should();

describe('UserController Test', function () {
    var user;
    before(function () {
        user = new User();
    });

    describe('Signup User', function () {

        it('should be able to add user', function () {
        });
        it('should have unique user email', function () {
        });
        it('should return status 200', function () {
        });
    });
});
