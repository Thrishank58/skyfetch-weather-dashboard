function WeatherApp(apiKey) {
    this.apiKey = apiKey;

    this.cityInput = document.getElementById("cityInput");
    this.searchBtn = document.getElementById("searchBtn");

    this.cityEl = document.getElementById("city");
    this.tempEl = document.getElementById("temperature");
    this.descEl = document.getElementById("description");
    this.iconEl = document.getElementById("weather-icon");

    this.loading = document.getElementById("loading");
    this.errorMsg = document.getElementById("errorMsg");
    this.forecastContainer = document.getElementById("forecast-container");

    this.init();
}

WeatherApp.prototype.init = function() {
    this.searchBtn.addEventListener("click", this.handleSearch.bind(this));
    this.cityInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") this.handleSearch();
    });
};

WeatherApp.prototype.handleSearch = function() {
    const city = this.cityInput.value.trim();
    this.resetUI();

    if (!city) {
        this.errorMsg.textContent = "Please enter a city name.";
        return;
    }

    this.fetchWeather(city);
};

WeatherApp.prototype.fetchWeather = function(city) {
    this.loading.style.display = "block";
    this.searchBtn.disabled = true;

    const currentURL =
        `https://api.weatherapi.com/v1/current.json?key=${this.apiKey}&q=${city}`;

    const forecastURL =
        `https://api.weatherapi.com/v1/forecast.json?key=${this.apiKey}&q=${city}&days=5`;

    Promise.all([
        fetch(currentURL).then(res => res.json()),
        fetch(forecastURL).then(res => res.json())
    ])
    .then(([currentData, forecastData]) => {

        if (currentData.error) {
            throw new Error(currentData.error.message);
        }

        this.renderCurrent(currentData);
        this.renderForecast(forecastData);

    })
    .catch(err => {
        this.errorMsg.textContent = err.message;
    })
    .finally(() => {
        this.loading.style.display = "none";
        this.searchBtn.disabled = false;
    });
};

WeatherApp.prototype.renderCurrent = function(data) {
    this.cityEl.textContent = data.location.name;
    this.tempEl.textContent = `Temperature: ${data.current.temp_c}°C`;
    this.descEl.textContent = data.current.condition.text;

    this.iconEl.src = "https:" + data.current.condition.icon;
    this.iconEl.style.display = "block";
};

WeatherApp.prototype.renderForecast = function(data) {
    this.forecastContainer.innerHTML = "";

    data.forecast.forecastday.forEach(day => {
        const card = document.createElement("div");
        card.className = "forecast-card";

        const date = new Date(day.date);
        const dayName = date.toLocaleDateString("en-US", { weekday: "short" });

        card.innerHTML = `
            <h4>${dayName}</h4>
            <img src="https:${day.day.condition.icon}">
            <p>${day.day.avgtemp_c}°C</p>
            <p>${day.day.condition.text}</p>
        `;

        this.forecastContainer.appendChild(card);
    });
};

WeatherApp.prototype.resetUI = function() {
    this.errorMsg.textContent = "";
    this.forecastContainer.innerHTML = "";
    this.iconEl.style.display = "none";
};

new WeatherApp("YOUR_REAL_API_KEY_HERE");