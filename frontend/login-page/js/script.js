/**
 * WeatherSphere LoginPage Logic
 * Senior Frontend Implementation
 */

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const togglePasswordBtn = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    const eyeIcon = document.getElementById('eyeIcon');

    // 1. Password Visibility Toggle
    togglePasswordBtn.addEventListener('click', () => {
        const isPassword = passwordInput.getAttribute('type') === 'password';
        
        // Toggle type
        passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
        
        // Toggle Icon
        eyeIcon.classList.toggle('fa-eye');
        eyeIcon.classList.toggle('fa-eye-slash');
        
        // Add a nice focus effect
        passwordInput.focus();
    });

    // 2. Form Submission
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Basic Frontend Validation
        const email = document.getElementById('email').value;
        const password = passwordInput.value;

        if (!email || !password) {
            alert("Please fill in all fields");
            return;
        }

        // Trigger Login Logic
        loginUser();
    });
});

/**
 * Placeholder for standard login
 * Backend integration will be implemented later with FastAPI
 */
function loginUser() {
    const loginBtn = document.querySelector('.btn-primary');
    
    // UI Feedback
    loginBtn.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> Authenticating...`;
    loginBtn.style.opacity = '0.7';
    loginBtn.style.pointerEvents = 'none';

    setTimeout(() => {
        console.log("Standard login placeholder triggered.");
        window.location.href = "../landing-Page/index.html";
    }, 1500);
}

/**
 * Placeholder for Google OAuth
 * Google Auth will be implemented later using FastAPI
 */
function loginWithGoogle() {
    const googleBtn = document.querySelector('.btn-google');
    
    // UI Feedback
    googleBtn.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> Connecting Google...`;
    googleBtn.style.opacity = '0.7';
    googleBtn.style.pointerEvents = 'none';

    setTimeout(() => {
        console.log("Google login placeholder triggered.");
        window.location.href = "../landing-Page/index.html";
    }, 1500);
}