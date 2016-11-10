'use strict';

var sinon = require('sinon'),
    chai = require('chai'),
    expect = chai.expect,
    should = chai.should(),
    request = require('supertest'),
    api = request('http://localhost:3000/api'),
    User = require('../../models').User;

describe('User API', function () {
    var user;
    before(function(done){
        user = new User ({
                name: "test2",
                email: "test2@abc.com",
                username: 'test2', 
                password: 'pass' 
        });
        done();
    });

    describe("/POST signup user", function() {
        it('should add user and return a 200 response', function(done){
            api.post('/signup')
               .set('Accept', 'application/x-www-form-urlencoded')
               .send(user)
               .expect('Content-Type', /json/)
               .expect(200, done);
        });
    });

    after(function(done){
        User.remove();
        done(); 
    });
});
