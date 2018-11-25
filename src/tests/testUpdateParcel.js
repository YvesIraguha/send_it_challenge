import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

beforeEach('Create order ', (done) => {
  const order = {
    id: 1,
    name: 'red-cards',
    origin: 'Kabarore',
    destination: 'Muramba',
    userId: 3,
    weight: 3,
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

describe('It should test set the status to cancelled', () => {
  it('It should return the order canceled', (done) => {
    const id = '1';
    chai.request(app).put(`/api/v1/parcels/${id}/cancel`).end((error, res) => {
      if (error) done(error);
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('message').eql('Order successfully cancelled');
      res.body.response.should.have.property('status').eql('Cancelled');
      done();
    });
  });


  it('It should return an invalid id error', (done) => {
    const id = 'nnn';
    chai.request(app).put(`/api/v1/parcels/${id}/cancel`).end((error, res) => {
      if (error) done(error);
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('message').eql('Invalid id');
      done();
    });
  });
});

describe('It should test updating the parcel', () => {
  beforeEach('Create a parcel', (done) => {
    const parcel = {
      id: 2,
      name: 'socks',
      origin: 'kigali',
      destination: 'Burera',
      weight: 10,
      userId: 12,
    };
    chai.request(app).post('/api/v1/parcels').send(parcel).end((error, res) => {
      if (error) done(error);
      done();
    });
  });
  it('It should test destination updated successfully', (done) => {
    const order = {
      destination: 'Rugerero',
    };
    chai.request(app).put('/api/v1/parcels/2/destination').send(order).end((error, res) => {
      if (error) done(error);
      res.body.should.be.a('object');
      res.body.should.have.property('message').eql('The parcel was updated successfully');
      res.body.response.should.have.property('destination').eql('Rugerero');
      done();
    });
  });
  it('It should test status updated successfully', (done) => {
    const order = {
      status: 'Delivered',
    };
    chai.request(app).put('/api/v1/parcels/2/status').send(order).end((error, res) => {
      if (error) done(error);
      res.body.should.be.a('object');
      res.body.should.have.property('message').eql('The parcel was updated successfully');
      res.body.response.should.have.property('status').eql('Delivered');
      done();
    });
  });
  it('It should test present location updated successfully', (done) => {
    const order = {
      presentLocation: 'Muhabura',
    };
    chai.request(app).put('/api/v1/parcels/2/presentLocation').send(order).end((error, res) => {
      if (error) done(error);
      res.body.should.be.a('object');
      res.body.should.have.property('message').eql('The parcel was updated successfully');
      // res.body.response.should.have.property('presentLocation').eql('Muhabura');
      done();
    });
  });
});
