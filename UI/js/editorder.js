const modal = document.getElementById('parcel-modal');
const closebtn = document.getElementById('closebtn');

// When a user clicks on closebtn, close the modal
closebtn.onclick = function () {
  modal.style.display = 'none';
};

// When a user clicks anywhere outside of the modal, close it.
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};

// Update the the order in the database
const btnUpdate = document.querySelector('.btn-update');
btnUpdate.onclick = function () {
  const id = document.querySelector('.input-id').value;
  const error = document.querySelector('.update-error');
  const destination = document.querySelector('.input-destination').value;
  const data = {
    destination,
  };
  // Update the destination of the parcel in the database
  fetch(`/api/v1/parcels/${id}/destination`, {
    method: 'PUT',
    headers: new Headers({
      'Content-Type': 'application/json',
      token: localStorage.getItem('token'),
    }),
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then((myJson) => {
      if (myJson.error) {
        error.innerHTML = myJson.error;
      } else {
        error.innerHTML = '';
        window.location = '/pages/user';
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

// cancel a parcel delivery order
const btnCancel = document.querySelector('.btn-cancel');
btnCancel.onclick = function () {
  const id = document.querySelector('.input-id').value;
  const error = document.querySelector('.update-error');
  // Update the destination of the parcel in the database
  fetch(`/api/v1/parcels/${id}/cancel`, {
    method: 'PUT',
    headers: new Headers({
      'Content-Type': 'application/json',
      token: localStorage.getItem('token'),
    }),
  })
    .then(response => response.json())
    .then((myJson) => {
      if (myJson.error) {
        error.innerHTML = myJson.error;
      } else {
        error.innerHTML = '';
        window.location = '/pages/user';
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
