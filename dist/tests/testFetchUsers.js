"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _v = _interopRequireDefault(require("uuid/v1"));

var _app = _interopRequireDefault(require("../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var should = _chai.default.should();

_chai.default.use(_chaiHttp.default);

before('Create data', function (done) {
  var id = (0, _v.default)();
  var user = {
    id: id,
    name: 'Yves',
    email: 'iraguhaivos@gmail.com',
    password: 'whafhafha'
  };

  _chai.default.request(_app.default).post('/api/v1/users').send(user).end(function (error, res) {
    if (error) done(error);
    done();
  });
});
describe('It should test fetching all users', function () {
  it('It should return the list of all user', function (done) {
    _chai.default.request(_app.default).get('/api/v1/users').end(function (error, res) {
      if (error) done(error);
      res.should.have.status(200);
      res.body.should.be.a('object');
      done();
    });
  });
  it('It should return a particular user', function (done) {
    _chai.default.request(_app.default).get('/api/v1/users/:id').end(function (error, res) {
      if (error) done(error);
      res.should.have.status(200);
      res.body.should.be.a('object');
      done();
    });
  });
});