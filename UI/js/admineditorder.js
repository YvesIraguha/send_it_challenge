const modal = document.getElementById('parcel-modal');
const closebtn = document.getElementById('closebtn');

// When a user clicks on closebtn, close the modal
closebtn.onclick = () => {
  modal.style.display = 'none';
};

// When a user clicks anywhere outside of the modal, close it.
window.onclick = (event) => {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};
// Admin updating the present location of parcel delivery order

const adminUpdateOrder = document.querySelector('.admin-btn-update');
adminUpdateOrder.onclick = () => {
  const origin = document.querySelector('.input-origin').value;
  const destination = document.querySelector('.input-destination').value;
  const presentLocation = document.querySelector('.input-present-location').value;
  const error = document.querySelector('.update-error');
  const id = document.querySelector('.input-id').value;
  let status;
  if (origin === presentLocation) {
    status = 'Notdelivered';
  } else if (destination === presentLocation) {
    status = 'Delivered';
  } else {
    status = 'Intransit';
  }

  // Update the destination of the parcel in the database
  fetch(`/api/v1/parcels/${id}/presentlocation`, {
    method: 'PUT',
    headers: new Headers({
      'Content-Type': 'application/json',
      token: localStorage.getItem('token'),
    }),
    body: JSON.stringify({ presentLocation }),
  })
    .then(response => response.json())
    .then((myJson) => {
      if (myJson.error) {
        error.innerHTML = myJson.error;
      } else {
        error.innerHTML = '';
      }
    })
    .catch((err) => {
      console.log(err);
    });

  fetch(`/api/v1/parcels/${id}/status`, {
    method: 'PUT',
    headers: new Headers({
      'Content-Type': 'application/json',
      token: localStorage.getItem('token'),
    }),
    body: JSON.stringify({ status }),
  })
    .then(response => response.json())
    .then((myJson) => {
      if (myJson.error) {
        error.innerHTML = myJson.error;
      } else {
        error.innerHTML = '';
        console.log('Done updating status');
        window.location = '/pages/admin';
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
