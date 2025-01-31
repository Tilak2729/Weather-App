async function fetchWeather() {
    const cityInput = document.getElementById('cityInput');
    const city = cityInput.value || document.getElementById('quickSearch').value;

    if (!city) {
        alert("Please enter a city name!");
        return;
    }

    const weatherUrl = `https://api.weatherapi.com/v1/current.json?key=8e57ac581d594690a2c51849253101&q=${city}&aqi=yes`;

    try {
        const weatherResponse = await fetch(weatherUrl);
        if (!weatherResponse.ok) throw new Error("Weather data not available");
        const weatherData = await weatherResponse.json();

        document.getElementById('cityName').innerText = weatherData.location.name || "N/A";
        document.getElementById('temperature').innerText = weatherData.current.temp_c ?? "N/A";
        document.getElementById('humidity').innerText = weatherData.current.humidity ?? "N/A";
        document.getElementById('windSpeed').innerText = weatherData.current.wind_kph ?? "N/A";
        document.getElementById('cloudCover').innerText = weatherData.current.cloud ?? "N/A";
        document.getElementById('airQuality').innerText = weatherData.current.air_quality?.pm2_5 ?? "N/A";

    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("Could not fetch weather data. Please try again.");
    }
}

// Add event listener for Enter key press
document.getElementById('cityInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent form submission
        fetchWeather();
    }
});

// Trigger weather search when dropdown is changed
document.getElementById('quickSearch').addEventListener('change', fetchWeather);



