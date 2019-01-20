const modal = document.getElementById("login-modal");
const btn = document.getElementById("open-login");
const closebtn = document.getElementById("closebtn");

// display the modal onclick
btn.onclick = function() {
  modal.style.display = "block";
};

// When a user clicks on closebtn, close the modal
closebtn.onclick = function() {
  modal.style.display = "none";
};

// When a user clicks anywhere outside of the modal, close it.

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// consume the api for log in the database
const btnlogin = document.querySelector(".btn-login");
btnlogin.onclick = function() {
  const email = document.querySelector(".input-email-login").value;
  const password = document.querySelector(".input-password-login").value;
  const error = document.querySelector(".login-error");
  const data = {
    email,
    password
  };

  fetch("/api/v1/users/signin", {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json"
    }),
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(myJson => {
      if (myJson.error) {
        error.innerHTML = myJson.error;
        return;
      }
      error.innerHTML = "";
      localStorage.setItem("token", myJson.token);
      localStorage.setItem("userid", myJson.userid);
      localStorage.setItem("username", myJson.firstname);
      window.location = "/pages/user";
    })
    .catch(error => {
      console.log(error);
    });
};
