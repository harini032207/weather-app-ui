// --- Data Mockup ---
const weatherData = [
    { name: "India", flag: "🇮🇳", temp: "32°C", cond: "Sunny", icon: "sun", states: ["Maharashtra", "Karnataka", "Delhi"] },
    { name: "United States", flag: "🇺🇸", temp: "18°C", cond: "Cloudy", icon: "cloud", states: ["California", "New York", "Texas"] },
    { name: "United Kingdom", flag: "🇬🇧", temp: "12°C", cond: "Rainy", icon: "cloud-rain", states: ["England", "Scotland", "Wales"] },
    { name: "Japan", flag: "🇯🇵", temp: "22°C", cond: "Clear", icon: "sun", states: ["Tokyo", "Osaka", "Hokkaido"] },
    { name: "Australia", flag: "🇦🇺", temp: "28°C", cond: "Windy", icon: "wind", states: ["NSW", "Victoria", "Queensland"] },
    { name: "Canada", flag: "🇨🇦", temp: "5°C", cond: "Snow", icon: "snowflake", states: ["Ontario", "Quebec", "BC"] },
    { name: "Germany", flag: "🇩🇪", temp: "15°C", cond: "Mist", icon: "cloud-drizzle", states: ["Bavaria", "Berlin", "Hesse"] }
];

const cityData = {
    "Maharashtra": [{ name: "Mumbai", temp: "31°C", hum: "80%", wind: "12km/h" }, { name: "Pune", temp: "28°C", hum: "60%", wind: "10km/h" }],
    "California": [{ name: "LA", temp: "24°C", hum: "40%", wind: "15km/h" }, { name: "SF", temp: "19°C", hum: "65%", wind: "20km/h" }],
    // ... add more as needed
};

// --- State Management ---
let currentState = {
    country: null,
    province: null,
    city: null
};

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    initParticles();
    setupEventListeners();
});

function initParticles() {
    const container = document.getElementById('particles-container');
    for (let i = 0; i < 50; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        const size = Math.random() * 3 + 1;
        p.style.width = `${size}px`;
        p.style.height = `${size}px`;
        p.style.left = `${Math.random() * 100}vw`;
        p.style.top = `${Math.random() * 100}vh`;
        p.style.animationDuration = `${Math.random() * 10 + 5}s`;
        container.appendChild(p);
    }
}

function setupEventListeners() {
    const globe = document.getElementById('mainGlobe');
    globe.addEventListener('click', startGlobeTransition);

    document.querySelectorAll('.back-btn').forEach(btn => {
        btn.addEventListener('click', goBack);
    });

    document.getElementById('homeBtn').addEventListener('click', () => {
        alert("Navigating to saved home city: Mumbai");
        showCityDashboard("Mumbai", "31°C", "80%", "12km/h");
    });
}

// --- Transitions ---
function startGlobeTransition() {
    const container = document.querySelector('.globe-container');
    const landing = document.getElementById('landing-page');
    
    // Animate Globe Zoom
    container.style.transform = "scale(15) rotate(90deg)";
    container.style.filter = "blur(20px)";
    landing.style.opacity = "0";

    setTimeout(() => {
        showSection('country-selection');
        renderCountries();
    }, 800);
}

function showSection(id) {
    document.querySelectorAll('.view').forEach(v => {
        v.classList.remove('active');
        v.classList.add('hidden');
    });
    const target = document.getElementById(id);
    target.classList.remove('hidden');
    target.classList.add('active');
}

function renderCountries() {
    const grid = document.getElementById('countryGrid');
    grid.innerHTML = '';
    weatherData.forEach(c => {
        const card = document.createElement('div');
        card.className = 'weather-card';
        card.innerHTML = `
            <span style="font-size: 3rem">${c.flag}</span>
            <h3>${c.name}</h3>
            <i data-lucide="${c.icon}"></i>
            <div class="card-temp">${c.temp}</div>
            <p>${c.cond}</p>
        `;
        card.onclick = () => selectCountry(c);
        grid.appendChild(card);
    });
    lucide.createIcons();
}

function selectCountry(country) {
    currentState.country = country;
    showSection('state-selection');
    renderStates(country.states);
}

function renderStates(states) {
    const grid = document.getElementById('stateGrid');
    grid.innerHTML = '';
    states.forEach(s => {
        const card = document.createElement('div');
        card.className = 'weather-card';
        card.innerHTML = `
            <h3>${s}</h3>
            <i data-lucide="map"></i>
            <div class="card-temp">--</div>
        `;
        card.onclick = () => selectState(s);
        grid.appendChild(card);
    });
    lucide.createIcons();
}

function selectState(state) {
    currentState.province = state;
    showSection('city-selection');
    renderCities(state);
}

function renderCities(state) {
    const grid = document.getElementById('cityGrid');
    grid.innerHTML = '';
    
    // Mock data for cities
    const cities = cityData[state] || [
        { name: state + " Central", temp: "24°C", hum: "50%", wind: "5km/h" },
        { name: state + " North", temp: "22°C", hum: "45%", wind: "8km/h" }
    ];

    cities.forEach(city => {
        const card = document.createElement('div');
        card.className = 'weather-card';
        card.innerHTML = `
            <h3>${city.name}</h3>
            <i data-lucide="map-pin"></i>
            <div class="card-temp">${city.temp}</div>
            <p>Humidity: ${city.hum}</p>
        `;
        card.onclick = () => showCityDashboard(city.name, city.temp, city.hum, city.wind);
        grid.appendChild(card);
    });
    lucide.createIcons();
}

function showCityDashboard(name, temp, hum, wind) {
    const dash = document.getElementById('weather-dashboard');
    dash.innerHTML = `
        <div class="section-header">
             <button class="back-btn" onclick="showSection('city-selection')"><i data-lucide="arrow-left"></i></button>
             <h2 style="font-weight: 700">${name} Forecast</h2>
        </div>
        <div class="dashboard-grid">
            <div class="weather-card main-weather-card">
                <i data-lucide="sun" style="width: 80px; height: 80px; color: #fbbf24"></i>
                <h1 style="font-size: 5rem; margin: 10px 0">${temp}</h1>
                <p style="font-size: 1.5rem">Partly Cloudy</p>
                <p style="color: var(--text-muted)">Feels like ${parseInt(temp) - 2}°C</p>
            </div>
            <div class="stat-card">
                <span class="stat-label">Humidity</span>
                <span class="stat-value">${hum}</span>
                <i data-lucide="droplets"></i>
            </div>
            <div class="stat-card">
                <span class="stat-label">Wind Speed</span>
                <span class="stat-value">${wind}</span>
                <i data-lucide="wind"></i>
            </div>
            <div class="stat-card">
                <span class="stat-label">UV Index</span>
                <span class="stat-value">4 (Medium)</span>
                <i data-lucide="sun"></i>
            </div>
            <div class="stat-card">
                <span class="stat-label">Visibility</span>
                <span class="stat-value">10 km</span>
                <i data-lucide="eye"></i>
            </div>
            <div class="stat-card" style="grid-column: span 2">
                <span class="stat-label">Air Quality Index</span>
                <span class="stat-value">42 - Excellent</span>
                <div style="height: 4px; width: 100%; background: #22c55e; border-radius: 2px; margin-top: 10px"></div>
            </div>
        </div>
    `;
    showSection('weather-dashboard');
    lucide.createIcons();
}

function goBack() {
    const current = document.querySelector('.view.active').id;
    if (current === 'state-selection') showSection('country-selection');
    if (current === 'city-selection') showSection('state-selection');
    if (current === 'weather-dashboard') showSection('city-selection');
    if (current === 'country-selection') {
        const landing = document.getElementById('landing-page');
        const globe = document.querySelector('.globe-container');
        globe.style.transform = "scale(1) rotate(0deg)";
        globe.style.filter = "none";
        showSection('landing-page');
    }
}