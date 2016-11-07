var sinon = require('sinon'),
    chai = require('chai'),
    expect = chai.expect,
    should = chai.should(),
    userController = require("../../controllers/userController"),
    User = require('../../models').User;

describe('UserController Test', function () {
    var user;
    before(function () {
        user = new User();
    });
    
    describe("Register users", function(){
        // TEST will pass if we call the method once
        it("should call register user once", function(done){
            var req,res,spy;
            req = res = {};
            spy = res.send = sinon.spy();
            userController.register(req, res);
            expect(spy.calledOnce).to.equal(true);
            done();
        });

        // Test will pass if we fail to get a user
        it("should return error", function(done){
            
            done();
        });
    });
});
