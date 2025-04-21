const apiKey = "3e0180cb83589dc681b69e627ecf3176";
let map;

async function getWeather() {
    const city = document.getElementById("cityInput").value;
    const state = document.getElementById("stateInput").value;
    const country = document.getElementById("countryInput").value;

    if(!city || !state || !country) return;

    const urlLongLat = `https://api.openweathermap.org/geo/1.0/direct?q=${city},${state},${country}&limit=1&appid=${apiKey}`;

    try {
        const responseGeo = await fetch(urlLongLat);
        const dataGeo = await responseGeo.json();

        const lat = dataGeo[0].lat;
        const lon = dataGeo[0].lon;


        // const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=pt_br`;

        const url = `https://api.openweathermap.org/data/2.5/weather?lat=-17.0898718&lon=-50.3568574&appid=${apiKey}&units=metric&lang=pt_br`;
        const response = await fetch(url);

        const data = await response.json();

        document.getElementById("cityName").textContent = data.name;
        document.getElementById("temp").textContent = `${Math.round(data.main.temp)}°C`;
        document.getElementById("humidity").textContent = `${data.main.humidity}%`;
        document.getElementById("wind").textContent = `${data.wind.speed} km/h`;
    
        const weatherMain = data.weather[0].main.toLowerCase();
        let icon = "☀️";
        if (weatherMain.includes("clouds")) icon = "☁️";
        else if (weatherMain.includes("rain")) icon = "🌧️";
        else if (weatherMain.includes("snow")) icon = "❄️";

        document.getElementById("icon").textContent = icon;

        alert(lon+" "+lat);

        showMap(lat, lon, data.name);
    
    }catch (error) {
        alert("Erro: deu bosta " + error.message);
    }
    
}


function showMap(lat, lon, cityName) {
    if (map) {
      map.setView([lat, lon], 13);
      setTimeout(() => {
        map.invalidateSize();
      }, 100);
      L.marker([lat, lon]).addTo(map).bindPopup(cityName).openPopup();
    } else {
      map = L.map("map").setView([lat, lon], 13);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap",
      }).addTo(map);
      L.marker([lat, lon]).addTo(map).bindPopup(cityName).openPopup();
    }
  }