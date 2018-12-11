
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';


const should = chai.should();

chai.use(chaiHttp);
describe('It should test creating a user', () => {
  it('Created user successfully', (done) => {
    const user = {
      name: 'Yves',
      email: 'alfheaagd@gmail.com',
      password: 'afhasiujfsia',
      userType: 'User',
    };
    chai.request(app).post('/api/v1/users/signup').send(user).end((error, res) => {
      if (error) done(error);
      res.body.should.be.a('object');
      res.body.should.have.property('message').eql('user registered successfully');
      res.body.response.should.have.property('name').eql('Yves');
      res.body.response.should.have.property('email').eql('alfheaagd@gmail.com');
      done();
    });
  });
  describe('Should test invalid fields', () => {
    it('An invalid name error', (done) => {
      const user = {
        name: '12',
        email: 'afafhag@gmail.com',
        password: 'afafsafgafsdf',
        userType: 'User',
      };
      chai.request(app).post('/api/v1/users/signup').send(user).end((error, res) => {
        if (error) done(error);
        res.body.should.have.property('error');
        done();
      });
    });
    it('An invalid email error', (done) => {
      let user = {
        name: 'Yves Iraguha',
        email: '12',
        password: 'afafsafgafsdf',
        userType: 'User',
      };
      chai.request(app).post('/api/v1/users/signup').send(user).end((error, res) => {
        if (error) done(error);
        res.body.should.have.property('error');
        done();
      });
    });
  });
  describe('It should test missing fields errors', () => {
    it('A missing name error', (done) => {
      const user = {
        email: 'afafafaf@gmail.com',
        password: 'afhafha',
        userType: 'User',
      };
      chai.request(app).post('/api/v1/users/signup').send(user).end((error, res) => {
        if (error) done(error);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        done();
      });
    });
    it('A missing email error', (done) => {
      let user = {
        name: 'Yves Iraguha',
        password: 'afhafha',
        userType: 'User',
      };
      chai.request(app).post('/api/v1/users/signup').send(user).end((error, res) => {
        if (error) done(error);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        done();
      });
    });
    it('A missing password error', (done) => {
      let user = {
        name: 'Yves Iraguha',
        email: 'afafafaf@gmail.com',
        userType: 'User',
      };
      chai.request(app).post('/api/v1/users/signup').send(user).end((error, res) => {
        if (error) done(error);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        done();
      });
    });
  });
});
