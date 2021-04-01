
//Making the map and tiles
const mymap = L.map('map').setView([0, 0], 1);
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tileURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
const tiles = L.tileLayer(tileURL, { attribution });
tiles.addTo(mymap);

getData();
async function getData() {
    const response = await fetch('/api');
    const data = await response.json();

    for (item of data) {

        const marker = L.marker([item.lat, item.lon]).addTo(mymap);

        const txt = `The weather here at ${item.lat}&deg;, ${item.lon}&deg; is ${item.weather.weather[0].description} with a temperature of ${item.weather.temp}&deg;C.
        The Air Quality at the nearest station: ${item.air.data.city.name} is ${item.air.data.aqi}, last read at ${new Date(item.air.data.time.s).toLocaleString()}.`;

        marker.bindPopup(txt);
    }
    console.log(data);
}