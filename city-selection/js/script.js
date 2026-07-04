/**
 * WeatherSphere: City Selection Logic
 */

// City Data Mapping
const stateToCities = {
    // India
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem", "Trichy"],
    "Kerala": ["Kochi", "Trivandrum", "Kozhikode", "Thrissur"],
    "Karnataka": ["Bangalore", "Mysore", "Hubli", "Mangalore"],
    "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik"],
    "Delhi": ["New Delhi", "North Delhi", "South Delhi"],
    "Telangana": ["Hyderabad", "Warangal", "Nizamabad"],
    "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur"],
    "Gujarat": ["Ahmedabad", "Surat", "Vadodara"],

    // USA
    "California": ["Los Angeles", "San Francisco", "San Diego", "Sacramento"],
    "New York": ["New York City", "Buffalo", "Rochester", "Yonkers"],
    "Texas": ["Houston", "Austin", "Dallas", "San Antonio"],
    "Florida": ["Miami", "Orlando", "Tampa", "Jacksonville"],
    
    // UK
    "England": ["London", "Manchester", "Birmingham", "Liverpool", "Bristol"],
    "Scotland": ["Glasgow", "Edinburgh", "Aberdeen", "Dundee"],

    // Japan
    "Tokyo": ["Shinjuku", "Shibuya", "Minato", "Chuo"],
    "Osaka": ["Osaka City", "Sakai", "Higashiosaka"],

    // Australia
    "New South Wales": ["Sydney", "Newcastle", "Wollongong"],
    "Victoria": ["Melbourne", "Geelong", "Ballarat"],

    // Canada
    "Ontario": ["Toronto", "Ottawa", "Hamilton", "Mississauga"],
    "Quebec": ["Montreal", "Quebec City", "Laval"],

    // Germany
    "Bavaria": ["Munich", "Nuremberg", "Augsburg", "Regensburg"],
    "Berlin": ["Berlin City", "Pankow", "Spandau"]
};

// DOM Elements
const cityGrid = document.getElementById('cityGrid');
const overlay = document.getElementById('loadingOverlay');
const backBtn = document.getElementById('backBtn');
const locationContext = document.getElementById('locationContext');

function init() {
    // 1. Get State and Country context from localStorage
    const selectedState = localStorage.getItem("selectedState") || "Tamil Nadu";
    const selectedCountry = localStorage.getItem("selectedCountry") || "India";

    // 2. Update Header UI
    locationContext.textContent = `${selectedState}, ${selectedCountry}`;

    // 3. Get cities for the selected state
    const cities = stateToCities[selectedState] || stateToCities["Tamil Nadu"];

    // 4. Dynamically create City Cards
    cities.forEach((city, index) => {
        const card = document.createElement('div');
        card.className = 'city-card glass';
        card.style.animationDelay = `${index * 0.05}s`;

        card.innerHTML = `
            <div class="city-info">
                <span class="city-tag">City</span>
                <span class="city-name">${city}</span>
            </div>
            <div class="city-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18M9 21V9a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v12M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"/></svg>
            </div>
        `;

        card.addEventListener('click', (e) => handleCitySelection(card, city, e));
        cityGrid.appendChild(card);
    });
}

/**
 * Handle Selection Interaction
 */
function handleCitySelection(card, cityName, event) {
    createRipple(card, event);

    // Save selection
    localStorage.setItem("selectedCity", cityName);

    // Visual feedback
    document.querySelectorAll('.city-card').forEach(c => c.style.opacity = '0.5');
    card.style.opacity = '1';
    card.style.borderColor = 'var(--accent-cyan)';

    // Show Loader
    setTimeout(() => {
        overlay.classList.remove('hidden');
    }, 400);

    // Final Navigation to Weather Dashboard
    setTimeout(() => {
        window.location.href = "../weather-dashboard/index.html";
    }, 2500);
}

/**
 * Ripple Helper
 */
function createRipple(card, event) {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    const rect = card.getBoundingClientRect();
    ripple.style.left = `${event.clientX - rect.left}px`;
    ripple.style.top = `${event.clientY - rect.top}px`;
    card.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
}

// Back Button Navigation
backBtn.addEventListener('click', () => {
    window.location.href = "../state-selection/index.html";
});

// Run
document.addEventListener('DOMContentLoaded', init);