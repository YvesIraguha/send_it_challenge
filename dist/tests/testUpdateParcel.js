"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('It should test updating parcels', function () {
  before('Create user ', function (done) {
    var order = {
      name: 'T-shirts',
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
  it('It should return the order canceled', function (done) {
    var id = '1';

    _chai.default.request(_app.default).put("/api/v1/parcels/".concat(id, "/cancel")).end(function (error, res) {
      if (error) done(error); // res.should.have.status(400);

      res.body.should.be.a('object');
      res.body.should.have.property('message').eql('Order successfully cancelled');
      res.body.parcel.should.have.property('status').eql('Cancelled');
      done();
    });
  });
  it('It should return an invalid id error', function (done) {
    var id = 'nnn';

    _chai.default.request(_app.default).put("/api/v1/parcels/".concat(id, "/cancel")).end(function (error, res) {
      if (error) done(error); // res.should.have.status(400);

      res.body.should.be.a('object');
      res.body.should.have.property('message').eql('Invalid Id');
      done();
    });
  });
});