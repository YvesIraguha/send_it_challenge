
// import chai from 'chai';
// import chaiHttp from 'chai-http';
// import uuidv1 from 'uuid/v1';
// import app from '../app';

// const should = chai.should();

// chai.use(chaiHttp);

// before('Create data', (done) => {
//   const id = uuidv1();
//   const user = {
//     id,
//     name: 'Yves',
//     email: 'iraguhaivos@gmail.com',
//     password: 'whafhafha',
//   };
//   chai.request(app).post('/api/v1/users').send(user).end((error, res) => {
//     if (error) done(error);
//     done();
//   });
// });

// describe('It should test fetching all users', () => {
//   it('It should return the list of all user', (done) => {
//     chai.request(app).get('/api/v1/users').end((error, res) => {
//       if (error) done(error);
//       res.should.have.status(200);
//       res.body.should.be.a('object');
//       done();
//     });
//   });
//   it('It should return a particular user', (done) => {
//     chai.request(app).get('/api/v1/users/:id').end((error, res) => {
//       if (error) done(error);
//       res.should.have.status(200);
//       res.body.should.be.a('object');
//       done();
//     });
//   });
// });
