import express from 'express';
import authentication from '../helpers/authentication';
import userControllers from '../controlers/userControllers';

// instantiate users router
const usersRouter = express.Router();

// get the list of all users.
usersRouter.get('/', authentication.adminTokenRequired, userControllers.fetchAllUsers);

// The route for signing up link
// usersRouter.get('/signup', userControllers.signUpPage);

// get a specific user by id
usersRouter.get('/:id',authentication.accessTokenRequired, userControllers.getUser);

// accept the data from users signing up
usersRouter.post('/signup', userControllers.createUser);

// The login page;
// usersRouter.get('/signin', userControllers.loginPage);

// the login data
usersRouter.post('/signin', userControllers.login);

// sign out.
usersRouter.get('/signout', userControllers.signOut);

// delete users for testing
usersRouter.delete('/', authentication.adminTokenRequired, userControllers.deleteUsers);

export default usersRouter;
