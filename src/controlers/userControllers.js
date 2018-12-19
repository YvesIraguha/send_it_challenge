import passwordHash from 'password-hash';
import joi from 'joi';
import uuidv1 from 'uuid/v1';
import queries from '../db/sqlQueries';
import execute from '../db/connection';
import authentication from '../helpers/authentication';
import User from '../models/user';
import Schema from '../helpers/inputFieldsValidation';

// declare the variable to store users

const userControllers = {};

// fetch all users.
const fetchAllUsers = (req, res) => {
  const users = execute('SELECT * FROM users');
  users.then((response) => {
    if (response) {
      res.send({ response });
    } else {
      res.send({ message: 'There is no user at the moment.' });
    }
  }).catch(error => console.log(error));
};

// create a user
const createUser = (req, res) => {
  const {
    firstname, lastname, phone, email, password, userType,
  } = req.body;
  const { error, value } = joi.validate({
    firstname, lastname, email, password, userType,
  }, Schema.userSchema);
  if (error) {
    res.status(400).send({ error: error.details[0].message });
  } else {
    // generate the id and pass it to a user
    const id = uuidv1();
    const user1 = new User(id, firstname, lastname, phone, email, password, userType);
    const token = authentication.encodeToken({
      firstname, lastname, phone, email, password, userId: id, userType: user1.userType,
    });
    const promise = execute(queries.registerUser, [user1.id, user1.firstname, user1.lastname, user1.phone, user1.email, user1.password, user1.userType]);
    promise.then((response) => {
      const {
        firstname, lastname, email, userType,
      } = response[0];
      res.status(200).send({
        message: 'user registered successfully',
        response: {
          id, firstname, lastname, email, userType,
        },
        token,
      });
    }).catch((error) => {
      res.status(400).send({ error });
    });
  }
};


// get a user
const getUser = (req, res) => {
  const id = req.params.id;
  // const specificUser = users.find(item => item.id === id);
  const specificUser = execute('SELECT * FROM users WHERE id =$1', [id]);
  specificUser.then((response) => {
    if (response) {
      res.status(200).send(response[0]);
    } else {
      res.send({ message: 'There is no user with that id' });
    }
  }).catch(error => res.status(400).send({ error }));
};

// Login data processing
const login = (req, res) => {
  const { email, password } = req.body;

  const specificUser = execute(queries.checkUser, [email]);
  specificUser.then((response) => {
    if (response.length > 0) {
      if (passwordHash.verify(password, response[0].password)) {
        const {
          name, password, usertype, id,
        } = response[0];
        const token = authentication.encodeToken({
          name, email, password, userId: id, usertype,
        });
        res.status(200).send({
          message: 'Logged in successfully', token, id, name, usertype,
        });
      } else {
        res.status(400).send({ error: 'Password not matching' });
      }
    } else {
      res.status(400).send({ error: 'No user with that email' });
    }
  }).catch((error) => {
    res.status(400).send({ error });
  });
};

// Delete all users from users table.
const deleteUsers = (req, res) => {
  const parcels = execute('DELETE FROM users ');
  parcels.then((response) => {
    res.status(200).send({ message: 'Users deleted successfully', response });
  }).catch((error) => {
    res.status(400).send({ error });
  });
};

userControllers.fetchAllUsers = fetchAllUsers;
userControllers.getUser = getUser;
userControllers.createUser = createUser;
userControllers.login = login;
userControllers.deleteUsers = deleteUsers;

export default userControllers;
