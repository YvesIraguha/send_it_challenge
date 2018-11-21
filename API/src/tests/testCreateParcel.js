
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';


const should = chai.should();

chai.use(chaiHttp);

describe('/POST parcel', () => {
  describe('Successful order creation', () => {
    it('It should acknowledge that parcel was created with created object', (done) => {
      const parcel = {
        name: 'T-shirts',
        origin: 'Kabarore',
        destination: 'Muramba',
        userId: 3,
        weight: 0.3,
      };
      chai.request(app).post('/api/v1/parcels').send(parcel).end((error, res) => {
        if (error) done(error);
        // res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('The order was successfully created');
        res.body.should.have.property('order');
        res.body.order.should.have.property('name').eql('T-shirts');
        res.body.order.should.have.property('origin').eql('Kabarore');
        res.body.order.should.have.property('destination').eql('Muramba');
        res.body.order.should.have.property('userId').eql(3);
        done();
      });
    });
  });

  describe('invalid input', () => {
    it('It should display an invalid weight error', (done) => {
      const parcel = {
        name: 'Tshirts',
        origin: 'Matambi',
        destination: 'Muramba',
        userId: 3,
        weight: 'aaaa',
      };
      chai.request(app).post('/api/v1/parcels').send(parcel).end((error, res) => {
        if (error) done(error);
        // res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Invalid weight, the weight should be number');
        done();
      });
    });

    it('It should display an invalid name error', (done) => {
      const parcel = {
        name: '123455',
        origin: 'Matambi',
        destination: 'Muramba',
        userId: 3,
        weight: 11223,
      };
      chai.request(app).post('/api/v1/parcels').send(parcel).end((error, res) => {
        if (error) done(error);
        // res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Invalid name, the name should start with a letter');
        done();
      });
    });

    it('It should display an invalid origin error', (done) => {
      const parcel = {
        name: 'Tshirts',
        origin: '12345',
        destination: 'Muramba',
        userId: 3,
        weight: 0.3,
      };
      chai.request(app).post('/api/v1/parcels').send(parcel).end((error, res) => {
        if (error) done(error);
        // res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Invalid origin, the origin should be a place');
        done();
      });
    });

    it('It should display an invalid destination error', (done) => {
      const parcel = {
        name: 'Tshirts',
        origin: 'Kabarore',
        destination: '122331',
        userId: 3,
        weight: 0.3,
      };
      chai.request(app).post('/api/v1/parcels').send(parcel).end((error, res) => {
        if (error) done(error);
        // res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Invalid destination, the destination should be a place');
        done();
      });
    });
  });


  describe('Absence of a field', () => {
    it('It should display a missing name error', (done) => {
      const parcel = {
        origin: 'Matambi',
        destination: 'Muramba',
        userId: 3,
        weight: 1,
      };
      chai.request(app).post('/api/v1/parcels').send(parcel).end((error, res) => {
        if (error) done(error);
        // res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Please provide all the required fields');
        done();
      });
    });
    it('It should display missing origin error', (done) => {
      const parcel = {
        name: 'T-shirts',
        destination: 'Muramba',
        userId: 3,
        weight: 1,
      };
      chai.request(app).post('/api/v1/parcels').send(parcel).end((error, res) => {
        if (error) done(error);
        // res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Please provide all the required fields');
        done();
      });
    });
    it('It should display missing destination error', (done) => {
      const parcel = {
        name: 'T-shirts',
        origin: 'Matambi',
        userId: 3,
        weight: 3,
      };
      chai.request(app).post('/api/v1/parcels').send(parcel).end((error, res) => {
        if (error) done(error);
        // res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Please provide all the required fields');
        done();
      });
    });
    it('It should display missing userId error', (done) => {
      const parcel = {
        name: 'T-shirts',
        origin: 'Matambi',
        destination: 'Kigali',
        weight: 1,
      };
      chai.request(app).post('/api/v1/parcels').send(parcel).end((error, res) => {
        if (error) done(error);
        // res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Please provide all the required fields');
        done();
      });
    });
  });
});
