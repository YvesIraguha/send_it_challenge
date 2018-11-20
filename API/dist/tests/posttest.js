"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var should = _chai.default.should();

_chai.default.use(_chaiHttp.default);

describe('/POST parcel', function () {
  describe('Successful order creation', function () {
    it('It should acknowledge that parcel was created with created object', function (done) {
      var parcel = {
        name: 'T-shirts',
        origin: 'Kabarore',
        destination: 'Muramba',
        userId: 3,
        weight: 0.3
      };

      _chai.default.request(_app.default).post('/api/v1/parcels').send(parcel).end(function (error, res) {
        if (error) done(error); // res.should.have.status(201);

        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('The order was successfully created');
        res.body.should.have.property('order');
        res.body.order.should.have.property('name').eql('T-shirts');
        res.body.order.should.have.property('origin').eql('Kabarore');
        res.body.order.should.have.property('destination').eql('Muramba');
        res.body.order.should.have.property('userId').eql(3);
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
        userId: 3,
        weight: 'aaaa'
      };

      _chai.default.request(_app.default).post('/api/v1/parcels').send(parcel).end(function (error, res) {
        if (error) done(error); // res.should.have.status(201);

        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Invalid weight, the weight should be number');
        done();
      });
    });
    it('It should display an invalid name error', function (done) {
      var parcel = {
        name: '123455',
        origin: 'Matambi',
        destination: 'Muramba',
        userId: 3,
        weight: 11223
      };

      _chai.default.request(_app.default).post('/api/v1/parcels').send(parcel).end(function (error, res) {
        if (error) done(error); // res.should.have.status(201);

        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Invalid name, the name should start with a letter');
        done();
      });
    });
    it('It should display an invalid origin error', function (done) {
      var parcel = {
        name: 'Tshirts',
        origin: '12345',
        destination: 'Muramba',
        userId: 3,
        weight: 0.3
      };

      _chai.default.request(_app.default).post('/api/v1/parcels').send(parcel).end(function (error, res) {
        if (error) done(error); // res.should.have.status(201);

        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Invalid origin, the origin should be a place');
        done();
      });
    });
    it('It should display an invalid destination error', function (done) {
      var parcel = {
        name: 'Tshirts',
        origin: 'Kabarore',
        destination: '122331',
        userId: 3,
        weight: 0.3
      };

      _chai.default.request(_app.default).post('/api/v1/parcels').send(parcel).end(function (error, res) {
        if (error) done(error); // res.should.have.status(201);

        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Invalid destination, the destination should be a place');
        done();
      });
    });
  });
  describe('Absence of a field', function () {
    it('It should display a missing name error', function (done) {
      var parcel = {
        origin: 'Matambi',
        destination: 'Muramba',
        userId: 3,
        weight: 1
      };

      _chai.default.request(_app.default).post('/api/v1/parcels').send(parcel).end(function (error, res) {
        if (error) done(error); // res.should.have.status(200);

        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('The order should have a name');
        done();
      });
    });
    it('It should display missing origin error', function (done) {
      var parcel = {
        name: 'T-shirts',
        destination: 'Muramba',
        userId: 3,
        weight: 1
      };

      _chai.default.request(_app.default).post('/api/v1/parcels').send(parcel).end(function (error, res) {
        if (error) done(error); // res.should.have.status(201);

        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('The order should have the origin');
        done();
      });
    });
    it('It should display missing destination error', function (done) {
      var parcel = {
        name: 'T-shirts',
        origin: 'Matambi',
        userId: 3,
        weight: 3
      };

      _chai.default.request(_app.default).post('/api/v1/parcels').send(parcel).end(function (error, res) {
        if (error) done(error); // res.should.have.status(201);

        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('The order should have the destination');
        done();
      });
    });
    it('It should display missing userId error', function (done) {
      var parcel = {
        name: 'T-shirts',
        origin: 'Matambi',
        destination: 'Kigali',
        weight: 1
      };

      _chai.default.request(_app.default).post('/api/v1/parcels').send(parcel).end(function (error, res) {
        if (error) done(error); // res.should.have.status(201);

        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('The order should have the user id');
        done();
      });
    });
  });
});