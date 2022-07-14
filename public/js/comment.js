async function comment(event) {
    event.preventDefault();

    const comment_text = document.querySelector('.comment_text').value;
    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    if (comment_text) {
        const response = await fetch('/api/comment', {
            method: 'POST',
            body: JSON.stringify({
                comment_text,
                post_id,
            }),
            headers: {
                'Content-Type': 'applications/json'
            }
        });
        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('.comment').addEventListener('submit', comment);