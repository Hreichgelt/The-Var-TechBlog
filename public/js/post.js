async function post(event) {
    event.preventDefault();
    const title = document.querySelector('#post-title').value;
    const post_text = document.querySelector('#post_text').value;

    const response = await fetch(`/api/post`, {
        method: 'POST', 
        body: JSON.stringify({
            title,
            post_text
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.new-post-form').addEventListener('submit', post);