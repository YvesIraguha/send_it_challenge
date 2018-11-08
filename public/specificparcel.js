
//The ability to select particular parcel 
let specificParcel= document.getElementById("specificParcel"); 

specificParcel.onsubmit = function(){
     let parcelId = document.getElementById("parcelId").value;
     specificParcel.action = `/api/v1/parcels/${parcelId}`;
};
