class user {
    fname: string;
    lname: string;
    mob: number;
    email: string;
    pass: string;
}

const form = document.getElementById('signupform') as HTMLFormElement;
const u: user = new user();
var isLoggedIn = 'false';
form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    u.fname = formData.get('fname') as string;
    u.lname = formData.get('lname') as string;
    u.mob = Number(formData.get('mob') as string);
    u.email = formData.get('email') as string;
    u.pass = formData.get('pass') as string;

    // Use the retrieved form values
    console.log('User details received.');
    alert('Hi ' + u.fname + '!');
    window.location.href = 'foodies.html';
});
