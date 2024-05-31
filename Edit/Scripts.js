async function searchProfile() {
    const id = document.getElementById('profileIdSearch').value;

    try {
        const response = await fetch(`https://00051.glitch.me/api/get/${id}`);
        const data = await response.json();

        const responseMessage = document.getElementById('responseMessage');
        if (response.ok) {
            responseMessage.innerHTML = `<h3>Profile found:</h3>
                                         <div class="profile-pic-container"><img src="${data.userLogo}" alt="User Logo"></div>
                                         <h2>${data.username}</h2>
                                         <p>Email: ${data.email}</p>
                                         <p>Discord Server: <a href="${data.discordLink}" target="_blank">${data.discordLink}</a></p>`;
            document.getElementById('editProfileForm').style.display = 'block';

            document.getElementById('username').value = data.username;
            document.getElementById('userLogo').value = data.userLogo;
            document.getElementById('email').value = data.email;
            document.getElementById('discordLink').value = data.discordLink;
        } else {
            responseMessage.textContent = `Profile not found: ${data.message || 'Unknown error'}`;
            document.getElementById('editProfileForm').style.display = 'none';
        }
    } catch (error) {
        console.error('Error searching profile:', error);
        document.getElementById('responseMessage').textContent = 'An error occurred while searching for the profile.';
        document.getElementById('editProfileForm').style.display = 'none';
    }
}

let changes = {};

function confirmEdit() {
    const username = document.getElementById('username').value;
    const userLogo = document.getElementById('userLogo').value;
    const email = document.getElementById('email').value;
    const discordLink = document.getElementById('discordLink').value;

    if (username) changes.username = username;
    if (userLogo) changes.userLogo = userLogo;
    if (email) changes.email = email;
    if (discordLink) changes.discordLink = discordLink;

    if (Object.keys(changes).length > 0) {
        document.getElementById('confirmationMessage').style.display = 'block';
    } else {
        alert('No changes to save.');
    }
}

function cancelEdit() {
    document.getElementById('confirmationMessage').style.display = 'none';
    changes = {};
}

async function saveChanges() {
    const id = document.getElementById('profileIdSearch').value;

    try {
        const response = await fetch(`https://00051.glitch.me/api/edit/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(changes)
        });

        const data = await response.json();
        const responseMessage = document.getElementById('responseMessage');
        if (response.ok) {
            responseMessage.innerHTML = `<h3>Profile updated successfully!</h3>
                                         <div class="profile-pic-container"><img src="${changes.userLogo || data.userLogo}" alt="User Logo"></div>
                                         <H2>${changes.username || data.username}</H2>
                                         <p>Email: ${changes.email || data.email}</p>
                                         <p>Discord Server: <a href="${changes.discordLink || data.discordLink}" target="_blank">${changes.discordLink || data.discordLink}</a></p>`;
        } else {
            responseMessage.textContent = `Failed to update profile: ${data.message || 'Unknown error'}`;
        }
    } catch (error) {
        console.error('Error updating profile:', error);
        document.getElementById('responseMessage').textContent = 'An error occurred while updating the profile.';
    }

    document.getElementById('confirmationMessage').style.display = 'none';
    changes = {};
}