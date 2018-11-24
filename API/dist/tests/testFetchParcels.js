"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var should = _chai.default.should();

beforeEach('Create a data in memory', function (done) {
  var order = {
    name: 'Socks',
    origin: 'Kabarore',
    destination: 'Muramba',
    userId: 3,
    weight: 0.3
  };

  _chai.default.request(_app.default).post('/api/v1/parcels').send(order).end(function (error, res) {
    if (error) done(error);
    done();
  });
});
describe('It should test fetching parcels ', function () {
  before('Create a record', function (done) {
    var parcel = {
      name: 'T-shirts',
      origin: 'Kabarore',
      destination: 'Muramba',
      userId: 3,
      weight: 0.3
    };

    _chai.default.request(_app.default).post('/api/v1/parcels').send(parcel).end(function (error, res) {
      if (error) done(error);
      done();
    });
  });
  it('it should return an order with a given id', function (done) {
    var id = '1';

    _chai.default.request(_app.default).get("/api/v1/parcels/".concat(id)).end(function (error, res) {
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('origin').eql('Kabarore');
      res.body.should.have.property('destination').eql('Muramba');
      res.body.should.have.property('userId').eql(3);
      done();
    });
  });
  it('it should return all orders created ', function (done) {
    _chai.default.request(_app.default).get('/api/v1/parcels').end(function (error, res) {
      res.should.have.status(200);
      res.body.should.be.a('array');
      res.body.should.have.length(2);
      done();
    });
  });
  it('it should return orders by a user id', function (done) {
    var id = '1';

    _chai.default.request(_app.default).get("/api/v1/users/".concat(id, "/parcels")).end(function (error, res) {
      res.should.have.status(200);
      res.body.should.be.a('array');
      done();
    });
  });
});