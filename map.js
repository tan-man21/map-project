window.onload = async () => {
    const coords = await getCoords();
    let map = await L.map('map').setView(coords, 13)

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

//Adding a Marker to indicate user location
let marker = L.marker(coords).addTo(map).bindPopup('You are here!');

// const businessCoords = await saveSelection();
// function addMarkers(){
//     coordinates.forEach((element) => {
//         let marker = L.marker(element).addTo(map)
//     })
// }
// if(businessCoords){
//     addMarkers();
// }else{
//     console.log('did not work')
// }
};

//Adding Markers to indicate Businesses

