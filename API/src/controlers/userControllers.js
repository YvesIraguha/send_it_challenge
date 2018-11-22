import User from '../models/user';
import queries from '../db/sqlQueries';
import execute from '../db/connection';
import 'babel-polyfill';

// declare the variable to store users.
const users = [];

const userControllers = {};

// fetch all users.
const fetchAllUsers = (req, res) => {
  //let users = execute(`SELECT * FROM users`);
  if (users.length > 0) {
    res.send(users);
  } else {
    res.send({ message: 'There is no user at the moment.' });
  }
};

// create a user.
const createUser = (req, res) => {
  let {
    id, name, email, password,
  } = req.body;
  let specificUser = users.find(user => user.email === email);
  //let specificUser = execute(queries.checkuser,[id])
  if (specificUser) {
    // XXX include the link to sign in with a message;
    res.send({ message: 'The email is already in use' });
  } else if (!name || !email || !password) {
    res.send({ message: 'Please complete the required fields' });
  } else {
    let fieldsValidation = /^[a-zA-Z]+/;
    if (!fieldsValidation.test(name)){
      res.status(400).send({message:"Invalid name, the name should start with letter"})
    }else if(!fieldsValidation.test(email)){
      res.status(400).send({message:'Invalid email, the email should start with letter'})
    }else{
      // generate the id and pass to a user
    let user1 = new User(id, name, email, password);
    //execute(queries.registerUser,[user1.id,user1.name,user1.email,user1.password]);
    users.push(user1);
    res.send({ message: 'user registered successfully', user1 });
    }    
  }
};

// send sign up page.
// const singUpPage = (req, res) => {
//   res.send('signup');
// };

// get a user
const getUser = (req, res) => {
  let id = parseInt(req.params.id);
  let specificUser = users.find(item => item.id === id);
  //let specificUser = execute(queries.checkUser,[id]);
  if (specificUser) {
    res.status(200).send(specificUser);
  } else {
    res.send({ message: 'There is no user with that id' });
  }
};

// Login data processing
const login = (req, res) => {
  let specificUser = users.find((user) => {
    //let specificUser = execute(queries.checkUser,[id])
    // replace the password given with the hashed password
    if (user.email === req.body.email && user.password === req.body) {
      return user;
    }
  });
  if (specificUser) {
    req.session.user = specificUser;
    // redirect the user to the next page.
    res.status(200).send({ message: 'User logged in successfully' });
  }

  res.send('Invalid login');
};

// login verification;
const loginRequired = (req, res) => {
  if (req.session.user) {
    next();
  } else {
    res.end('Not looged in');
  }
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


userControllers.fetchAllUsers = fetchAllUsers;
userControllers.getUser = getUser;
userControllers.createUser = createUser;
userControllers.loginRequired = loginRequired;
userControllers.login = login;
userControllers.signOut = signOut;

export default userControllers;
