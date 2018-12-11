import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jwt-simple';
import app from '../app';

chai.use(chaiHttp);


// Create a user who will create a parcel
let userToken;
let adminToken;

before('Create a user who will create a parcel', (done) => {
  const user = {
    name: 'Yves',
    email: 'iraguhaivos@gmail.com',
    password: 'ahfahdafd',
    userType: 'User',
  };
  chai.request(app).post('/api/v1/users/signup').send(user).end((error, res) => {
    if (error) done(error);
    userToken = res.body.token;
    done();
  });
});


// Create an admin who will update the parcel
before('Create an admin who will update a parcel', (done) => {
  const user = {
    name: 'Admin',
    email: 'uwaraall@gmail.com',
    password: 'afafedadfaeffd',
    userType: 'Admin',
  };
  chai.request(app).post('/api/v1/users/signup').send(user).end((error, res) => {
    if (error) done(error);
    adminToken = res.body.token;
    done();
  });
});


let id;



describe('It should test set the status to cancelled', () => { 
  before('Create order ', (done) => {
    const order = {
      name: 'Tshirts',
      origin: 'Kabarore',
      destination: 'Muramba',
      weight: 3,
    };
    chai.request(app).post('/api/v1/parcels').send(order).set({ token: userToken })
      .end((error, res) => {
        id = res.body.response.id;
        if (error) done(error);
        done();
      });
  });
   
  it('It should return the order canceled', (done) => {
    chai.request(app).put(`/api/v1/parcels/${id}/cancel`).set({ token: userToken }).end((error, res) => {
      if (error) done(error);
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('message').eql('Order successfully cancelled');
      res.body.response.should.have.property('status').eql('Cancelled');
      done();
    });
  });


  it('It should return an invalid id error', (done) => {
    chai.request(app).put('/api/v1/parcels/nnn/cancel').set({ token: userToken }).end((error, res) => {
      if (error) done(error);
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('message').eql('There is no order with that id');
      done();
    });
  });
});

describe('It should test updating the parcel', () => {
  before('Create order ', (done) => {
    const order = {
      name: 'Tshirts',
      origin: 'Kabarore',
      destination: 'Muramba',
      weight: 3,
    };
    chai.request(app).post('/api/v1/parcels').send(order).set({ token: userToken })
      .end((error, res) => {
        id = res.body.response.id;
        if (error) done(error);
        done();
      });
  });
  
  it('It should test destination updated successfully', (done) => {
    const order = {
      destination: 'Rugerero',
    };
    chai.request(app).put(`/api/v1/parcels/${id}/destination`).send(order).set({ token: userToken })
      .end((error, res) => {        
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
    chai.request(app).put(`/api/v1/parcels/${id}/status`).send(order).set({ token: adminToken })
      .end((error, res) => {        
        if (error) done(error);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('The parcel was updated successfully');
        done();
      });
  });
  it('It should test present location updated successfully', (done) => {
    const order = {
      presentLocation: 'Muhabura',
    }; 
    chai.request(app).put(`/api/v1/parcels/${id}/presentLocation`).send(order).set({ token: adminToken })
      .end((error, res) => {        
        if (error) done(error);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('The parcel was updated successfully');
        done();
      });      
  });
});
