async function getProfile() {
    const id = document.getElementById('getId').value;
    try {
        const response = await fetch(`https://00051.glitch.me/api/get/${id}`);
        const data = await response.json();
        
        console.log(data); 
        
        const profileResult = document.getElementById('profileResult');
        profileResult.innerHTML = `
            <div class="profile-pic-container">
                <img src="${data.userLogo}" alt="User Logo">
            </div>
            <h3>${data.username}</h3>
            <p>Email: ${data.email}</p>
            <p>Discord Server: <a href="${data.discordLink}" target="_blank">${data.discordLink}</a></p>
        `;

        
    } catch (error) {
        console.error('Error fetching profile:', error);
        document.getElementById('profileResult').innerText = 'Error fetching profile';
    }
}
