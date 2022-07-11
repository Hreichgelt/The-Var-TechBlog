// const { json } = require("sequelize/types");

async function register(event) {
    event.preventDefault();
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (username && email && password) {
        const response = await fetch('/api/user', {
            method: 'post', 
            body: json.stringify({
                username,
                email, 
                password
            }),
            Headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            alert('Profile registered');
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText)
        }
    }
}
document.querySelector('.register').addEventListener('submit', register);