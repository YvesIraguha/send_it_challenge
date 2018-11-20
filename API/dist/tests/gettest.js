"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var should = _chai.default.should();

describe('/GET parcels ', function () {
  it('it should return an order with a given id', function (done) {
    var id = '1';

    _chai.default.request(_app.default).get("/api/v1/parcels/".concat(id)).end(function (error, res) {
      res.should.have.status(200);
      res.body.should.be.a('object');
      done();
    });
  });
  it('it should return all orders created ', function (done) {
    _chai.default.request(_app.default).get('/api/v1/parcels').end(function (error, res) {
      res.should.have.status(200);
      res.body.should.be.a('array');
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