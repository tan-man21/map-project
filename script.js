//Main Goals: 
//1 - Obtain User's Current Location
//2 - Map the Location on Leaflet
//3 - User should be able to select a business type from a list and map 5 nearest locations on the map using Foursquare API

//Getting the User's Current Location
async function getCoords(){
    let pos = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
    return [pos.coords.latitude, pos.coords.longitude]
}

//Create a user map object
const userMap = {
    coordinates: [],
    displayMap: {},
    businessObject: {},
    businessInfo: [],

    buildMap: function() {
        this.displayMap = L.map('map').setView([this.coordinates[0], this.coordinates[1]], 13);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(this.displayMap);

    //Adding a Marker to indicate user location
    L.marker([this.coordinates[0], this.coordinates[1]]).addTo(this.displayMap).bindPopup('You are here!');
    },

    //Making an array and placing markers
    getBusinessInfo: function (object){
        for(i = 0; i < object.length; i++){
            this.businessInfo[i] = ({
                name: object[i].name,
                address: object[i].location.formatted_address,
                lat: object[i].geocodes.main.latitude,
                long: object[i].geocodes.main.longitude,
            })
        }
        for(i = 0; i < this.businessInfo; i++){
            L.marker([this.businessInfo[i].lat, this.businessInfo[i].long]).addTo(this.displayMap).bindPopup(`<p>${this.businessInfo.name}</p>`)
        }
    },
}

window.onload = async () => {
    const coords = await getCoords()
    userMap.coordinates = coords
    userMap.buildMap()
}

async function getBusinessMarkers(category, latLong){
    const businessData = await getLocalInfo(category, latLong);
    userMap.businessObject = businessData
    userMap.getBusinessInfo(userMap.businessObject)
}

//ADD category selection
let selectBusiness = document.getElementById('businesses')
selectBusiness.onchange = function () {getBusinessMarkers(this.value, userMap.coordinates)}

// Fetching Local Business Info
async function getLocalInfo(category, latLong) {
    try {
    const parameters = new URLSearchParams ({
        query: category,
        ll: latLong,
        open_now: 'true',
        sort: 'DISTANCE',
        limit: 5,
    });
    const response = await fetch (`https://api.foursquare.com/v3/places/search?${parameters}`,
    {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'fsq3mWIUw5lI9kr5aXW1Ta/ESQSIq7sPBWWIewtV2jLNPF4='
        }
    });
    const data = await response.json();
    const businesses = data.results;
    return businesses
} catch (err){
    console.error(err);
}
}