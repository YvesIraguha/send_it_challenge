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

// Create a user who will create a parcel
var userToken = void 0;
var adminToken = void 0;

before('Create a user who will create a parcel', function (done) {
  var user = {
    firstname: 'John',
    lastname: 'Doen',
    phone: '25071231231231',
    email: 'iraguhavis@gmail.com',
    password: 'ahfahdafd',
    userType: 'User'
  };
  _chai2.default.request(_app2.default).post('/api/v1/users/signup').send(user).end(function (error, res) {
    if (error) done(error);
    userToken = res.body.token;
    done();
  });
});

// Create an admin who will update the parcel
before('Create an admin who will update a parcel', function (done) {
  var user = {
    firstname: 'Admin',
    lastname: 'Administration',
    phone: '25071231231231',
    email: 'uwaraall@gmail.com',
    password: 'afafedadfaeffd',
    userType: 'Admin'
  };
  _chai2.default.request(_app2.default).post('/api/v1/users/signup').send(user).end(function (error, res) {
    if (error) done(error);
    adminToken = res.body.token;
    done();
  });
});

var id = void 0;

describe('It should test set the status to cancelled', function () {
  before('Create order ', function (done) {
    var order = {
      name: 'Tshirts',
      origin: 'Kabarore',
      destination: 'Muramba',
      weight: 3
    };
    _chai2.default.request(_app2.default).post('/api/v1/parcels').send(order).set({ token: userToken }).end(function (error, res) {
      id = res.body.response.id;
      if (error) done(error);
      done();
    });
  });

  it('It should return the order canceled', function (done) {
    _chai2.default.request(_app2.default).put('/api/v1/parcels/' + id + '/cancel').set({ token: userToken }).end(function (error, res) {
      if (error) done(error);
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('message').eql('Order successfully cancelled');
      res.body.response.should.have.property('status').eql('Cancelled');
      done();
    });
  });

  it('It should return an invalid id error', function (done) {
    _chai2.default.request(_app2.default).put('/api/v1/parcels/nnn/cancel').set({ token: userToken }).end(function (error, res) {
      if (error) done(error);
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('error');
      done();
    });
  });
});

describe('It should test updating the parcel', function () {
  before('Create order ', function (done) {
    var order = {
      name: 'Tshirts',
      origin: 'Kabarore',
      destination: 'Muramba',
      weight: 3
    };
    _chai2.default.request(_app2.default).post('/api/v1/parcels').send(order).set({ token: userToken }).end(function (error, res) {
      id = res.body.response.id;
      if (error) done(error);
      done();
    });
  });

  it('It should test destination updated successfully', function (done) {
    var order = {
      destination: 'Rugerero'
    };
    _chai2.default.request(_app2.default).put('/api/v1/parcels/' + id + '/destination').send(order).set({ token: userToken }).end(function (error, res) {
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
    _chai2.default.request(_app2.default).put('/api/v1/parcels/' + id + '/status').send(order).set({ token: adminToken }).end(function (error, res) {
      if (error) done(error);
      res.body.should.be.a('object');
      res.body.should.have.property('message').eql('The parcel was updated successfully');
      done();
    });
  });
  it('It should test present location updated successfully', function (done) {
    var order = {
      presentLocation: 'Muhabura'
    };
    _chai2.default.request(_app2.default).put('/api/v1/parcels/' + id + '/presentLocation').send(order).set({ token: adminToken }).end(function (error, res) {
      if (error) done(error);
      res.body.should.be.a('object');
      res.body.should.have.property('message').eql('The parcel was updated successfully');
      done();
    });
  });
});