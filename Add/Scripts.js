async function postData() {
    const username = document.getElementById('username').value;
    const userLogo = document.getElementById('userLogo').value;
    const email = document.getElementById('email').value;
    const discordLink = document.getElementById('discordLink').value;
    const responseMessage = document.getElementById('responseMessage');

    try {
        const response = await fetch(`https://00051.glitch.me/api/add/${username}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                userLogo,
                email,
                discordLink
            })
        });

        const data = await response.json();

        if (response.ok) {
            responseMessage.innerHTML = `
                <h3>Profile added successfully!</h3>
                <div class="profile-pic-container">
                    <img src="${userLogo}" alt="User Logo">
                </div>
                <h2>${username}</h2>
                <p>Email: ${email}</p>
                <p>Discord Server: <a href="${discordLink}" target="_blank">${discordLink}</a></p>
            `;
        } else {
            responseMessage.textContent = `Failed to add profile: ${message || 'Unknown error'}`;
        }
    } catch (error) {
        console.error('Error adding profile:', error);
        responseMessage.textContent = 'An error occurred while adding the profile.';
    }
}
