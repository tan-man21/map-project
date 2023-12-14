//Main Goals: 
//1 - Obtain User's Current Location
//2 - Map the Location on Leaflet
//3 - User should be able to select a business type from a list and map 5 nearest locations on the map using Foursquare API
let coordinates = []

//Get User's Current Location
async function getCoords(){
    pos = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
    return [pos.coords.latitude, pos.coords.longitude]
}

//Select Business Type
async function saveSelection(){
    selectBusiness = document.getElementById('businesses');
    output = selectBusiness.value;
    let result;
    if(output === 'restaurant'){
        result = await getRestaurants()
    }else if(output === 'coffee'){
        result = await getCoffee()
    }else if(output === 'hotel'){
        result = await getHotels()
    }else if(output === 'market'){
        result = getMarkets()
    }

    const newArray = result.results.map(item => ({
        itemName: item.name,
        itemLocation: item.location,
        itemPoint: item.geocodes.main
    }));

    // Call getCoords and wait for its completion
    const userCoords = await getCoords();

    // Check if userCoords is not null before using it
    if (userCoords) {
        for (let i = 0; i < newArray.length; i++) {
            coordinates.push(newArray[i].itemPoint);
        }

        return coordinates
    } else {
        console.error('Failed to get user coordinates.');
    }
}
// Fetching Local Restaurants
async function getRestaurants() {
        let coordinates = await getCoords();
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'fsq3mWIUw5lI9kr5aXW1Ta/ESQSIq7sPBWWIewtV2jLNPF4='
            }
        };

        const response = await fetch(`https://api.foursquare.com/v3/places/search?query=restaurants&ll=${coordinates}&radius=5000&limit=5`, options);
        const data = await response.json();

        // Return the entire data object
        return data;
    }

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
    
    const response = await fetch(`https://api.foursquare.com/v3/places/search?query=restaurants&ll=${coordinates}&radius=5000&limit=5`, options);
        const data = await response.json();

        // Return the entire data object
        return data;
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
      
      const response = await fetch(`https://api.foursquare.com/v3/places/search?query=restaurants&ll=${coordinates}&radius=5000&limit=5`, options);
        const data = await response.json();

        // Return the entire data object
        return data;
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
      
      const response = await fetch(`https://api.foursquare.com/v3/places/search?query=restaurants&ll=${coordinates}&radius=5000&limit=5`, options);
        const data = await response.json();

        // Return the entire data object
        return data;
};