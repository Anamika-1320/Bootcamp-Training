var user = /** @class */ (function () {
    function user() {
    }
    return user;
}());
var form = document.getElementById('signupform');
var u = new user();
var isLoggedIn = 'false';
form.addEventListener('submit', function (event) {
    event.preventDefault();
    var formData = new FormData(form);
    u.fname = formData.get('fname');
    u.lname = formData.get('lname');
    u.mob = Number(formData.get('mob'));
    u.email = formData.get('email');
    u.pass = formData.get('pass');
    // Use the retrieved form values
    console.log('User details received.');
    alert('Hi ' + u.fname + '!');
    window.location.href = 'foodies.html';
});
