async function post(event) {
    event.preventDefault();
    const title = $('input[name="post-title"]').value;
    const post_text = $('textarea[name="post-text"]').value;

    const response = await fetch('/api/post', {
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
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

$('.new-post-form').addEventListener('submit', post);