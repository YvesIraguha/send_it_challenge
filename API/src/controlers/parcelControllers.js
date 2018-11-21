import Parcel from '../models/parcel';

const controllers = {};
// declare the variable to store orders.
const orders = [];

// fetch a parcel
const fetchParcelById = (req, res) => {
  const parcelId = parseInt(req.params.id);
  const parcel = orders.find(order => order.id === parcelId);
  // send it.
  if (parcel) {
    res.status(200).send(parcel);
  } else {
    // send the error page
    res.send({ message: 'Ooops! no order with that id' });
  }
};

// create parcel
const createParcel = (req, res) => {
  const {
    name, origin, destination, weight, userId,
  } = req.body;
  const existingOrder = orders.find(order => order.name === name);
  if (existingOrder === undefined) {
    const id = orders.length + 1;
    const fieldsValidation = /[a-zA-Z]+/;
    if (!origin || !name || !destination || !userId || !weight ) {
      res.send({ message: 'Please provide all the required fields' });
    } else if (isNaN(weight)) {
      res.send({ message: 'Invalid weight, the weight should be number' });
    } else if (!fieldsValidation.test(name)) {
      res.send({ message: 'Invalid name, the name should start with a letter' });
    } else if (!fieldsValidation.test(origin)) {
      res.send({ message: 'Invalid origin, the origin should be a place' });
    } else if (!fieldsValidation.test(destination)) {
      res.send({ message: 'Invalid destination, the destination should be a place' });
    } else {
      const order = new Parcel(id, name, origin, destination, weight, userId);
      orders.push(order);
      res.status(201).send({ message: 'The order was successfully created', order });
    }
  } else {
    res.send({ message: 'Cannot create two orders with the same name' });
  }
};

// Fetch a delivery order by a user.
const deliveryOrdersByUser = (req, res) => {
  const userId = parseInt(req.params.id);
  // find the order where the owner is equal to the email
  const specificOrders = orders.filter(item => item.userId === userId);
  if (specificOrders) {
    res.send(specificOrders);
  } else {
    // Redirect to error page
    res.send({ message: 'There is no order of the user you specified' });
  }
};

// fetch all delivery orders
const fetchAllDeliveryOrders = (req, res) => {
  res.send(orders);
};

// cancel a delivery order
const cancelDeliveryOrder = (req, res) => {
  const parcelId = parseInt(req.params.id);
  const parcel = orders.find(order => order.id === parcelId);
  if (parcel) {
    orders.splice(orders.indexOf(parcel), 1);
    parcel.status = 'Cancelled';
    orders.push(parcel);
    res.send({ message: 'Order successfully cancelled', parcel });
  } else {
    res.send({ message: 'Invalid Id' });
  }
};

controllers.fetchParcelById = fetchParcelById;
controllers.fetchAllDeliveryOrders = fetchAllDeliveryOrders;
controllers.cancelDeliveryOrder = cancelDeliveryOrder;
controllers.createParcel = createParcel;
controllers.deliveryOrdersByUser = deliveryOrdersByUser;


export default controllers;
