
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';


const should = chai.should();
beforeEach('Create a data in memory', (done) => {
  const order = {
    id: 1,
    name: 'Socks',
    origin: 'Kabarore',
    destination: 'Muramba',
    userId: 3,
    weight: 4,
  };
  chai.request(app).post('/api/v1/parcels').send(order).end((error, res) => {
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
  before('Create a record', (done) => {
    const parcel = {
      id: 2,
      name: 'T-shirts',
      origin: 'Kabarore',
      destination: 'Muramba',
      userId: 3,
      weight: 6,
    };
    chai.request(app).post('/api/v1/parcels').send(parcel).end((error, res) => {
      if (error) done(error);
      done();
    });
  });
  it('it should return an order with a given id', (done) => {
    const id = '1';
    chai.request(app).get(`/api/v1/parcels/${id}`).end((error, res) => {
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('origin').eql('Kabarore');
      res.body.should.have.property('destination').eql('Muramba');
      res.body.should.have.property('userid').eql(3);
      done();
    });
  });
  it('it should return all orders created ', (done) => {
    chai.request(app).get('/api/v1/parcels').end((error, res) => {
      if (error) done(error);
      res.should.have.status(200);
      res.body.should.be.a('array');
      // res.body.should.have.length(2);
      done();
    });
  });

  it('it should return orders by a user id', (done) => {
    const id = '3';
    chai.request(app).get(`/api/v1/users/${id}/parcels`).end((error, res) => {
      if (error) done(error);
      res.should.have.status(200);
      res.body.should.be.a('array');
      done();
    });
  });
});