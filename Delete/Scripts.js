async function searchProfile() {
    const id = document.getElementById('profileId').value;

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
            document.getElementById('deleteButton').style.display = 'block';
        } else {
            responseMessage.textContent = `Profile not found: ${data.message || 'Unknown error'}`;
            document.getElementById('deleteButton').style.display = 'none';
        }
    } catch (error) {
        console.error('Error searching profile:', error);
        document.getElementById('responseMessage').textContent = 'An error occurred while searching for the profile.';
        document.getElementById('deleteButton').style.display = 'none';
    }
}

function confirmDelete() {
    document.getElementById('confirmationMessage').style.display = 'block';
}

function cancelDelete() {
    document.getElementById('confirmationMessage').style.display = 'none';
}

async function deleteProfile() {
    const id = document.getElementById('profileId').value;

    try {
        const response = await fetch(`https://00051.glitch.me/api/delete/${id}`, {
            method: 'DELETE'
        });

        const data = await response.json();
        const responseMessage = document.getElementById('responseMessage');

        if (response.ok) {
            responseMessage.textContent = `Profile with ID ${id} deleted successfully.`;
        } else {
            responseMessage.textContent = `Failed to delete profile: ${data.message || 'Unknown error'}`;
        }
    } catch (error) {
        console.error('Error deleting profile:', error);
        document.getElementById('responseMessage').textContent = 'An error occurred while deleting the profile.';
    }

    document.getElementById('confirmationMessage').style.display = 'none';
    document.getElementById('deleteButton').style.display = 'none';
}
