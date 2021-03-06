import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const should = chai.should();

chai.use(chaiHttp);
let id;

before('Create a user in a database', (done) => {
  const user = {
    firstname: 'Janvier',
    lastname: 'habineza',
    phone: '25071231231231',
    email: 'habinezajanvier@gmail.com',
    password: 'ahfahdafd',
    userType: 'User',
  };
  chai
    .request(app)
    .post('/api/v1/users/signup')
    .send(user)
    .end((error, res) => {
      if (error) done(error);
      id = res.body.response.id;
      done();
    });
});

describe('It should test fetching all users', () => {
  it('It should return the list of all user', (done) => {
    chai
      .request(app)
      .get('/api/v1/users')
      .end((error, res) => {
        if (error) done(error);
        res.should.have.status(200);
        res.body.should.have.property('response');
        done();
      });
  });
  it('It should return a particular user', (done) => {
    chai
      .request(app)
      .get(`/api/v1/users/${id}`)
      .end((error, res) => {
        if (error) done(error);
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
});

describe('Test a user logged in successfully', () => {
  let id;
  before('Create a user in a database', (done) => {
    const user = {
      firstname: 'Marcel',
      lastname: 'Uwumukiza',
      phone: '25071231231231',
      email: 'marcelresist12@gmail.com',
      password: 'ahfahdafd',
      userType: 'User',
    };
    chai
      .request(app)
      .post('/api/v1/users/signup')
      .send(user)
      .end((error, res) => {
        if (error) done(error);
        id = res.body.response.id;
        done();
      });
  });

  it('It should test a successful log in', (done) => {
    const user = {
      email: 'marcelresist12@gmail.com',
      password: 'ahfahdafd',
    };
    chai
      .request(app)
      .post('/api/v1/users/signin')
      .send(user)
      .end((error, res) => {
        if (error) done(error);
        res.should.have.status(200);
        res.body.should.have.property('message').eql('Logged in successfully');
        res.body.should.have.property('token');
        done();
      });
  });
  it('It should test a not matching password', (done) => {
    const user = {
      email: 'iraguhaivos@gmail.com',
      password: 'adafdafdafeae',
    };
    chai
      .request(app)
      .post('/api/v1/users/signin')
      .send(user)
      .end((error, res) => {
        if (error) done(error);
        res.should.have.status(400);
        res.body.should.have.property('error');
        done();
      });
  });
  it('It should test a non existing record', (done) => {
    const user = {
      email: 'iruwaraivos@gmail.com',
      password: 'adafdafdafeae',
    };
    chai
      .request(app)
      .post('/api/v1/users/signin')
      .send(user)
      .end((error, res) => {
        if (error) done(error);
        res.should.have.status(400);
        res.body.should.have.property('error');
        done();
      });
  });
});
