//Class for defining a parcel model
class Parcel {
	constructor(id,name,origin, destination, weight, userId){
		this.id = id;
		this.name = name;
		this.origin =origin;
		this.destination = destination;
		this.weight = weight;
		this.userId=userId;
	    this.setPrice();
	}
	setPrice(){
		if(typeof this.weight === "number"){
			return this.price = parseFloat(this.weight)*100;
		}else{
			return this.price = 0; 
		}
	}
}


export default Parcel; 