"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var should = _chai.default.should();

_chai.default.use(_chaiHttp.default);

describe('/POST parcel', function () {
  it('It should return the added object', function (done) {
    var parcel = {
      "name": "T-shirts",
      "origin": "Kabarore",
      "destination": "Muramba",
      "userId": 3,
      "weight": 0.3
    };

    _chai.default.request(_app.default).post('/api/v1/parcels').send(parcel).end(function (error, res) {
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('price').eql(30);
    });

    done();
  });
  it('It should display an eror message', function (done) {
    var parcel = {
      "name": "T-shirts",
      "origin": "Matambi",
      "destination": "Muramba",
      "userId": 3,
      "weight": "aira"
    };

    _chai.default.request(_app.default).post('/api/v1/parcels').send(parcel).end(function (error, res) {
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('message').eql('the order should have origin, destination, userId, and weight of type number fields');
    });

    done();
  });
});
describe('/GET parcels ', function () {
  it("it should return an order with a given id", function (done) {
    var id = '1';

    _chai.default.request(_app.default).get('/api/v1/parcels/' + id).end(function (error, res) {
      res.should.have.status(200);
      res.body.should.have.property("origin");
      res.body.should.be.a('object');
      done();
    });
  });
  it("it should return all orders created ", function (done) {
    _chai.default.request(_app.default).get('/api/v1/parcels').end(function (error, res) {
      res.should.have.status(200);
      res.body.should.be.a('array');
      done();
    });
  });
  it("it should return orders by a user id", function (done) {
    var id = '1';

    _chai.default.request(_app.default).get("/api/v1/users/".concat(id, "/parcels")).end(function (error, res) {
      res.should.have.status(200);
      res.body.should.be.a('array');
      done();
    });
  });
});
describe("/PUT to cancel order", function () {
  it("It should delete a user with id ", function (done) {
    var id = "1";

    _chai.default.request(_app.default).put("/api/v1/parcels/".concat(id, "/cancel")).end(function (error, res) {
      res.should.have.status(200);
      res.body.should.be.a('object');
      done();
    });
  });
  it("It should return an error message ", function (done) {
    var id = "nnn";

    _chai.default.request(_app.default).put("/api/v1/parcels/".concat(id, "/cancel")).end(function (error, res) {
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('message').eql("There is no parcel with that Id");
      done();
    });
  });
});