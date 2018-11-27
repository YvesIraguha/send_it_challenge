"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _v = _interopRequireDefault(require("uuid/v1"));

var _app = _interopRequireDefault(require("../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var should = _chai.default.should();

_chai.default.use(_chaiHttp.default);

beforeEach('Clear data from database', function (done) {
  _chai.default.request(_app.default).delete('/api/v1/users').end(function (error, res) {
    if (error) done(error);
    done();
  });
});
describe('It should test creating a user', function () {
  it('Created user successfully', function (done) {
    var id = (0, _v.default)();
    var user = {
      id: id,
      name: 'Yves',
      email: 'alfheaagd@gmail.com',
      password: 'afhasiujfsia'
    };

    _chai.default.request(_app.default).post('/api/v1/users/signup').send(user).end(function (error, res) {
      if (error) done(error);
      res.body.should.be.a('object');
      res.body.should.have.property('message').eql('user registered successfully');
      res.body.response.should.have.property('name').eql('Yves');
      res.body.response.should.have.property('email').eql('alfheaagd@gmail.com');
      done();
    });
  });
  describe('Should test invalid fields', function () {
    it('An invalid name error', function (done) {
      var id = (0, _v.default)();
      var user = {
        id: id,
        name: '121231231',
        email: 'afafhag@gmail.com',
        password: 'afafsafgafsdf'
      };

      _chai.default.request(_app.default).post('/api/v1/users/signup').send(user).end(function (error, res) {
        if (error) done(error);
        res.body.should.have.property('message').eql('Invalid name, the name should start with letter');
        done();
      });
    });
    it('An invalid email error', function (done) {
      var id = (0, _v.default)();
      var user = {
        id: id,
        name: 'Yves Iraguha',
        email: '1221afhafhahf@gmail.com',
        password: 'afafsafgafsdf'
      };

      _chai.default.request(_app.default).post('/api/v1/users/signup').send(user).end(function (error, res) {
        if (error) done(error);
        res.body.should.have.property('message').eql('Invalid email, the email should start with letter');
        done();
      });
    });
  });
  describe('It should test missing fields errors', function () {
    it('A missing name error', function (done) {
      var id = (0, _v.default)();
      var user = {
        id: id,
        email: 'afafafaf@gmail.com',
        password: 'afhafha'
      };

      _chai.default.request(_app.default).post('/api/v1/users/signup').send(user).end(function (error, res) {
        if (error) done(error);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Please complete the required fields');
        done();
      });
    });
    it('A missing email error', function (done) {
      var id = (0, _v.default)();
      var user = {
        id: id,
        name: 'Yves Iraguha',
        password: 'afhafha'
      };

      _chai.default.request(_app.default).post('/api/v1/users/signup').send(user).end(function (error, res) {
        if (error) done(error);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Please complete the required fields');
        done();
      });
    });
    it('A missing password error', function (done) {
      var id = (0, _v.default)();
      var user = {
        id: id,
        name: 'Yves Iraguha',
        email: 'afafafaf@gmail.com'
      };

      _chai.default.request(_app.default).post('/api/v1/users/signup').send(user).end(function (error, res) {
        if (error) done(error);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Please complete the required fields');
        done();
      });
    });
  });
});