const apiKey = "YOUR_API_KEY";
const city = "London";

const apiURL = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

axios.get(apiURL)
    .then(function(response) {

        const cityName = response.data.location.name;
        const temperature = response.data.current.temp_c;
        const description = response.data.current.condition.text;
        const icon = response.data.current.condition.icon;

        document.getElementById("city").innerText = cityName;
        document.getElementById("temperature").innerText = `${temperature}°C`;
        document.getElementById("description").innerText = description;
        document.getElementById("weather-icon").src = "https:" + icon;

    })
    .catch(function(error) {
        console.error("Error fetching weather:", error);
        document.getElementById("city").innerText = "Error loading weather data";
    });
