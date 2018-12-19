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
// Create a user who will create a parcel
var token = void 0;

before('Create a user who will create a parcel', function (done) {
  var user = {
    firstname: 'Yves',
    lastname: 'iraguha',
    phone: '25071231231231',
    email: 'iraguhaivos@gmail.com',
    password: 'ahfahdafd',
    userType: 'User'
  };
  _chai2.default.request(_app2.default).post('/api/v1/users/signup').send(user).end(function (error, res) {
    if (error) done(error);
    token = res.body.token;
    done();
  });
});

describe('It should test parcel creation', function () {
  beforeEach('Clear data from database', function (done) {
    _chai2.default.request(_app2.default).delete('/api/v1/parcels').end(function (error, res) {
      if (error) done(error);
      done();
    });
  });
  describe('Successful order creation', function () {
    it('It should acknowledge that parcel was created with created object', function (done) {
      var parcel = {
        name: 'Tshirts',
        origin: 'Kabarore',
        destination: 'Muramba',
        weight: 3
      };
      _chai2.default.request(_app2.default).post('/api/v1/parcels').send(parcel).set({ token: token }).end(function (error, res) {
        if (error) done(error);
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('The order was successfully created');
        res.body.should.have.property('response');
        res.body.response.should.have.property('name').eql('Tshirts');
        res.body.response.should.have.property('origin').eql('Kabarore');
        res.body.response.should.have.property('destination').eql('Muramba');
        res.body.response.should.have.property('price').eql('300');
        done();
      });
    });
  });

  describe('invalid input', function () {
    it('It should display an invalid weight error', function (done) {
      var parcel = {
        name: 'Tshirts',
        origin: 'Matambi',
        destination: 'Muramba',
        weight: 'aaaa'
      };
      _chai2.default.request(_app2.default).post('/api/v1/parcels').send(parcel).set({ token: token }).end(function (error, res) {
        if (error) done(error);
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        done();
      });
    });

    it('It should display an invalid name error', function (done) {
      var parcel = {
        name: '12',
        origin: 'Matambi',
        destination: 'Muramba',
        weight: 11223
      };
      _chai2.default.request(_app2.default).post('/api/v1/parcels').send(parcel).set({ token: token }).end(function (error, res) {
        if (error) done(error);
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        done();
      });
    });

    it('It should display an invalid origin error', function (done) {
      var parcel = {
        name: 'Tshirts',
        origin: '12',
        destination: 'Muramba',
        weight: 3
      };
      _chai2.default.request(_app2.default).post('/api/v1/parcels').send(parcel).set({ token: token }).end(function (error, res) {
        if (error) done(error);
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        done();
      });
    });

    it('It should display an invalid destination error', function (done) {
      var parcel = {
        name: 'Tshirts',
        origin: 'Kabarore',
        destination: '12',
        weight: 3
      };
      _chai2.default.request(_app2.default).post('/api/v1/parcels').send(parcel).set({ token: token }).end(function (error, res) {
        if (error) done(error);
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        done();
      });
    });
  });

  describe('Absence of a field', function () {
    it('It should display a missing name error', function (done) {
      var parcel = {
        origin: 'Matambi',
        destination: 'Muramba',
        weight: 1
      };
      _chai2.default.request(_app2.default).post('/api/v1/parcels').send(parcel).set({ token: token }).end(function (error, res) {
        if (error) done(error);
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        done();
      });
    });
    it('It should display missing origin error', function (done) {
      var parcel = {
        name: 'T-shirts',
        destination: 'Muramba',
        weight: 1
      };
      _chai2.default.request(_app2.default).post('/api/v1/parcels').send(parcel).set({ token: token }).end(function (error, res) {
        if (error) done(error);
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        done();
      });
    });
    it('It should display missing destination error', function (done) {
      var parcel = {
        name: 'T-shirts',
        origin: 'Matambi',
        weight: 3
      };
      _chai2.default.request(_app2.default).post('/api/v1/parcels').send(parcel).set({ token: token }).end(function (error, res) {
        if (error) done(error);
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        done();
      });
    });
  });
});