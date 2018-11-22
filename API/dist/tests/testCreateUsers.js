// import chai from 'chai';
// import chaiHttp from 'chai-http';
// import app from '../app';
// const should = chai.should();
// chai.use(chaiHttp);
// describe('/POST create a user', () => {
//   it('Created user successfully', (done) => {
//     const user = {
//       id:1,
//       name: 'Yves Iraguha',
//       email: 'alfheaagd@gmail.com',
//       password: 'afhasiujfsia',
//     };
//     chai.request(app).post('/api/v1/users').send(user).end((error, res) => {
//       if (error) done(error);
//       res.body.should.be.a('object');
//       res.body.should.have.property('message').eql('user created successfully');
//       res.body.user.should.have.property('name').eql('Yves Iraguha');
//       res.body.user.should.have.property('email').eql('alfheaagd@gmail.com');
//       res.body.user.should.have.property('password').eql('afhasiujfsia');
//       done();
//     });
//   });
//   describe('/POST invalid fields', () => {
//     it('An invalid name error', (done) => {
//       const user = {
//         id:1,
//         name: '121231231',
//         email: 'afafhag@gmail.com',
//         password: 'afafsafgafsdf',
//       };
//       chai.request(app).post('/api/v1/users').send(user).end((error, res) => {
//         if (error) done(error);
//         res.body.should.have.property('message').eql('Invalid name, the name should start with letter');
//         done();
//       });
//     });
//     it('An invalid email error', (done) => {
//       const user = {
//         id:1,
//         name: 'Yves Iraguha',
//         email: '1221afhafhahf@gmail.com',
//         password: 'afafsafgafsdf',
//       };
//       chai.request(app).post('/api/v1/users').send(user).end((error, res) => {
//         if (error) done(error);
//         res.body.should.have.property('message').eql('Invalid email, the email should start with letter');
//         done();
//       });
//     });
//   });
//   describe('missing fields errors', () => {
//     it('A missing name error', (done) => {
//       const user = {
//         id:1,
//         email: 'afafafaf@gmail.com',
//         password: 'afhafha',
//       };
//       chai.request(app).post('/api/v1/users').send(user).end((error, res) => {
//         if (error) done(error);
//         res.body.should.be.a('object');
//         res.body.should.have.property('message').eql('Cannot create a user without name');
//         done();
//       });
//     });
//     it('A missing email error', (done) => {
//       const user = {
//         id:1,
//         name: 'Yves Iraguha',
//         password: 'afhafha',
//       };
//       chai.request(app).post('/api/v1/users').send(user).end((error, res) => {
//         if (error) done(error);
//         res.body.should.be.a('object');
//         res.body.should.have.property('message').eql('Cannot create a user without email');
//         done();
//       });
//     });
//     it('A missing password error', (done) => {
//       const user = {
//         id:1,
//         name: 'Yves Iraguha',
//         email: 'afafafaf@gmail.com',
//       };
//       chai.request(app).post('/api/v1/users').send(user).end((error, res) => {
//         if (error) done(error);
//         res.body.should.be.a('object');
//         res.body.should.have.property('message').eql('Cannot create a user without a password');
//         done();
//       });
//     });
//   });
// });
"use strict";