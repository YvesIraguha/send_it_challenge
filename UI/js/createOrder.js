let weight = document.querySelector('.input-weight');
const button = document.querySelector('#add');
const form = document.querySelector('#form-order');
weight.oninput = () => {
  const price = document.querySelector('.input-price');
  if (Number(weight.value)) {
    price.value = parseFloat(weight.value) * 100;
  } else {
    price.value = 0;
  }
};

form.onsubmit = () => {
  const name = document.querySelector('.input-name').value;
  const origin = document.querySelector('.input-origin').value;
  const destination = document.querySelector('.input-destination').value;
  weight = document.querySelector('.input-weight').value;
  const token = localStorage.getItem('token');
  if (token != undefined) {
    const data = {
      name, origin, destination, weight,
    };
    // includes the codes for connecting to the server to consume API
    fetch('/api/v1/parcels', {
      method: 'POST',
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
          return true;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    document.write("Can't create an order without a token");
    return false;
  }
};
