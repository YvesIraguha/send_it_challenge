import passwordHash from 'password-hash';

// Define a class for creating a user
class User {
  constructor(id, name, email, password,userType='User') {
    this.id = id;
    this.name = name;
    this.email = email;
    this.userType = userType; 
    this.setPassword(password);
  }

  // define a function to hash the password.
  setPassword(password) {
    const hashedPassword = passwordHash.generate(password);
    // hash the password
    return this.password = hashedPassword;
  }
}

export default User;
