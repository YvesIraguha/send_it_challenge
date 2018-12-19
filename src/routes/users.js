import express from 'express';
import authentication from '../helpers/authentication';
import userControllers from '../controlers/userControllers';

// instantiate users router
const usersRouter = express.Router();

// get the list of all users.
usersRouter.get('/', userControllers.fetchAllUsers);

// get a specific user by id
usersRouter.get('/:id', userControllers.getUser);

// accept the data from users signing up
usersRouter.post('/signup', userControllers.createUser);

// the login data
usersRouter.post('/signin', userControllers.login);

// delete users for testing
usersRouter.delete('/', authentication.adminTokenRequired, userControllers.deleteUsers);

export default usersRouter;
