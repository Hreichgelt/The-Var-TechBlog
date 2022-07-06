async function update(event) {
    event.preventDefault();

    let username = $('input[name="user-name"]').val.trim();
    if (username.length) username = '"username": "' + username + '"';
    let email = $('input[name="email"]').val.trim();
    if (email.length) email = '"email": "' + email + '"';
    let password = $('input[name="password"]').val.trim();
    if (password.length) {
        alert('Please enter password to complete changes.');
        return;
    } else {
        password = '"password": "' + password + '"';
    }
    const id = $('input[name="user-id"]').value;

    let userUpdate = '{' + [username, email, password].filter(value => value).join(',') + '}';
    userUpdate = JSON.parse(userUpdate)

    const response = await fetch('/api/user/${id}', {
        method: 'PUT',
        body: JSON.stringify(userUpdate),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

$('.update-user-form').addEventListener('submit', update);