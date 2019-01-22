import passwordHash from 'password-hash';

// Define a class for creating a user
class User {
  constructor(id, firstname, lastname, phone, email, password, userType = 'User') {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.phone = phone;
    this.email = email;
    this.userType = userType;
    this.setPassword(password);
  }

  // define a function to hash the password.
  setPassword(password) {
    const hashedPassword = passwordHash.generate(password);
    // hash the password
    return (this.password = hashedPassword);
  }
}

export default User;
