
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';


const should = chai.should();
beforeEach('Create a data in database', (done) => {
  const order = {
    name: 'Socks',
    origin: 'Kabarore',
    destination: 'Muramba',
    userId: 3,
    weight: 0.3,
  };
  chai.request(app).post('/api/v1/parcels').send(order).end((error, res) => {
    if (error) done(error);
    done();
  });
});

describe('/GET parcels ', () => {
  beforeEach((done) => {
    const parcel = {
      name: 'T-shirts',
      origin: 'Kabarore',
      destination: 'Muramba',
      userId: 3,
      weight: 0.3,
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
      res.body.should.have.property('userId').eql(3);
      done();
    });
  });
  it('it should return all orders created ', (done) => {
    chai.request(app).get('/api/v1/parcels').end((error, res) => {
      res.should.have.status(200);
      res.body.should.be.a('array');
      res.body.should.have.length(2);
      done();
    });
  });

  it('it should return orders by a user id', (done) => {
    const id = '1';
    chai.request(app).get(`/api/v1/users/${id}/parcels`).end((error, res) => {
      res.should.have.status(200);
      res.body.should.be.a('array');
      done();
    });
  });
});
