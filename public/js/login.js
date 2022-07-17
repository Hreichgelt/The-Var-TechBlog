
const login = async (event) => {
    event.preventDefault();

    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (email && password) {
        const response = await fetch('/api/user/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) { alert('Logged in!');
            document.location.replace('/');
        } else {
            alert('Failed, please try again.')
        }
    }
}

async function register(event) {
    event.preventDefault();
    const username = document.querySelector('#username-register').value.trim();
    const email = document.querySelector('#email-register').value.trim();
    const password = document.querySelector('#password-register').value.trim();
    if (username && email && password) {
        const response = await fetch('/api/user', {
            method: 'POST', 
            body: JSON.stringify({
                username,
                email, 
                password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            alert('Profile registered');
            document.location.replace('/createPost');
        } else {
            alert(response.statusText)
        }
    }
}

document.querySelector('.login').addEventListener('click', login);
document.querySelector('.register').addEventListener('click', register);

