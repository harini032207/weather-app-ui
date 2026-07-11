/**
 * WeatherSphere: Live Dashboard Logic
 */

const API_KEY = "33088e142247f462e72f159666777045"; // Replace with your actual OpenWeatherMap API Key

// DOM Elements
const currentCity = document.getElementById('currentCity');
const currentDate = document.getElementById('currentDate');
const temperature = document.getElementById('temperature');
const weatherDesc = document.getElementById('weatherDesc');
const weatherIcon = document.getElementById('weatherIcon');
const tempMax = document.getElementById('tempMax');
const tempMin = document.getElementById('tempMin');
const humidity = document.getElementById('humidity');
const humidityBar = document.getElementById('humidityBar');
const windSpeed = document.getElementById('windSpeed');
const pressure = document.getElementById('pressure');
const visibility = document.getElementById('visibility');
const forecastList = document.getElementById('forecastList');
const citySearch = document.getElementById('citySearch');

/**
 * Initialize Dashboard
 */
async function init() {
    // 1. Get city from selection flow
    const selectedCity = localStorage.getItem("selectedCity") || "Chennai";
    
    // 2. Set Today's Date
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    currentDate.textContent = new Date().toLocaleDateString('en-US', options);

    // 3. Fetch Data
    fetchWeatherData(selectedCity);
}

/**
 * Fetch Data from API
 */
async function fetchWeatherData(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        );
        
        if (!response.ok) throw new Error("City not found");
        
        const data = await response.json();
        updateUI(data);
        fetchForecast(city);
    } catch (error) {
        currentCity.textContent = "City Not Found";
        console.error(error);
    }
}

/**
 * Update UI with Current Weather
 */
function updateUI(data) {
    currentCity.textContent = data.name;
    temperature.textContent = Math.round(data.main.temp);
    weatherDesc.textContent = data.weather[0].description;
    tempMax.textContent = `${Math.round(data.main.temp_max)}°`;
    tempMin.textContent = `${Math.round(data.main.temp_min)}°`;
    
    humidity.textContent = `${data.main.humidity}%`;
    humidityBar.style.width = `${data.main.humidity}%`;
    
    windSpeed.textContent = `${data.wind.speed} km/h`;
    pressure.textContent = `${data.main.pressure} hPa`;
    visibility.textContent = `${(data.visibility / 1000).toFixed(1)} km`;

    // Weather Icon
    const iconCode = data.weather[0].icon;
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
}

/**
 * Fetch 5 Day Forecast
 */
async function fetchForecast(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
        );
        const data = await response.json();
        
        forecastList.innerHTML = "";
        
        // API returns data every 3 hours, we take one per day (every 8th index)
        for (let i = 0; i < data.list.length; i += 8) {
            const dayData = data.list[i];
            const date = new Date(dayData.dt * 1000);
            const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });

            const item = document.createElement('div');
            item.className = 'forecast-item';
            item.innerHTML = `
                <div class="forecast-day">${dayName}</div>
                <img src="https://openweathermap.org/img/wn/${dayData.weather[0].icon}.png" class="forecast-icon">
                <div class="forecast-temp">${Math.round(dayData.main.temp)}°C</div>
            `;
            forecastList.appendChild(item);
        }
    } catch (error) {
        console.error("Forecast Error:", error);
    }
}

/**
 * Search Event
 */
citySearch.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && citySearch.value.trim() !== "") {
        fetchWeatherData(citySearch.value.trim());
        citySearch.value = "";
    }
});

// Navigation Back
document.getElementById('changeLocation').addEventListener('click', () => {
    window.location.href = "../country-selection/index.html";
});

// Run
document.addEventListener('DOMContentLoaded', init);

const homeBtn = document.getElementById("homeBtn");

if (homeBtn) {
    homeBtn.addEventListener("click", () => {
        window.location.href = "../Landing-Page/index.html";
    });
}