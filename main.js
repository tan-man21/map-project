//Main Goals: 
//1 - Obtain User's Current Location
//2 - Map the Location on Leaflet
//3 - User should be able to select a business type from a list and map 5 nearest locations on the map using Foursquare API

//Get User's Current Location
async function getCoords(){
    pos = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
    return [pos.coords.latitude, pos.coords.longitude]
}

console.log(getCoords())

//Select Business Type
function saveSelection(){
    selectBusiness = document.getElementById('businesses');
    output = selectBusiness.value;
    alert(output)
}
