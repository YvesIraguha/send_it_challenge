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
  let users = execute('SELECT * FROM users');
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
  let {
    name, email, password, userType,
  } = req.body;
  let { error, value } = joi.validate({ name, email, password, userType}, Schema.userSchema);
  if (error){
    res.status(400).send({ error: error.details[0].message });
  }else{
      // generate the id and pass it to a user
      const id = uuidv1();
      const token = authentication.encodeToken({
        name, email, password, userId: id, userType,
      });
      const user1 = new User(id, name, email, password, userType);
      const promise = execute(queries.registerUser, [user1.id, user1.name, user1.email, user1.password, user1.userType]);
      promise.then((response) => {
        const { name, email, userType } = response[0];
        res.status(200).send({ message: 'user registered successfully', response: {id,name, email, userType }, token });
      }).catch((error) => {
        console.log(error);
      });
  };
};


// get a user
const getUser = (req, res) => {
  let id = req.params.id;
  // const specificUser = users.find(item => item.id === id);
  let specificUser = execute('SELECT * FROM users WHERE id =$1', [id]);
  specificUser.then((response) => {
    if (response) {
      res.status(200).send(response[0]);
    } else {
      res.send({ message: 'There is no user with that id' });
    }
  }).catch(error => console.log(error));
};

// Login data processing
const login = (req, res) => {
  let { email, password } = req.body;

  let specificUser = execute(queries.checkUser,[email]);
  specificUser.then((response) => {
    if (response.length >0 ){
    if (passwordHash.verify(password,response[0].password)){
      let { name, password, userType, id } = response[0];
      let token = authentication.encodeToken({ name, email, password, userId:id,userType});
        res.status(200).send({message:"Logged in successfully",token,id,name})
    }else{
      res.status(400).send({error:"Password not matching"})
    };
  }else {
    res.status(400).send({error:'No user with that email'});
  };
  }).catch((error) => {
    console.log(error);
  });
};


// sign out
const signOut = (req, res) => {
  const specificUser = users.find(user => user.email === req.body.email && user.password === req.body.password);
  if (specificUser) {
    req.session.user = specificUser;
    // redirect the user to the next page.
    res.redirect('/api/v1/');
  }
  res.end('Invalid login');
};

//Delete all users from users table.
const deleteUsers = (req, res) => {
  let parcels = execute('DELETE FROM users ');
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
userControllers.signOut = signOut;
userControllers.deleteUsers = deleteUsers;

export default userControllers;
