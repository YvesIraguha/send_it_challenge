// define the function to handle fetching parcels from the api
function displayParcels(url) {
  // includes the codes for connecting to the server to consume API
  const displayParcel = document.querySelector('.parcels-display');
  const table = displayParcel.firstElementChild.firstElementChild;
  const token = localStorage.getItem('token');
  // console.log(token);
  const username = localStorage.getItem('username');
  if (username != undefined) {
    // Set the name of the user on the profile.
    const usernamefield = document.querySelector('.user-name');
    usernamefield.innerHTML = username;
  }

  if (token != undefined) {
    fetch(url, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        token,
      }),
    })
      .then(response => response.json())
      .then((myJson) => {
        if (myJson.error) {
          window.location = '/pages/error';
        } else {
          let totalParcels = 0;
          let delivered = 0;
          let inTransit = 0;
          let notDelivered = 0;

          for (let i = 0; i < myJson.length; i += 1) {
            const row = document.createElement('tr');
            row.innerHTML = `   <td style='display:none;'>${myJson[i].id}</td>
                                <td>${myJson[i].name}</td>
                                <td>${myJson[i].origin}</td>
                                <td>${myJson[i].destination}</td>		
                                <td>${myJson[i].weight}</td>
                                <td>${myJson[i].price}</td>
                                <td>${myJson[i].presentlocation}</td>
                                <td>${myJson[i].status}</td>
                                <td>
                                  <button class="btn btn-edit">Edit</button>
                                </td>  	
                            `;
            table.appendChild(row);
          }
          const modal = document.getElementById('parcel-modal');
          const btns = document.getElementsByClassName('btn-edit');

          for (let i = 0; i < btns.length; i += 1) {
            totalParcels += 1;
            if (btns[i].parentElement.parentNode.children[7].innerHTML === 'Intransit') {
              inTransit += 1;
            } else if (btns[i].parentElement.parentNode.children[7].innerHTML === 'Delivered') {
              delivered += 1;
            } else {
              notDelivered += 1;
            }
            // display the modal onclick
            btns[i].onclick = () => {
              const name = document.querySelector('.input-name');
              const origin = document.querySelector('.input-origin');
              const destination = document.querySelector('.input-destination');
              const weight = document.querySelector('.input-weight');
              const presentlocation = document.querySelector('.input-present-location');
              const id = document.querySelector('.input-id');
              id.value = btns[i].parentElement.parentNode.children[0].innerHTML;
              name.value = btns[i].parentElement.parentNode.children[1].innerHTML;
              origin.value = btns[i].parentElement.parentNode.children[2].innerHTML;
              destination.value = btns[i].parentElement.parentNode.children[3].innerHTML;
              weight.value = btns[i].parentElement.parentNode.children[4].innerHTML;
              presentlocation.value = btns[i].parentElement.parentNode.children[6].innerHTML;
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
  } else {
    window.location = '/pages/error';
  }
}

let url;
url = '/api/v1/parcels';
window.onload = () => {
  displayParcels(url);
};

// Filter data based on their status.
const alldeliveries = document.querySelector('#icon1');
const delivered = document.querySelector('#icon3');
const intransit = document.querySelector('#icon2');
const notdelivered = document.querySelector('#icon4');

// Selecting the div for displaying the parcels, and delete what it contains before displaying filtered parcels.
const displayParcel = document.querySelector('.parcels-display');
const table = displayParcel.firstElementChild.firstElementChild;
const statusOfParcels = document.querySelector('.parcels-status');
alldeliveries.onclick = () => {
  table.innerHTML = '';
  statusOfParcels.innerHTML = 'All deliveries';
  url = '/api/v1/parcels';
  displayParcels(url);
};

delivered.onclick = () => {
  table.innerHTML = '';
  statusOfParcels.innerHTML = 'Delivered';
  url = '/api/v1/parcels/?status=delivered';
  displayParcels(url);
};

intransit.onclick = () => {
  table.innerHTML = '';
  statusOfParcels.innerHTML = 'In transit';
  url = '/api/v1/parcels/?status=intransit';
  displayParcels(url);
};

notdelivered.onclick = () => {
  table.innerHTML = '';
  statusOfParcels.innerHTML = 'Not delivered/Cancelled';
  url = '/api/v1/parcels/?status=notdelivered';
  displayParcels(url);
};

// deal with the sign out functionality.
const signout = document.querySelector('#signout');
signout.onclick = () => {
  localStorage.clear();
  window.location = '/pages';
};
