"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('/PUT to cancel order', function () {
  it('It should return the order canceled', function (done) {
    var id = '1';

    _chai.default.request(_app.default).put("/api/v1/parcels/".concat(id, "/cancel")).end(function (error, res) {
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('message').eql('Order successfully canceled');
      res.body.parcel.should.have.property('status').eql('Canceled');
      done();
    });
  });
  it('It should return an invalid id error', function (done) {
    var id = 'nnn';

    _chai.default.request(_app.default).put("/api/v1/parcels/".concat(id, "/cancel")).end(function (error, res) {
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('message').eql('Invalid Id');
      done();
    });
  });
});