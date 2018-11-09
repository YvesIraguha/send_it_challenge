const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require('./app');
const should = chai.should(); 

chai.use(chaiHttp); 

describe('/GET parcels',()=>{
	it('It should get all parcels',(done)=>{
		chai.request(app).get('/api/v1/parcels').end((err,res)=>{
			res.should.have.status(200)			
			done(); 

		});
	});
});


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
		});	done();
	});
});


describe('/GET parcel by Id',()=>{
	it("it should return an order with given id",(done)=>{
		let id ='1'; 
		chai.request(app).get('/api/v1/parcels/'+id).end((error,res)=>{
			res.should.have.status(200);
			res.body.should.have.property("origin");
			res.body.should.be.a('object'); 
			done();
		});

	});
});