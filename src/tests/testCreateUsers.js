
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';


const should = chai.should();

chai.use(chaiHttp);
describe('It should test creating a user', () => {
  it('Created user successfully', (done) => {
    const user = {
      firstname: 'Yves',
      lastname: 'iraguha',
      phone: '25071231231231',
      email: 'alfheaagd@gmail.com',
      password: 'ahfahdafd',
      userType: 'User',
    };
    chai.request(app).post('/api/v1/users/signup').send(user).end((error, res) => {
      if (error) done(error);
      res.body.should.be.a('object');
      res.body.should.have.property('message').eql('user registered successfully');
      res.body.response.should.have.property('firstname').eql('Yves');
      res.body.response.should.have.property('email').eql('alfheaagd@gmail.com');
      done();
    });
  });
  describe('Should test invalid fields', () => {
    it('An invalid name error', (done) => {
      const user = {
        firstname: '12',
        lastname: 'iraguha',
        phone: '25071231231231',
        email: 'adhandansgd@gmail.com',
        password: 'ahfahdafd',
        userType: 'User',
      };
      chai.request(app).post('/api/v1/users/signup').send(user).end((error, res) => {
        if (error) done(error);
        res.body.should.have.property('error');
        done();
      });
    });
    it('An invalid email error', (done) => {
      const user = {
        firstname: 'Murara',
        lastname: 'iraguha',
        phone: '25071231231231',
        email: '12',
        password: 'ahfahdafd',
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
        phone: '25071231231231',
        email: 'afadafasfaf@gmail.com',
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
      const user = {
        firstname: 'Yves ',
        lastname: 'Iraguha',
        phone: '25071231231231',
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
      const user = {
        firstname: 'Yves',
        lastname: 'Irguha',
        phone: '25071231231231',
        email: 'afaflkjgffs@gmail.com',
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
