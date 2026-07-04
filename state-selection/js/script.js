/**
 * WeatherSphere: State Selection Logic
 */

// Comprehensive Data Object
const countryData = {
    "India": ["Tamil Nadu", "Kerala", "Karnataka", "Telangana", "Andhra Pradesh", "Delhi", "Maharashtra", "Gujarat"],
    "United States": ["California", "Texas", "Florida", "New York", "Washington", "Illinois", "Nevada"],
    "United Kingdom": ["England", "Scotland", "Wales", "Northern Ireland"],
    "Japan": ["Tokyo", "Osaka", "Kyoto", "Hokkaido", "Okinawa"],
    "Australia": ["New South Wales", "Victoria", "Queensland", "Tasmania", "Western Australia"],
    "Canada": ["Ontario", "Quebec", "British Columbia", "Alberta"],
    "Germany": ["Bavaria", "Berlin", "Hamburg", "Hesse", "Saxony"]
};

// DOM Elements
const stateGrid = document.getElementById('stateGrid');
const overlay = document.getElementById('loadingOverlay');
const backBtn = document.getElementById('backBtn');
const countryDisplay = document.getElementById('selectedCountryDisplay');

// Initialize Page
function init() {
    // 1. Get selected country from localStorage (Integration with Country Page)
    // To integrate, ensure Country Selection page does: localStorage.setItem("selectedCountry", countryName);
    const selectedCountry = localStorage.getItem("selectedCountry") || "India";
    
    // 2. Update UI Header
    countryDisplay.textContent = `Region: ${selectedCountry}`;

    // 3. Get states for the selected country
    const states = countryData[selectedCountry] || countryData["India"];

    // 4. Generate Cards
    states.forEach((state, index) => {
        const card = document.createElement('div');
        card.className = 'state-card glass';
        card.style.animationDelay = `${index * 0.05}s`; // Staggered entrance
        
        card.innerHTML = `
            <div class="loc-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            </div>
            <div class="state-name">${state}</div>
        `;

        card.addEventListener('click', (e) => handleStateSelection(card, state, e));
        stateGrid.appendChild(card);
    });
}

/**
 * Handle Selection Interaction
 */
function handleStateSelection(card, stateName, event) {
    // Premium Ripple Effect
    createRipple(card, event);

    // Visual Selection
    document.querySelectorAll('.state-card').forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');

    // Store state for next page
    localStorage.setItem("selectedState", stateName);

    // Show Loading Overlay
    setTimeout(() => {
        overlay.classList.remove('hidden');
    }, 400);

    // Navigate to City Selection
    setTimeout(() => {
        window.location.href = "../city-selection/index.html";
    }, 2400);
}

/**
 * Ripple Effect Helper
 */
function createRipple(card, event) {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    
    card.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}

// Back Button Navigation
backBtn.addEventListener('click', () => {
    window.location.href = "../country-selection/index.html";
});

// Run Init
document.addEventListener('DOMContentLoaded', init);