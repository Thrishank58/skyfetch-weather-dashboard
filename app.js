function WeatherApp(apiKey) {
    this.apiKey = apiKey;

    this.cityInput = document.getElementById("cityInput");
    this.searchBtn = document.getElementById("searchBtn");
    this.themeToggle = document.getElementById("themeToggle");

    this.cityEl = document.getElementById("city");
    this.tempEl = document.getElementById("temperature");
    this.descEl = document.getElementById("description");
    this.iconEl = document.getElementById("weather-icon");

    this.feelsLikeEl = document.getElementById("feelsLike");
    this.humidityEl = document.getElementById("humidity");
    this.windEl = document.getElementById("wind");
    this.uvEl = document.getElementById("uv");

    this.unitToggle = document.getElementById("unitToggle");

    this.hourlyContainer = document.getElementById("hourly-container");
    this.forecastContainer = document.getElementById("forecast-container");

    this.loading = document.getElementById("loading");

    this.isCelsius = true;
    this.chart = null;

    this.init();
}

WeatherApp.prototype.init = function () {

    this.searchBtn.addEventListener("click", () => {
        const city = this.cityInput.value.trim();
        if (city) this.fetchWeather(city);
    });

    this.cityInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            const city = this.cityInput.value.trim();
            if (city) this.fetchWeather(city);
        }
    });

    this.unitToggle.addEventListener("click", () => {
        this.isCelsius = !this.isCelsius;
        this.unitToggle.textContent = this.isCelsius ? "Switch °F" : "Switch °C";

        const currentCity = this.cityEl.textContent;
        if (currentCity && currentCity !== "Loading...") {
            this.fetchWeather(currentCity);
        }
    });

    // Auto-detect location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
            this.fetchWeather(`${pos.coords.latitude},${pos.coords.longitude}`);
        });
    }
};

WeatherApp.prototype.fetchWeather = function (city) {

    this.loading.style.display = "block";

    const url =
        `https://api.weatherapi.com/v1/forecast.json?key=${this.apiKey}&q=${city}&days=5&aqi=no&alerts=no`;

    fetch(url)
        .then(res => res.json())
        .then(data => {

            if (data.error) throw new Error(data.error.message);

            this.renderCurrent(data);
            this.renderHourly(data);
            this.renderForecast(data);
            this.renderChart(data);
            this.updateBackground(data);

            // Save offline
            localStorage.setItem("offlineWeather", JSON.stringify(data));
        })
        .catch(() => {
            // Offline fallback
            const cached = localStorage.getItem("offlineWeather");
            if (cached) {
                const data = JSON.parse(cached);
                this.renderCurrent(data);
                this.renderHourly(data);
                this.renderForecast(data);
                this.renderChart(data);
            }
        })
        .finally(() => {
            this.loading.style.display = "none";
        });
};

WeatherApp.prototype.renderCurrent = function (data) {

    this.cityEl.textContent = data.location.name;

    const temp = this.isCelsius
        ? data.current.temp_c
        : data.current.temp_f;

    const feels = this.isCelsius
        ? data.current.feelslike_c
        : data.current.feelslike_f;

    this.tempEl.textContent =
        `Temperature: ${temp}°${this.isCelsius ? "C" : "F"}`;

    this.feelsLikeEl.textContent =
        `Feels Like: ${feels}°${this.isCelsius ? "C" : "F"}`;

    this.humidityEl.textContent =
        `Humidity: ${data.current.humidity}%`;

    this.windEl.textContent =
        `Wind: ${data.current.wind_kph} kph`;

    this.uvEl.textContent =
        `UV Index: ${data.current.uv}`;

    this.descEl.textContent = data.current.condition.text;

    this.iconEl.src = "https:" + data.current.condition.icon;
};

WeatherApp.prototype.renderHourly = function (data) {

    this.hourlyContainer.innerHTML = "";

    const hours = data.forecast.forecastday[0].hour;

    hours.slice(0, 12).forEach(hour => {

        const temp = this.isCelsius
            ? hour.temp_c
            : hour.temp_f;

        const div = document.createElement("div");
        div.className = "hour-card";

        div.innerHTML = `
            <p>${hour.time.split(" ")[1]}</p>
            <img src="https:${hour.condition.icon}">
            <p>${temp}°</p>
        `;

        this.hourlyContainer.appendChild(div);
    });
};

WeatherApp.prototype.renderForecast = function (data) {

    this.forecastContainer.innerHTML = "";

    data.forecast.forecastday.forEach(day => {

        const avgTemp = this.isCelsius
            ? day.day.avgtemp_c
            : day.day.avgtemp_f;

        const card = document.createElement("div");
        card.className = "forecast-card";

        card.innerHTML = `
            <h4>${new Date(day.date).toLocaleDateString("en-US",{weekday:"short"})}</h4>
            <img src="https:${day.day.condition.icon}">
            <p>${avgTemp}°${this.isCelsius ? "C" : "F"}</p>
        `;

        this.forecastContainer.appendChild(card);
    });
};

WeatherApp.prototype.renderChart = function (data) {

    const ctx = document.getElementById("tempChart");

    const labels = data.forecast.forecastday.map(day =>
        new Date(day.date).toLocaleDateString("en-US",{weekday:"short"})
    );

    const temps = data.forecast.forecastday.map(day =>
        this.isCelsius ? day.day.avgtemp_c : day.day.avgtemp_f
    );

    if (this.chart) this.chart.destroy();

    this.chart = new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: "Avg Temp",
                data: temps,
                borderColor: "white",
                backgroundColor: "rgba(255,255,255,0.2)",
                tension: 0.4
            }]
        },
        options: {
            plugins: { legend: { display: false } },
            scales: {
                x: { ticks: { color: "white" } },
                y: { ticks: { color: "white" } }
            }
        }
    });
};

WeatherApp.prototype.updateBackground = function (data) {

    const condition = data.current.condition.text.toLowerCase();
    document.body.className = "";

    if (condition.includes("rain")) document.body.classList.add("rain");
    else if (condition.includes("cloud")) document.body.classList.add("cloud");
    else if (condition.includes("snow")) document.body.classList.add("snow");
    else if (condition.includes("clear")) document.body.classList.add("clear");

    const hour = parseInt(data.location.localtime.split(" ")[1].split(":")[0]);

    if (hour < 6 || hour > 18) {
        document.body.classList.add("night");
    }
};

 part-4-storage-deployment
new WeatherApp("bff26fa81a5e4b58b3091024262602");

WeatherApp.prototype.resetUI = function() {
    this.errorMsg.textContent = "";
    this.forecastContainer.innerHTML = "";
    this.iconEl.style.display = "none";
};

 part-4-storage-deployment
// ⚠️ Replace with placeholder before pushing
new WeatherApp("bff26fa81a5e4b58b3091024262602");
new WeatherApp("YOUR_REAL_API_KEY_HERE");
main
 main
