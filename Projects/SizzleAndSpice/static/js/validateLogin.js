document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("email").addEventListener("change", validateEmail);
    document.getElementById("password").addEventListener("change", validatePassword);
});

function validateEmail() {
    const emailInput = document.getElementById('email');
    const emailHelp = document.getElementById('emailHelp');
    const signupButton = document.getElementById('submit');
    const email = emailInput.value;
    emailHelp.textContent = '';
    signupButton.removeAttribute('disabled');

    fetch('/validate-login-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email }),
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'error') {
                emailHelp.textContent = data.message;
                emailHelp.classList.add("form-text", "text-danger");
                emailHelp.style.opacity = 1;
                signupButton.setAttribute('disabled', 'disabled');
            }
        })
        .catch(error => {
            console.log('Internal server error.');
        });
}

function validatePassword() {
    const emailInput = document.getElementById('email');
    const emailHelp = document.getElementById('emailHelp');
    const email = emailInput.value;
    const passwordInput = document.getElementById('password');
    const passwordHelp = document.getElementById('passwordHelp');
    const signupButton = document.getElementById('submit');
    signupButton.removeAttribute('disabled');
    const password = passwordInput.value;
    passwordHelp.textContent = '';

    fetch('/validate-login-password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password }),
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'error') {
                passwordHelp.textContent = data.message;
                passwordHelp.classList.add("form-text", "text-danger");
                passwordHelp.style.opacity = 1;
                signupButton.setAttribute('disabled', 'disabled');
            }
        })
        .catch(error => {
            console.log('Internal server error.');
        });
}