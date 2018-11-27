"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _v = _interopRequireDefault(require("uuid/v1"));

var _app = _interopRequireDefault(require("../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var should = _chai.default.should();

_chai.default.use(_chaiHttp.default);

describe('It should test parcel creation', function () {
  beforeEach('Clear data from database', function (done) {
    _chai.default.request(_app.default).delete('/api/v1/parcels').end(function (error, res) {
      if (error) done(error);
      done();
    });
  });
  describe('Successful order creation', function () {
    it('It should acknowledge that parcel was created with created object', function (done) {
      var id = (0, _v.default)();
      var parcel = {
        id: id,
        name: 'T-shirts',
        origin: 'Kabarore',
        destination: 'Muramba',
        userId: 3,
        weight: 3
      };

      _chai.default.request(_app.default).post('/api/v1/parcels').send(parcel).end(function (error, res) {
        if (error) done(error);
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('The order was successfully created');
        res.body.should.have.property('response');
        res.body.response.should.have.property('name').eql('T-shirts');
        res.body.response.should.have.property('origin').eql('Kabarore');
        res.body.response.should.have.property('destination').eql('Muramba');
        res.body.response.should.have.property('userid').eql(3);
        res.body.response.should.have.property('price').eql(300);
        done();
      });
    });
  });
  describe('invalid input', function () {
    it('It should display an invalid weight error', function (done) {
      var id = (0, _v.default)();
      var parcel = {
        id: id,
        name: 'Tshirts',
        origin: 'Matambi',
        destination: 'Muramba',
        userId: 3,
        weight: 'aaaa'
      };

      _chai.default.request(_app.default).post('/api/v1/parcels').send(parcel).end(function (error, res) {
        if (error) done(error);
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Invalid weight, the weight should be number');
        done();
      });
    });
    it('It should display an invalid name error', function (done) {
      var id = (0, _v.default)();
      var parcel = {
        id: id,
        name: '123455',
        origin: 'Matambi',
        destination: 'Muramba',
        userId: 3,
        weight: 11223
      };

      _chai.default.request(_app.default).post('/api/v1/parcels').send(parcel).end(function (error, res) {
        if (error) done(error);
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Invalid name, the name should start with a letter');
        done();
      });
    });
    it('It should display an invalid origin error', function (done) {
      var id = (0, _v.default)();
      var parcel = {
        id: id,
        name: 'Tshirts',
        origin: '12345',
        destination: 'Muramba',
        userId: 3,
        weight: 0.3
      };

      _chai.default.request(_app.default).post('/api/v1/parcels').send(parcel).end(function (error, res) {
        if (error) done(error);
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Invalid origin, the origin should be a place');
        done();
      });
    });
    it('It should display an invalid destination error', function (done) {
      var id = (0, _v.default)();
      var parcel = {
        id: id,
        name: 'Tshirts',
        origin: 'Kabarore',
        destination: '122331',
        userId: 3,
        weight: 0.3
      };

      _chai.default.request(_app.default).post('/api/v1/parcels').send(parcel).end(function (error, res) {
        if (error) done(error);
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Invalid destination, the destination should be a place');
        done();
      });
    });
  });
  describe('Absence of a field', function () {
    it('It should display a missing name error', function (done) {
      var id = (0, _v.default)();
      var parcel = {
        id: id,
        origin: 'Matambi',
        destination: 'Muramba',
        userId: 3,
        weight: 1
      };

      _chai.default.request(_app.default).post('/api/v1/parcels').send(parcel).end(function (error, res) {
        if (error) done(error);
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Please provide all the required fields');
        done();
      });
    });
    it('It should display missing origin error', function (done) {
      var id = (0, _v.default)();
      var parcel = {
        id: id,
        name: 'T-shirts',
        destination: 'Muramba',
        userId: 3,
        weight: 1
      };

      _chai.default.request(_app.default).post('/api/v1/parcels').send(parcel).end(function (error, res) {
        if (error) done(error);
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Please provide all the required fields');
        done();
      });
    });
    it('It should display missing destination error', function (done) {
      var id = (0, _v.default)();
      var parcel = {
        id: id,
        name: 'T-shirts',
        origin: 'Matambi',
        userId: 3,
        weight: 3
      };

      _chai.default.request(_app.default).post('/api/v1/parcels').send(parcel).end(function (error, res) {
        if (error) done(error);
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Please provide all the required fields');
        done();
      });
    });
    it('It should display missing userId error', function (done) {
      var id = (0, _v.default)();
      var parcel = {
        id: id,
        name: 'T-shirts',
        origin: 'Matambi',
        destination: 'Kigali',
        weight: 1
      };

      _chai.default.request(_app.default).post('/api/v1/parcels').send(parcel).end(function (error, res) {
        if (error) done(error);
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Please provide all the required fields');
        done();
      });
    });
  });
});