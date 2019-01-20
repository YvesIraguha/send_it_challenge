// Insert the data into the database
const button = document.querySelector('.signup');
button.onclick = function () {
  const firstname = document.querySelector('.input-firstname').value;
  const lastname = document.querySelector('.input-lastname').value;
  const email = document.querySelector('.input-email').value;
  const phone = document.querySelector('.input-phone').value;
  const password = document.querySelector('.input-password').value;
  const error = document.querySelector('.error');
  // if (verify(firstname,lastname,phone,email,password)){
  //     return;
  // }else{

  const data = {
    firstname,
    lastname,
    phone,
    email,
    password,
  };

  fetch('/api/v1/users/signup', {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then((myJson) => {
      if (myJson.error) {
        error.innerHTML = myJson.error;
      } else {
        error.innerHTML = '';
        localStorage.setItem('token', myJson.token);
        localStorage.setItem('userid', myJson.response.id);
        localStorage.setItem('username', myJson.response.firstname);
        window.location = '/pages/user';
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
// };


function verify(firstname, lastname, phone, email, password) {
  const error = document.querySelector('.error');
  const nameFormat = /^[a-z ,.'-]+$/i;
  const emailFormat = /^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/;
  const phoneNumber = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g;
  if (!nameFormat.test(firstname) || !nameFormat.test(lastname)) {
    error.innerHTML = 'Name should be similar to the example provided';
    return false;
  } if (firstname.length < 3 || lastname.length < 3) {
    error.innerHTML = 'Name should be at least 3 characters long';
    return false;
  }
  if (!phoneNumber.test(phone)) {
    error.innerHTML = 'Phone number should have the format (+250)712233420';
    return false;
  }
  if (password.length < 3) {
    error.innerHTML = 'Please create strong password, at least 3 characters long';
    return false;
  }
  if (!emailFormat.test(email)) {
    error.innerHTML = 'Email shoulld look like test@gmail.com';
    return false;
  }
}
