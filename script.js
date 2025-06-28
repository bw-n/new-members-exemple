document.addEventListener('DOMContentLoaded', () => {
    const bottomMembersContainer = document.getElementById('bottomMembers');
    
    // C'est cette ligne que vous devez mettre à jour
    const membersDataUrl = 'https://raw.githubusercontent.com/bw-n/new-members-featured/main/members.json'; 

    if (!bottomMembersContainer) {
        console.error("L'élément avec l'ID 'bottomMembers' n'a pas été trouvé.");
        return;
    }

    fetch(membersDataUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erreur HTTP! Statut: ${response.status}`);
            }
            return response.json();
        })
        .then(members => {
            members.forEach(member => {
                const memberBlock = document.createElement('div');
                memberBlock.classList.add('member-block');

                memberBlock.innerHTML = `
                    <div class="photo" style="background-image:url('${member.photoUrl}')"></div>
                    <strong>${member.name}</strong>
                    <span class="profession">${member.profession}</span>
                    <a href="${member.website}" target="_blank">${member.name}'s Website</a>
                    <span class="contact-email">${member.email}</span>
                    <div class="separator-line"></div>
                `;

                bottomMembersContainer.appendChild(memberBlock);
            });
        })
        .catch(error => {
            console.error("Erreur lors du chargement ou du traitement des membres :", error);
            bottomMembersContainer.innerHTML = "<p style='color: red; text-align: center;'>Impossible de charger les membres pour le moment. Veuillez réessayer plus tard.</p>";
        });
});
