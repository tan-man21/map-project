window.onload = async () => {
    const coords = await getCoords();
    let map = await L.map('map').setView(coords, 13)

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

//Adding a Marker to indicate user location
let marker = L.marker(coords).addTo(map).bindPopup('You are here!');
};

//Adding Markers to indicate Businesses

