import User from '../models/user';

// declare the variable to store users.
const users = [];

const userControllers = {};

// fetch all users.
const fetchAllUsers = (req, res) => {
  if (users.length > 0) {
    res.send(users);
  } else {
    res.send({ message: 'There is no user at the moment.' });
  }
};

// create a user.
const createUser = (req, res) => {
  const { id,name, email, password } = req.body;
  const specificUser = users.find(user => user.email === email);
  if (specificUser) {
    // XXX include the link to sign in with a message;
    res.end('The email is already in use');
  } else {
    // generate the id and pass to a user
    let user1 = new User(id, name, email, password);
    users.push(user1);    
    res.status(200).send({message:'user registered successfully',user1, })
  }
};

// send sign up page.
// const singUpPage = (req, res) => {
//   res.send('signup');
// };

// get a user
const getUser = (req, res) => {
  const id = parseInt(req.params.id);
  const specificUser = users.find(item => item.id === id);
  if (specificUser) {
    res.status(200).send(specificUser);
  } else {
    res.send({ message: 'There is no user with that id' });
  }
};

// Login data processing
const login = (req, res) => {
  const specificUser = users.find((user) => {
    // replace the password given with the hashed password
    if (user.email === req.body.email && user.password === req.body) {
      return user;
    }
  });
  if (specificUser) {
    req.session.user = specificUser;
    // redirect the user to the next page.
    res.status(200).send({message:'User logged in successfully'})
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
