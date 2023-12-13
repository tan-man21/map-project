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

//Select Business Type
function saveSelection(){
    selectBusiness = document.getElementById('businesses');
    output = selectBusiness.value;
    if(output === 'restaurant'){
        console.log(getRestaurants())
    }else if(output === 'coffee'){
        console.log(getCoffee())
    }else if(output === 'hotel'){
        console.log(getHotels)
    }else if(output === 'market'){
        console.log(getMarkets)
    }
}

// Fetching Local Restaurants
async function getRestaurants (){
    let coordinates = await getCoords()
    const options = await {
        method: 'GET',
        headers: {
        accept: 'application/json',
        Authorization: 'fsq3mWIUw5lI9kr5aXW1Ta/ESQSIq7sPBWWIewtV2jLNPF4='
        }
    };
    
    await fetch(`https://api.foursquare.com/v3/places/search?query=restaurants&ll=${coordinates}&radius=5000&limit=5`, options)
        .then(response => response.json())
        .then(data => {
            const mappedData = data.results.map(venue => ({
                name: venue.name,
                location: venue.location,
            }));
            console.log(mappedData);
            return mappedData;
        })
        .catch(err => console.error(err));
};

//Fetching Local Coffee Shops
async function getCoffee (){
    let coordinates = await getCoords()
    const options = await {
        method: 'GET',
        headers: {
        accept: 'application/json',
        Authorization: 'fsq3mWIUw5lI9kr5aXW1Ta/ESQSIq7sPBWWIewtV2jLNPF4='
        }
    };
    
    await fetch(`https://api.foursquare.com/v3/places/search?query=coffee&ll=&${coordinates}radius=5000&limit=5`, options)
        .then(response => response.json())
        .then(data => {
            const mappedData = data.results.map(venue => ({
                name: venue.name,
                location: venue.location,
            }))
            console.log(mappedData);
            return mappedData;
        })
        .catch(err => console.error(err));
};


//Fetch Local Hotels
async function getHotels (){
    let coordinates = await getCoords()
    const options = await {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'fsq3mWIUw5lI9kr5aXW1Ta/ESQSIq7sPBWWIewtV2jLNPF4='
        }
      };
      
      await fetch(`https://api.foursquare.com/v3/places/search?query=hotels&ll=${coordinates}&radius=5000&limit=5`, options)
        .then(response => response.json())
        .then(data => {
            const mappedData = data.results.map(venue => ({
                name: venue.name,
                location: venue.location,
            }))
            console.log(mappedData);
            return mappedData;
        })
        .catch(err => console.error(err));
};


//Fetch Local Markets
async function getMarkets(){
    let coordinates = await getCoords()
    const options = await {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'fsq3mWIUw5lI9kr5aXW1Ta/ESQSIq7sPBWWIewtV2jLNPF4='
        }
      };
      
      await fetch(`https://api.foursquare.com/v3/places/search?query=market&ll=${coordinates}&radius=5000&limit=5`, options)
        .then(response => response.json())
        .then(data => {
            const mappedData = data.results.map(venue => ({
                name: venue.name,
                location: venue.location,
            }))
            console.log(mappedData);
            return mappedData;
        })
        .catch(err => console.error(err));
};


//Creating Array of Business Objects
