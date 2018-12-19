'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _jwtSimple = require('jwt-simple');

var _jwtSimple2 = _interopRequireDefault(_jwtSimple);

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.use(_chaiHttp2.default);
var should = _chai2.default.should();
var token = void 0;
var adminToken = void 0;
before('Create a user who will create a parcel', function (done) {
  var user = {
    firstname: 'Yves',
    lastname: 'iraguha',
    phone: '25071231231231',
    email: 'alfhdwteyd@gmail.com',
    password: 'ahfahdafd',
    userType: 'User'
  };
  var admin = {
    firstname: 'Yves',
    lastname: 'iraguha',
    phone: '25071231231231',
    email: 'aetahswadad@gmail.com',
    password: 'ahfahdafd',
    userType: 'Admin'
  };
  _chai2.default.request(_app2.default).post('/api/v1/users/signup').send(user).end(function (error, res) {
    if (error) done(error);
    token = res.body.token;
  });
  _chai2.default.request(_app2.default).post('/api/v1/users/signup').send(admin).end(function (error, res) {
    if (error) done(error);
    adminToken = res.body.token;
    done();
  });
});

beforeEach('Create a data in memory', function (done) {
  var order = {
    name: 'Tshirts',
    origin: 'Kabarore',
    destination: 'Muramba',
    weight: 3
  };
  _chai2.default.request(_app2.default).post('/api/v1/parcels').send(order).set({ token: token }).end(function (error, res) {
    if (error) done(error);
    done();
  });
});

afterEach('Remove orders ', function (done) {
  _chai2.default.request(_app2.default).delete('/api/v1/parcels').end(function (error, res) {
    if (error) done(error);
    done();
  });
});
describe('It should test fetching parcels ', function () {
  var id = void 0;
  before('Create a record', function (done) {
    var order = {
      name: 'Tshirts',
      origin: 'Kabarore',
      destination: 'Muramba',
      weight: 3
    };
    _chai2.default.request(_app2.default).post('/api/v1/parcels').send(order).set({ token: token }).end(function (error, res) {
      id = res.body.response.id;
      if (error) done(error);
      done();
    });
  });
  it('it should return an order with a given id', function (done) {
    _chai2.default.request(_app2.default).get('/api/v1/parcels/' + id).end(function (error, res) {
      if (error) done(error);
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('origin').eql('Kabarore');
      res.body.should.have.property('destination').eql('Muramba');

      done();
    });
  });
  it('it should return all orders created ', function (done) {
    _chai2.default.request(_app2.default).get('/api/v1/parcels').set({ token: adminToken }).end(function (error, res) {
      if (error) done(error);
      res.should.have.status(200);
      res.body.should.be.a('array');
      done();
    });
  });

  it('it should return orders by a user id', function (done) {
    var decoded = _jwtSimple2.default.decode(token, 'secret');
    _chai2.default.request(_app2.default).get('/api/v1/users/' + decoded.sub.userId + '/parcels').end(function (error, res) {
      if (error) done(error);
      res.should.have.status(200);
      res.body.should.be.a('array');
      done();
    });
  });
});