const { json } = require("sequelize/types");

async function register(event) {
    event.preventDefault();
    const username = $('#username-signup').val.trim();
    const email = $('#email-signup').val.trim();
    const password =$('#password-signup').val.trim();

    if (username && email && password) {
        const response = await fetch('/api/user', {
            method: 'post', 
            body: json.stringify({
                username,
                email, 
                password
            })
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
$('.register').addEventListener('submit', register);