import express from 'express';
import controllers from '../controlers/userControllers';

const usersRouter = express.Router();


// declare the variable to store users.
const users = [];

// get the list of all users.
usersRouter.get('/v1/users');

// create a user
usersRouter.post('/v1/users');

// The route to fetch all users temporaryly for signing up
usersRouter.get('/users/signup');

// get a specific user by id
usersRouter.get('/users/:id');

// the function for checking if a user is looged in.


// accept the data from users signing up
usersRouter.post('/users/signup');

// The the login page;
usersRouter.get('/users/signin', (req, res) => {
  res.render('signin');
});

// the login data
usersRouter.post('/users/signin');

// sign out.
usersRouter.get('/signout', (req, res) => {
  req.session.destroy(() => {
    console.log('A user loged out');
  });
  res.redirect('/users/signin');
});

export default usersRouter;
