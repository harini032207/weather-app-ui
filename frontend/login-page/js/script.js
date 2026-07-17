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
async function loginUser() {
    const loginBtn = document.querySelector(".btn-primary");

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    loginBtn.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> Authenticating...`;
    loginBtn.disabled = true;

    try {
        const formData = new URLSearchParams();
        formData.append("username", email);
        formData.append("password", password);

        const response = await fetch("http://127.0.0.1:8000/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: formData,
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem("access_token", data.access_token);

            alert("Login Successful!");

            window.location.href = "../landing-Page/index.html";
        } else {
            alert(data.detail || "Login Failed");
        }
    } catch (error) {
        console.error(error);
        alert("Cannot connect to backend.");
    }

    loginBtn.innerHTML = `
        <span>Sign In</span>
        <i class="fa-solid fa-arrow-right"></i>
    `;
    loginBtn.disabled = false;
}
/**
 * Placeholder for Google OAuth
 * Google Auth will be implemented later using FastAPI
 */
function loginWithGoogle() {
    window.location.href =
        "http://127.0.0.1:8000/auth/google/login";
}