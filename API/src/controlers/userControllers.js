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
  const { name, email, password } = req.body;
  const specificUser = users.find(user => user.email === email);
  if (specificUser) {
    // XXX include the link to sign in with a message;
    res.end('account already taken');
  } else {
    users.push(user1);
    req.session.user = user1;
    res.redirect(301, '/api/v1/');
  }
};

// send sign up page.
const singUpPage = (req, res) => {
  res.render('signup');
};

// get a user

const getUser = (req, res) => {
  const userId = parseInt(req.params.id);
  const specificUser = users.find(item => item.id === userId);
  if (specificUser) {
    res.end(`<h1>I got him</h1><h2>${specificUser.id}, I am ${specificUser.name},my email is ${specificUser.email}`);
  } else {
    console.log(userId);
    res.end('<h1>No user of that name</h1>');
  }
};
// Login data processing

const login = (req, res) => {
  const specificUser = users.find((user) => {
    if (user.email === req.body.email && user.password === req.body.email) {
      return user;
    }
  });

  if (specificUser) {
    req.session.user = specificUser;
    // redirect the user to the next page.
    res.redirect('/api/v1/');
  }

  res.end('Invalid login');
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
  const specificUser = users.find((user) => {
    if (user.email === req.body.email && user.password === req.body.email) {
      return user;
    }
  });

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
userControllers.signUpPage = signUpPage;

export default { userControllers };
