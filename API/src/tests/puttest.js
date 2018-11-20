import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

describe('/PUT to cancel order', () => {
  it('It should return the order canceled', (done) => {
    const id = '1';
    chai.request(app).put(`/api/v1/parcels/${id}/cancel`).end((error, res) => {
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('message').eql('Order successfully canceled');
      res.body.parcel.should.have.property('status').eql('Canceled');
      done();
    });
  });


  it('It should return an invalid id error', (done) => {
    const id = 'nnn';
    chai.request(app).put(`/api/v1/parcels/${id}/cancel`).end((error, res) => {
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('message').eql('Invalid Id');
      done();
    });
  });
});
