async function login(event){
    event.preventDefault();

    const email = $('#email-login').val.trim();
    const password = $('#password-login').val.trim();

    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                email, 
                password
            })
            headers: { 'Content-Type': 'application.json' }
        });
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            let result = await response.json()
            alert(result.message)
        }
    }
}
$('.login-form').addEventListener('submit', login);