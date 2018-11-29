"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _v = _interopRequireDefault(require("uuid/v1"));

var _app = _interopRequireDefault(require("../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var id;
beforeEach('Create order ', function (done) {
  var order = {
    name: 'red-cards',
    origin: 'Kabarore',
    destination: 'Muramba',
    userId: 3,
    weight: 3
  };

  _chai.default.request(_app.default).post('/api/v1/parcels').send(order).end(function (error, res) {
    id = res.body.response.id;
    if (error) done(error);
    done();
  });
});
describe('It should test set the status to cancelled', function () {
  it('It should return the order canceled', function (done) {
    _chai.default.request(_app.default).put("/api/v1/parcels/".concat(id, "/cancel")).end(function (error, res) {
      if (error) done(error);
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('message').eql('Order successfully cancelled');
      res.body.response.should.have.property('status').eql('Cancelled');
      done();
    });
  });
  it('It should return an invalid id error', function (done) {
    _chai.default.request(_app.default).put("/api/v1/parcels/nnn/cancel").end(function (error, res) {
      if (error) done(error);
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('message').eql('There is no order with that id');
      done();
    });
  });
});
describe('It should test updating the parcel', function () {
  it('It should test destination updated successfully', function (done) {
    var order = {
      destination: 'Rugerero'
    };

    _chai.default.request(_app.default).put("/api/v1/parcels/".concat(id, "/destination")).send(order).end(function (error, res) {
      if (error) done(error);
      res.body.should.be.a('object');
      res.body.should.have.property('message').eql('The parcel was updated successfully');
      res.body.response.should.have.property('destination').eql('Rugerero');
      done();
    });
  });
  it('It should test status updated successfully', function (done) {
    var order = {
      status: 'Delivered'
    };

    _chai.default.request(_app.default).put("/api/v1/parcels/".concat(id, "/status")).send(order).end(function (error, res) {
      if (error) done(error);
      res.body.should.be.a('object');
      res.body.should.have.property('message').eql('The parcel was updated successfully');
      res.body.response.should.have.property('status').eql('Delivered');
      done();
    });
  });
  it('It should test present location updated successfully', function (done) {
    var order = {
      presentLocation: 'Muhabura'
    };

    _chai.default.request(_app.default).put("/api/v1/parcels/".concat(id, "/presentLocation")).send(order).end(function (error, res) {
      if (error) done(error);
      res.body.should.be.a('object');
      res.body.should.have.property('message').eql('The parcel was updated successfully');
      done();
    });
  });
});