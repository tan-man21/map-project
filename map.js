window.onload = async () => {
    const coords = await getCoords();
    let map = await L.map('map').setView(coords, 13)

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

//Adding a Marker to indicate user location
let marker = L.marker(coords).addTo(map).bindPopup('You are here!');

// Fetching Local Restaurants
function getRestaurants (){
    const options = {
        method: 'GET',
        headers: {
        accept: 'application/json',
        Authorization: 'fsq3mWIUw5lI9kr5aXW1Ta/ESQSIq7sPBWWIewtV2jLNPF4='
        }
    };
    
    fetch(`https://api.foursquare.com/v3/places/search?query=restaurants&ll=${coords}&radius=5000&limit=5`, options)
        .then(response => response.json())
        .then(response => console.log(response))
};
getRestaurants();

//Fetching Local Coffee Shops
function getCoffee (){
    const options = {
        method: 'GET',
        headers: {
        accept: 'application/json',
        Authorization: 'fsq3mWIUw5lI9kr5aXW1Ta/ESQSIq7sPBWWIewtV2jLNPF4='
        }
    };
    
    fetch(`https://api.foursquare.com/v3/places/search?query=coffee&ll=&${coords}radius=5000&limit=5`, options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
};
getCoffee();

//Fetch Local Hotels
function getHotels (){
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'fsq3mWIUw5lI9kr5aXW1Ta/ESQSIq7sPBWWIewtV2jLNPF4='
        }
      };
      
      fetch(`https://api.foursquare.com/v3/places/search?query=hotels&ll=${coords}&radius=5000&limit=5`, options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
};
getHotels();

//Fetch Local Markets
function getMarkets(){
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'fsq3mWIUw5lI9kr5aXW1Ta/ESQSIq7sPBWWIewtV2jLNPF4='
        }
      };
      
      fetch(`https://api.foursquare.com/v3/places/search?query=market&ll=${coords}&radius=5000&limit=5`, options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err)); 
};
getMarkets();
};
