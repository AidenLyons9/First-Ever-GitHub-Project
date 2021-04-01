if ('geolocation' in navigator) {
    console.log('geolocation is available!')
    navigator.geolocation.getCurrentPosition(async position => {
        let lat, lon, weather, air;
        try {
        lat = position.coords.latitude;
        lon = position.coords.longitude;

        document.getElementById('lat').textContent = lat.toFixed(2);
        document.getElementById('lon').textContent = lon.toFixed(2);

        const api_url = `weather/${lat},${lon}`;
        const response = await fetch(api_url);
        const json = await response.json();
        weather = json.weather.current;
        air = json.air_quality;

        document.getElementById('summary').textContent = weather.weather[0].description;
        document.getElementById('temperature').textContent = weather.temp;
        document.getElementById('station').textContent = air.data.city.name;
        document.getElementById('aqi').textContent = air.data.aqi;
        document.getElementById('time').textContent = new Date(air.data.time.s).toLocaleString();

        } catch(error) {
            air = { value: -1 };
            console.log('something went wrong');
        }

        const data = { lat, lon, weather, air };
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        const db_response = await fetch('/api', options);
        const db_json = await db_response.json();
        console.log(db_json);

    });

} else {
    console.log('geolocation not available!')
}
