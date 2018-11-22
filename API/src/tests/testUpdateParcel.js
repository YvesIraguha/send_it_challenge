import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';


describe('/PUT to cancel order', () => {
  before('Create user ', (done) => {
    const order = {
      name: 'T-shirts',
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
  it('It should return the order canceled', (done) => {
    const id = '1';
    chai.request(app).put(`/api/v1/parcels/${id}/cancel`).end((error, res) => {
      if (error) done(error);
      // res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('message').eql('Order successfully cancelled');
      res.body.parcel.should.have.property('status').eql('Cancelled');
      done();
    });
  });


  it('It should return an invalid id error', (done) => {
    const id = 'nnn';
    chai.request(app).put(`/api/v1/parcels/${id}/cancel`).end((error, res) => {
      if (error) done(error);
      // res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('message').eql('Invalid Id');
      done();
    });
  });
});
