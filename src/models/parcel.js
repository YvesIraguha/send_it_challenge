// Class for defining a parcel model
class Parcel {
  constructor(id, name, origin, destination, weight, userId) {
    this.id = id;
    this.name = name;
    this.origin = origin;
    this.destination = destination;
    this.weight = weight;
    this.userId = userId;
    this.setPrice();
    this.setCreationDate();
  }

  setPrice() {
    if (Number(this.weight)) {
      return (this.price = parseFloat(this.weight) * 100);
    }
    return (this.price = 0);
  }

  setCreationDate() {
    const currentDate = new Date();
    const date = currentDate.getDate();
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const dateString = `${year}-${month + 1}-${date}`;
    return (this.created_at = dateString);
  }
}

export default Parcel;
