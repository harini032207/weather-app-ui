/**
 * WeatherSphere: City Selection Logic
 * Updated: Mapping for missing states & Back button fix
 */

// Comprehensive City Data Mapping
const stateToCities = {
    // India
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem", "Tiruchirappalli"],
    "Kerala": ["Kochi", "Thiruvananthapuram", "Kozhikode", "Thrissur"],
    "Karnataka": ["Bengaluru", "Mysuru", "Mangaluru", "Hubballi"],
    "Maharashtra": ["Mumbai", "Pune", "Nagpur"],
    "Gujarat": ["Ahmedabad", "Surat", "Vadodara"],
    "Telangana": ["Hyderabad", "Warangal", "Nizamabad"],
    "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur"],
    "Delhi": ["New Delhi", "North Delhi", "South Delhi"],

    // United States
    "California": ["Los Angeles", "San Francisco", "San Diego", "Sacramento"],
    "Texas": ["Houston", "Dallas", "Austin", "San Antonio"],
    "Florida": ["Miami", "Orlando", "Tampa"],
    "New York": ["New York City", "Buffalo", "Rochester"],
    "Nevada": ["Las Vegas", "Reno", "Henderson", "Carson City"],
    "Illinois": ["Chicago", "Aurora", "Joliet", "Naperville"],
    "Washington": ["Seattle", "Spokane", "Tacoma", "Bellevue"],

    // United Kingdom
    "England": ["London", "Manchester", "Birmingham", "Liverpool"],
    "Scotland": ["Glasgow", "Edinburgh", "Aberdeen"],
    "Wales": ["Cardiff", "Swansea"],
    "Northern Ireland": ["Belfast", "Derry"],

    // Japan
    "Tokyo": ["Shinjuku", "Shibuya", "Minato"],
    "Osaka": ["Osaka City", "Sakai"],
    "Kyoto": ["Kyoto"],
    "Hokkaido": ["Sapporo"],
    "Okinawa": ["Naha", "Okinawa City", "Uruma"],

    // Australia
    "New South Wales": ["Sydney", "Newcastle"],
    "Victoria": ["Melbourne", "Geelong"],
    "Queensland": ["Brisbane", "Gold Coast"],
    "Western Australia": ["Perth"],
    "Tasmania": ["Hobart", "Launceston", "Devonport"],

    // Canada
    "Ontario": ["Toronto", "Ottawa"],
    "Quebec": ["Montreal", "Quebec City"],
    "British Columbia": ["Vancouver", "Victoria"],
    "Alberta": ["Calgary", "Edmonton"],

    // Germany
    "Bavaria": ["Munich", "Nuremberg"],
    "Berlin": ["Berlin"],
    "Hamburg": ["Hamburg"],
    "Hesse": ["Frankfurt"],
    "Saxony": ["Dresden", "Leipzig", "Chemnitz"]
};

// DOM Elements
const cityGrid = document.getElementById('cityGrid');
const overlay = document.getElementById('loadingOverlay');
const backBtn = document.getElementById('backBtn');
const locationContext = document.getElementById('locationContext');

/**
 * Initialize Page Logic
 */
function init() {
    // 1. Read context from localStorage (with trimming for safety)
    const selectedState = (localStorage.getItem("selectedState") || "Tamil Nadu").trim();
    const selectedCountry = (localStorage.getItem("selectedCountry") || "India").trim();

    // 2. Update Header UI
    if (locationContext) {
        locationContext.textContent = `${selectedState}, ${selectedCountry}`;
    }

    // 3. Retrieve cities for the specific selected state
    const cities = stateToCities[selectedState];

    // 4. Generate Cards
    if (cities) {
        renderCityCards(cities);
    } else {
        // Fallback to Tamil Nadu if mapping is missing
        console.warn(`Mapping missing for state: ${selectedState}. Defaulting to Tamil Nadu.`);
        renderCityCards(stateToCities["Tamil Nadu"]);
    }
}

/**
 * Renders city cards into the grid
 */
function renderCityCards(cityList) {
    cityGrid.innerHTML = ""; // Clear existing
    cityList.forEach((city, index) => {
        const card = document.createElement('div');
        card.className = 'city-card glass';
        card.style.animationDelay = `${index * 0.05}s`;

        card.innerHTML = `
            <div class="city-info">
                <span class="city-tag">City</span>
                <span class="city-name">${city}</span>
            </div>
            <div class="city-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M3 21h18M9 21V9a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v12M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"/>
                </svg>
            </div>
        `;

        card.addEventListener('click', (e) => handleSelection(card, city, e));
        cityGrid.appendChild(card);
    });
}

/**
 * Handle Card Click
 */
function handleSelection(card, cityName, event) {
    createRipple(card, event);
    
    // Save to localStorage
    localStorage.setItem("selectedCity", cityName);

    // Visual feedback
    document.querySelectorAll('.city-card').forEach(c => c.style.opacity = '0.3');
    card.style.opacity = '1';
    card.style.borderColor = 'var(--accent-cyan)';

    // Show Loader
    setTimeout(() => {
        if (overlay) overlay.classList.remove('hidden');
    }, 400);

    // Navigate
    setTimeout(() => {
        window.location.href = "../weather-dashboard/index.html";
    }, 2500);
}

/**
 * Premium Ripple Animation
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

// Fixed Back Button Navigation
if (backBtn) {
    backBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = "../state-selection/index.html";
    });
}

// Run Initialization
document.addEventListener('DOMContentLoaded', init);