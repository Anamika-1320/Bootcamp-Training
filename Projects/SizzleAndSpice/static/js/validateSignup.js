document.addEventListener("DOMContentLoaded", function () {
    main();
});

function validateMobile() {
    const mobileInput = document.getElementById('mobile');
    const mobileHelp = document.getElementById('mobileHelp');
    const mobile = mobileInput.value;

    if (mobile.length === 0) {
        mobileHelp.textContent = 'We\'ll never share your number with anyone else.';
        mobileHelp.classList.remove("text-danger");
        mobileHelp.style.remove("opacity");
    } else if (mobile.length !== 10) {
        mobileHelp.textContent = 'Mobile number should be exactly 10 digits long.';
        mobileHelp.style.opacity = 1;
        mobileHelp.classList.add("form-text", "text-danger");
    } else {
        mobileHelp.textContent = 'We\'ll never share your number with anyone else.';
        mobileHelp.classList.remove("text-danger");
        mobileHelp.style.remove("opacity");
    }
}

function validateEmailDomain() {
    const emailInput = document.getElementById('email');
    const emailHelp = document.getElementById('emailHelp');
    const email = emailInput.value;
    const domain = email.split('@')[1];

    var forbiddenDomain = "sns.com";
    var emailDomain = email.split("@")[1]

    if (emailDomain === forbiddenDomain) {
        emailHelp.textContent = 'Please use your personal email.';
        emailHelp.classList.add("form-text", "text-danger");
        emailHelp.style.opacity = 1;
    } else {
        emailHelp.textContent = 'We\'ll never share your email with anyone else.';
        emailHelp.classList.remove("text-danger");
        emailHelp.style.remove("opacity");
    }
}

function validateEmail() {
    const emailInput = document.getElementById('email');
    const emailHelp = document.getElementById('emailHelp');
    const email = emailInput.value;

    fetch('/validate-signup-email', {
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
            } else {
                emailHelp.textContent = 'We\'ll never share your email with anyone else.';
                emailHelp.classList.remove("text-danger");
                emailHelp.style.remove("opacity");
            }
        })
        .catch(error => {
            console.log('Internal server error.');
        });
}

function validatePassword() {
    const passwordInput = document.getElementById('password');
    const passwordHelp = document.getElementById('passwordHelp');
    const password = passwordInput.value;

    if (password.length < 8 && password.length > 0) {
        passwordHelp.textContent = 'Password should be at least 8 characters long.';
        passwordHelp.classList.add("form-text", "text-danger");
        emailHelp.style.opacity = 1;
    } else {
        passwordHelp.textContent = '';
    }
}

function validateConfirmPassword() {
    const passwordInput = document.getElementById('password');
    const password = passwordInput.value;
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const confirmPasswordHelp = document.getElementById('confirmPasswordHelp');
    const confirmPassword = confirmPasswordInput.value;
    const signupButton = document.getElementById('submit');

    if (password.length === 0 || confirmPassword.length === 0) {
        confirmPasswordHelp.textContent = '';

    } else if (password !== confirmPassword) {
        confirmPasswordHelp.classList.remove("text-success");
        confirmPasswordHelp.classList.add("form-text", "text-danger");
        confirmPasswordHelp.style.opacity = 1;
        confirmPasswordHelp.textContent = 'Passwords do not match.';
        signupButton.setAttribute('disabled', 'disabled');
    } else {
        confirmPasswordHelp.classList.remove("text-danger");
        confirmPasswordHelp.classList.add("form-text", "text-success");
        confirmPasswordHelp.style.opacity = 1;
        confirmPasswordHelp.textContent = 'Passwords match.';
        signupButton.removeAttribute('disabled');
    }
}

function togglePasswordVisibility(inputId) {
    const passwordInput = document.getElementById(inputId);
    const icon = passwordInput.nextElementSibling.querySelector("i");

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
    } else {
        passwordInput.type = "password";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
    }
}

function main() {
    document.getElementById("email").addEventListener("input", validateEmailDomain);
    document.getElementById("email").addEventListener("blur", validateEmail);
    document.getElementById("mobile").addEventListener("blur", validateMobile);
    document.getElementById("password").addEventListener("blur", validatePassword);
    document.getElementById("confirmPassword").addEventListener("input", validateConfirmPassword);

    const requiredInputs = document.querySelectorAll('input[required]');
    const signupButton = document.getElementById('submit');

    signupButton.addEventListener('click', function (event) {
        let anyFieldMissing = false;

        requiredInputs.forEach(input => {
            if (!input.value) {
                anyFieldMissing = true;
                input.style.border = '1px solid red';
            } else {
                input.style.border = '';
            }
        });

        if (anyFieldMissing) {
            event.preventDefault();
            alert('Please fill in all required fields.');
        }

        requiredInputs.forEach(input => {
            input.addEventListener('input', function () {
                input.style.border = '';
            });

            input.addEventListener('focus', function () {
                input.style.border = '';
            });
        });
    });
}
