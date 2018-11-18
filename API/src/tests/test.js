
import chai from 'chai';
import chaiHttp from "chai-http";
import app from "../app"; 


const should = chai.should(); 

chai.use(chaiHttp);

describe('/POST parcel',()=>{
	it('It should add a parcel in parcels',(done)=>{
		let parcel ={
						"origin":"Kabarore",
						"destination":"Muramba",
						"userId":3,
						"weight":0.3
					};
		chai.request(app).post('/api/v1/parcels').send(parcel).end((error,res)=>{
			res.should.have.status(200);
			res.body.should.be.a('object');
			res.body.should.have.property('price').eql('30Rwf');
			});	
			done();
	});
	it('It should display an eror message',(done)=>{
		let parcel ={	"origin":"Matambi",			
						"destination":"Muramba",
						"userId":3,
						"weight":"aira"
					};
		chai.request(app).post('/api/v1/parcels').send(parcel).end((error,res)=>{
			res.should.have.status(200);
			res.body.should.be.a('object');
			res.body.should.have.property('message').eql('the order should have origin, destination, userId, and weight of type number fields');
			});	
			done();
	});
});


describe('/GET parcels ',()=>{
	it("it should return an order with a given id",(done)=>{
		let id ='1'; 
		chai.request(app).get('/api/v1/parcels/'+id).end((error,res)=>{
			res.should.have.status(200);
			res.body.should.have.property("origin");
			res.body.should.be.a('object'); 
			done();
		});

	});
	it("it should return all orders created ",(done)=>{
		chai.request(app).get('/api/v1/parcels').end((error,res)=>{
			res.should.have.status(200);			
			res.body.should.be.a('array'); 
			done();
		});
	});

	it("it should return orders by a user id",(done)=>{
		let id ='1'; 
		chai.request(app).get(`/api/v1/users/${id}/parcels`).end((error,res)=>{
			res.should.have.status(200);
			res.body.should.be.a('array'); 
			done();
		});

	});
});


describe("/PUT to cancel order",()=>{
	it("It should delete a user with id ",(done)=>{
		let id ="1";
		chai.request(app).put(`/api/v1/parcels/${id}/cancel`).end((error,res)=>{
			res.should.have.status(200);
			res.body.should.be.a('object');
			done();
		});
	});

	
	it("It should delete a user with id ",(done)=>{
		let id ="nnn";
		chai.request(app).put(`/api/v1/parcels/${id}/cancel`).end((error,res)=>{
			res.should.have.status(200);
			res.body.should.be.a('object');
			res.body.should.have.property('message').eql("There is no parcel with that Id");
			done();
		});
	});
});