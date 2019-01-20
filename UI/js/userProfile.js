const signout = document.querySelector('#signout');
const create = document.querySelector('#create');

signout.onclick = function () {
  localStorage.clear();
  window.location = '/pages';
};

create.onclick = function () {
  window.location = '/pages/create';
};
// define a function that will fetch information from database
function displayParcels(url) {
  // includes the codes for connecting to the server to consume API
  const displayParcel = document.querySelector('.parcels-display');
  const table = displayParcel.firstElementChild.firstElementChild;
  const username = localStorage.getItem('username');
  if (username !== undefined) {
    // Set the name of the user on the profile.
    const usernamefield = document.querySelector('.user-name');
    usernamefield.innerHTML = username;
  }
  fetch(url, {
    method: 'GET',
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
        let totalParcels = 0;
        let delivered = 0;
        let inTransit = 0;
        let notDelivered = 0;

        for (let i = 0; i < myJson.length; i++) {
          const row = document.createElement('tr');
          row.innerHTML = `   <td class="id">${myJson[i].id}</td>
                                    <td>${myJson[i].created_at}</td>
                                    <td>${myJson[i].name}</td>
                                    <td>${myJson[i].origin}</td>
                                    <td>${myJson[i].destination}</td>		
                                    <td>${myJson[i].weight}</td>
                                    <td>${myJson[i].price}</td>
                                    <td>${myJson[i].presentlocation}</td>
                                    <td>${myJson[i].status}</td>
                                    <td><button class="btn btn-edit">Edit</button></td>  	
                                `;
          table.appendChild(row);
        }
        const modal = document.getElementById('parcel-modal');
        const btns = document.getElementsByClassName('btn-edit');


        for (const btn of btns) {
          totalParcels++;
          if (btn.parentElement.parentNode.children[7].innerHTML === 'Intransit') {
            inTransit++;
          } else if (btn.parentElement.parentNode.children[7].innerHTML === 'Delivered') {
            delivered++;
          } else {
            notDelivered++;
          }
          // display the modal onclick
          btn.onclick = function () {
            const name = document.querySelector('.input-name');
            const origin = document.querySelector('.input-origin');
            const destination = document.querySelector('.input-destination');
            const weight = document.querySelector('.input-weight');
            const id = document.querySelector('.input-id');
            id.value = btn.parentElement.parentNode.children[0].innerHTML;
            name.value = btn.parentElement.parentNode.children[1].innerHTML;
            origin.value = btn.parentElement.parentNode.children[2].innerHTML;
            destination.value = btn.parentElement.parentNode.children[3].innerHTML;
            weight.value = btn.parentElement.parentNode.children[4].innerHTML;
            modal.style.display = 'block';
          };
        }

        const totalDelivered = document.getElementById('total-delivered');
        totalDelivered.innerHTML = delivered;
        const totalinTransit = document.getElementById('total-in-transit');
        totalinTransit.innerHTML = inTransit;
        const totalnotDelivered = document.getElementById('total-not-delivered');
        totalnotDelivered.innerHTML = notDelivered;
        const totalDeliveries = document.getElementById('total-deliveries');
        totalDeliveries.innerHTML = totalParcels;
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
const id = localStorage.getItem('userid');
let url;
window.onload = () => {
  if (id != undefined) {
    url = `/api/v1/users/${id}/parcels`;
  } else {
    window.location = '/pages/signup';
  }
  displayParcels(url);
};

// Filter data based on their status.
const alldeliveries = document.querySelector('#icon1');
const delivered = document.querySelector('#icon3');
const intransit = document.querySelector('#icon2');
const notdelivered = document.querySelector('#icon4');

alldeliveries.onclick = () => {
  if (id != undefined) {
    url = `/api/v1/users/${id}/parcels`;
  } else {
    window.location = '/pages/signup';
  }
  displayParcels(url);
};

delivered.onclick = () => {
  if (id != undefined) {
    url = `/api/v1/users/${id}/parcels/?status=delivered`;
  } else {
    window.location = '/pages/signup';
  }
  displayParcels(url);
};

intransit.onclick = () => {
  if (id != undefined) {
    url = `/api/v1/users/${id}/parcels/?status=intransit`;
  } else {
    window.location = '/pages/signup';
  }
  displayParcels(url);
};
notdelivered.onclick = () => {
  if (id != undefined) {
    url = `/api/v1/users/${id}/parcels/?status=notdelivered`;
  } else {
    window.location = '/pages/signup';
  }
  displayParcels(url);
};
