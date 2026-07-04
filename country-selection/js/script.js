/**
 * WeatherSphere: Country Selection Logic
 */

const countries = [
    { name: "India", flag: "🇮🇳", icon: "☀️" },
    { name: "United States", flag: "🇺🇸", icon: "☁️" },
    { name: "United Kingdom", flag: "🇬🇧", icon: "🌧️" },
    { name: "Japan", flag: "🇯🇵", icon: "🌸" },
    { name: "Australia", flag: "🇦🇺", icon: "☀️" },
    { name: "Canada", flag: "🇨🇦", icon: "❄️" },
    { name: "Germany", flag: "🇩🇪", icon: "⛅" }
];

const grid = document.getElementById('countryGrid');
const overlay = document.getElementById('loadingOverlay');
// Back Button
const backBtn = document.querySelector(".back-btn");

if (backBtn) {
    backBtn.addEventListener("click", () => {
        window.location.href = "../landing-page/index.html";
    });
}

// Initialize Grid
function init() {
    countries.forEach(country => {
        const card = document.createElement('div');
        card.className = 'country-card glass';
        card.innerHTML = `
            <div class="flag">${country.flag}</div>
            <div class="country-name">${country.name}</div>
            <div class="weather-indicator">${country.icon}</div>
        `;

        card.addEventListener('click', (e) => handleSelection(card, e));
        grid.appendChild(card);
    });
}

/**
 * Handle Country Click Interaction
 */
function handleSelection(selectedCard, event) {
    // Add this inside handleSelection in country-selection/js/script.js
    localStorage.setItem("selectedCountry", selectedCard.querySelector('.country-name').innerText);
    window.location.href = "../state-selection/index.html"; // In the navigation phase
    // 1. Ripple Animation
    createRipple(selectedCard, event);

    // 2. Visual Feedback for All Cards
    const allCards = document.querySelectorAll('.country-card');
    allCards.forEach(card => {
        if (card === selectedCard) {
            card.classList.add('selected');
            card.classList.remove('dimmed');
        } else {
            card.classList.add('dimmed');
            card.classList.remove('selected');
        }
    });

    // 3. Show Loading Placeholder
    setTimeout(() => {
        overlay.classList.remove('hidden');
    }, 400);

    // Note: Navigation logic will be added in the next phase
}

/**
 * Creates a premium ripple effect at the click coordinates
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
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
    }

// Start
document.addEventListener('DOMContentLoaded', init);