import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jwt-simple';
import app from '../app';

chai.use(chaiHttp);
const should = chai.should();
let token;
let adminToken;
before('Create a user who will create a parcel', (done) => {
  const user = {
    name: 'Yves',
    email: 'iraguhaivos@gmail.com',
    password: 'ahfahdafd',
    userType: 'User',
  };
  const admin = {
    name: 'Yves',
    email: 'iraguhaivos@gmail.com',
    password: 'ahfahdafd',
    userType: 'Admin',
  };
  chai.request(app).post('/api/v1/users/signup').send(user).end((error, res) => {
    if (error) done(error);
    token = res.body.token;
  });
  chai.request(app).post('/api/v1/users/signup').send(admin).end((error, res) => {
    if (error) done(error);
    adminToken = res.body.token;
    done();
  });
});

beforeEach('Create a data in memory', (done) => {
  const order = {
    name: 'Tshirts',
    origin: 'Kabarore',
    destination: 'Muramba',
    weight: 3,
  };
  chai.request(app).post('/api/v1/parcels').send(order).set({ token })
    .end((error, res) => {
      if (error) done(error);      
      done();
    });
});

afterEach('Remove orders ', (done) => {
  chai.request(app).delete('/api/v1/parcels').end((error, res) => {
    if (error) done(error);
    done();
  });
});
describe('It should test fetching parcels ', () => {
  let id;
  before('Create a record', (done) => {
    const order = {
      name: 'Tshirts',
      origin: 'Kabarore',
      destination: 'Muramba',
      weight: 3,
    };
    chai.request(app).post('/api/v1/parcels').send(order).set({ token })
      .end((error, res) => {
        id = res.body.response.id;
        if (error) done(error);
        done();
      });
  });
  it('it should return an order with a given id', (done) => {
    chai.request(app).get(`/api/v1/parcels/${id}`).end((error, res) => {
      if (error) done(error);
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('origin').eql('Kabarore');
      res.body.should.have.property('destination').eql('Muramba');
      
      done();
    });
  });
  it('it should return all orders created ', (done) => {
    chai.request(app).get('/api/v1/parcels').set({ token:adminToken }).end((error, res) => {
      if (error) done(error);
      res.should.have.status(200);
      res.body.should.be.a('array');
      done();
    });
  });

  it('it should return orders by a user id', (done) => {    
    let decoded = jwt.decode(token,"secret");
    chai.request(app).get(`/api/v1/users/${decoded.sub.userId}/parcels`).end((error, res) => {      
      if (error) done(error);
      res.should.have.status(200);
      res.body.should.be.a('array');
      done();
    });
  });
});
