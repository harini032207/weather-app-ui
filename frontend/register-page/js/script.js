/**
 * WeatherSphere Registration Logic
 * Senior Frontend Implementation
 */

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registerForm');
    const submitBtn = document.getElementById('submitBtn');
    
    // Form Inputs
    const fields = {
        fullName: document.getElementById('fullName'),
        email: document.getElementById('email'),
        password: document.getElementById('password'),
        confirmPassword: document.getElementById('confirmPassword'),
        terms: document.getElementById('terms')
    };

    // 1. Validation Logic
    const validate = {
        email: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
        password: (val) => val.length >= 8,
        match: (val1, val2) => val1 === val2 && val1 !== ""
    };

    const updateUI = (fieldId, isValid) => {
        const group = fields[fieldId].closest('.input-group');
        if (isValid || fields[fieldId].value === "") {
            group.classList.remove('error');
        } else {
            group.classList.add('error');
        }
    };

    const checkFormValidity = () => {
        const isNameValid = fields.fullName.value.trim() !== "";
        const isEmailValid = validate.email(fields.email.value);
        const isPassValid = validate.password(fields.password.value);
        const isMatchValid = validate.match(fields.password.value, fields.confirmPassword.value);
        const isTermsAccepted = fields.terms.checked;

        submitBtn.disabled = !(isNameValid && isEmailValid && isPassValid && isMatchValid && isTermsAccepted);
    };

    // 2. Event Listeners for Real-time Validation
    Object.keys(fields).forEach(key => {
        fields[key].addEventListener('input', () => {
            if (key === 'email') updateUI('email', validate.email(fields.email.value));
            if (key === 'password') updateUI('password', validate.password(fields.password.value));
            if (key === 'confirmPassword') updateUI('confirmPassword', validate.match(fields.password.value, fields.confirmPassword.value));
            
            checkFormValidity();
        });
    });

    fields.terms.addEventListener('change', checkFormValidity);

    // 3. Password Visibility Toggles
    document.querySelectorAll('.toggle-password').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            const input = document.getElementById(targetId);
            const icon = btn.querySelector('.toggle-icon');
            
            const isPassword = input.getAttribute('type') === 'password';
            input.setAttribute('type', isPassword ? 'text' : 'password');
            
            icon.classList.toggle('fa-eye');
            icon.classList.toggle('fa-eye-slash');
        });
    });

    // 4. Form Submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        handleRegister();
    });
});

/**
 * Placeholder for Registration Backend Integration
 */
async function registerUser() {

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();

    if (!username || !email || !password || !confirmPassword) {
        alert("Please fill all fields.");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    const button = document.getElementById("submitBtn");
    button.disabled = true;
    button.innerHTML = "Creating Account...";

    try {

        const response = await fetch("http://127.0.0.1:8000/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password
            })
        });

        const data = await response.json();

        if (response.ok) {

            alert("Registration Successful!");

            window.location.href = "../login-page/index.html";

        } else {

            alert(data.detail || "Registration failed");

        }

    } catch (error) {

        console.error(error);
        alert("Cannot connect to backend.");

    }

    button.disabled = false;
    button.innerHTML = `
        <span>Create Account</span>
        <i class="fa-solid fa-user-plus"></i>
    `;
}
function registerWithGoogle() {
    console.log("Redirecting to Google OAuth...");
     window.location.href = "http://127.0.0.1:8000/auth/google/register";
}
