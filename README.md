 part-4-storage-deployment
# skyfetch-weather-dashboard
Waether forcast webpage
## Part 2 – User Interaction Implemented
## Part 3 – OOP Forecast Implementation
- Refactored using WeatherApp constructor
- Added 5-day forecast
- Used Promise.all

# 🌦️ SkyFetch Weather Dashboard

SkyFetch is a fully interactive weather dashboard built using JavaScript.  
The application allows users to search for any city, view current weather conditions, see a 5-day forecast, and store recent searches using localStorage.  

The project was developed progressively using modern JavaScript concepts including OOP, prototypal inheritance, Promise handling, and deployment workflows.

---

## 🚀 Live Demo

🔗 Live Deployment: (Add your Vercel URL here)

---

## 📌 Features

### 🔎 City Search
- Search weather by entering a city name
- Supports Enter key and button click
- Displays user-friendly error messages

### 🌤 Current Weather
- City name
- Temperature (°C)
- Weather description
- Weather icon

### 📅 5-Day Forecast
- Forecast cards for 5 days
- Displays:
  - Day name
  - Average temperature
  - Condition icon
  - Description
- Data fetched using Promise.all()

### 💾 Data Persistence (localStorage)
- Stores last searched city
- Displays recent searches (up to 5)
- Recent searches are clickable
- Automatically reloads last searched city on refresh

### ⚡ Loading & UX
- Loading indicator while fetching data
- Disabled search button during API calls
- Clean and responsive UI

---

## 🛠 Tech Stack

- HTML5
- CSS3
- JavaScript (ES6)
- Prototypal Inheritance (Constructor Functions)
- Promise.all()
- Fetch API
- localStorage
- Git & GitHub Workflow
- Vercel Deployment

---

## 🧠 Architecture

The application is structured using a single constructor:

```javascript
function WeatherApp(apiKey)

All functionality is organized into prototype methods:

init()

handleSearch()

fetchWeather()

renderCurrent()

renderForecast()

saveCity()

loadRecentSearches()

loadLastCity()

This structure ensures scalability and clean separation of concerns.

📂 Project Structure
skyfetch-weather-dashboard/
│
├── index.html
├── style.css
├── app.js
└── README.md
🔄 Development Workflow

The project was developed in multiple parts using Git branches:

part-1-api-integration

part-2-user-interaction

part-3-oop-forecast

part-4-storage-deployment

Each feature set was implemented in a separate branch and merged via Pull Requests.

🌍 Deployment

The application is deployed using Vercel.

Deployment includes:

Public live URL

Production build

Fully functional API integration

🧪 Testing

Valid and invalid city search tested

Forecast rendering verified

localStorage functionality validated

Console checked for errors

Deployed version tested against local version

📈 Learning Outcomes

Through this project, I practiced:

Object-Oriented JavaScript

Asynchronous programming

Promise handling

DOM manipulation

Error handling

Data persistence

Real-world deployment workflow

Professional GitHub branching strategy

👨‍💻 Author

Thrishank
Aspiring AI & Full-Stack Developer 🚀


---

# 🎯 After Adding This

1. Replace your current README.md with this.
2. Add your Vercel URL.
3. Commit:

```bash
git add README.md
git commit -m "Updated README with full project documentation"
git push origin part-4-storage-deployment
 main
