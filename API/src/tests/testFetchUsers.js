
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';


const should = chai.should();

chai.use(chaiHttp);

describe('/Get a user',() => {
    beforeEach((done) =>{
        const user = {
            name:"Yves Iragua",
            email:"iraguhaivos@gmail.com",
            password:'whafhafha',
        }
        chai.request(app).post('/api/v1/users').send(user).end((error,res) => {
            if (error) done(error);
            done();
        })
    })
    it('It should return the list of all user',(done) => {  
        chai.request(app).get('/api/v1/users').end((error,res) => {
            if (error) done(error);
            res.should.have.status(200);
            res.body.should.be.a('array');
            done();
        })
    })
    it('It should return a particular user',(done) => {  
        chai.request(app).get('/api/v1/users/:id').end((error,res) => {
            if (error) done(error);
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
        })
    })
})