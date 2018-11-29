'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _v = require('uuid/v1');

var _v2 = _interopRequireDefault(_v);

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var should = _chai2.default.should();

_chai2.default.use(_chaiHttp2.default);
var id = void 0;

before('Create a user in a database', function (done) {
    var user = {
        name: 'Yves',
        email: 'iraguhaivos@gmail.com',
        password: 'ahfahdafd',
        userType: 'User'
    };
    _chai2.default.request(_app2.default).post('/api/v1/users/signup').send(user).end(function (error, res) {
        if (error) done(error);
        id = res.body.response.id;
        done();
    });
});

describe('It should test fetching all users', function () {
    it('It should return the list of all user', function (done) {
        _chai2.default.request(_app2.default).get('/api/v1/users').end(function (error, res) {
            if (error) done(error);
            res.should.have.status(200);
            res.body.should.have.property('response');
            done();
        });
    });
    it('It should return a particular user', function (done) {
        _chai2.default.request(_app2.default).get('/api/v1/users/' + id).end(function (error, res) {
            if (error) done(error);
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
        });
    });
});

describe('Test a user logged in successfully', function () {
    var id = void 0;
    before('Create a user in a database', function (done) {
        var user = {
            name: 'Yves',
            email: 'iraguhaivos@gmail.com',
            password: 'ahfahdafd',
            userType: 'User'
        };
        _chai2.default.request(_app2.default).post('/api/v1/users/signup').send(user).end(function (error, res) {
            if (error) done(error);
            id = res.body.response.id;
            done();
        });
    });

    it('It should test a successful log in', function (done) {
        var user = {
            email: 'iraguhaivos@gmail.com',
            password: 'ahfahdafd'
        };
        _chai2.default.request(_app2.default).post('/api/v1/users/signin').send(user).end(function (error, res) {
            if (error) done(error);
            res.should.have.status(200);
            res.body.should.have.property('message').eql('Logged in successfully');
            res.body.should.have.property('token');
            done();
        });
    });
    it('It should test a not matching password', function (done) {
        var user = {
            email: 'iraguhaivos@gmail.com',
            password: 'adafdafdafeae'
        };
        _chai2.default.request(_app2.default).post('/api/v1/users/signin').send(user).end(function (error, res) {
            if (error) done(error);
            res.should.have.status(400);
            res.body.should.have.property('message').eql('Password not matching');
            done();
        });
    });
    it('It should test a non existing record', function (done) {
        var user = {
            email: 'iruwaraivos@gmail.com',
            password: 'adafdafdafeae'
        };
        _chai2.default.request(_app2.default).post('/api/v1/users/signin').send(user).end(function (error, res) {
            if (error) done(error);
            res.should.have.status(400);
            res.body.should.have.property('message').eql('No user with that email');
            done();
        });
    });
});