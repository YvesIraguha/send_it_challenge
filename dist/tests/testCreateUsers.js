'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var should = _chai2.default.should();

_chai2.default.use(_chaiHttp2.default);
describe('It should test creating a user', function () {
  it('Created user successfully', function (done) {
    var user = {
      firstname: 'Yves',
      lastname: 'iraguha',
      phone: '25071231231231',
      email: 'alfheaagd@gmail.com',
      password: 'ahfahdafd',
      userType: 'User'
    };
    _chai2.default.request(_app2.default).post('/api/v1/users/signup').send(user).end(function (error, res) {
      if (error) done(error);
      res.body.should.be.a('object');
      res.body.should.have.property('message').eql('user registered successfully');
      res.body.response.should.have.property('firstname').eql('Yves');
      res.body.response.should.have.property('email').eql('alfheaagd@gmail.com');
      done();
    });
  });
  describe('Should test invalid fields', function () {
    it('An invalid name error', function (done) {
      var user = {
        firstname: '12',
        lastname: 'iraguha',
        phone: '25071231231231',
        email: 'adhandansgd@gmail.com',
        password: 'ahfahdafd',
        userType: 'User'
      };
      _chai2.default.request(_app2.default).post('/api/v1/users/signup').send(user).end(function (error, res) {
        if (error) done(error);
        res.body.should.have.property('error');
        done();
      });
    });
    it('An invalid email error', function (done) {
      var user = {
        firstname: 'Murara',
        lastname: 'iraguha',
        phone: '25071231231231',
        email: '12',
        password: 'ahfahdafd',
        userType: 'User'
      };
      _chai2.default.request(_app2.default).post('/api/v1/users/signup').send(user).end(function (error, res) {
        if (error) done(error);
        res.body.should.have.property('error');
        done();
      });
    });
  });
  describe('It should test missing fields errors', function () {
    it('A missing name error', function (done) {
      var user = {
        phone: '25071231231231',
        email: 'afadafasfaf@gmail.com',
        password: 'afhafha',
        userType: 'User'
      };
      _chai2.default.request(_app2.default).post('/api/v1/users/signup').send(user).end(function (error, res) {
        if (error) done(error);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        done();
      });
    });
    it('A missing email error', function (done) {
      var user = {
        firstname: 'Yves ',
        lastname: 'Iraguha',
        phone: '25071231231231',
        password: 'afhafha',
        userType: 'User'
      };
      _chai2.default.request(_app2.default).post('/api/v1/users/signup').send(user).end(function (error, res) {
        if (error) done(error);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        done();
      });
    });
    it('A missing password error', function (done) {
      var user = {
        firstname: 'Yves',
        lastname: 'Irguha',
        phone: '25071231231231',
        email: 'afaflkjgffs@gmail.com',
        userType: 'User'
      };
      _chai2.default.request(_app2.default).post('/api/v1/users/signup').send(user).end(function (error, res) {
        if (error) done(error);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        done();
      });
    });
  });
});