document.addEventListener('DOMContentLoaded', () => {
    const bottomMembersContainer = document.getElementById('bottomMembers');
    // Supposons que votre fichier members.json est à la racine de votre site ou dans un dossier 'data'
    // Si votre fichier JSON est sur GitHub, utilisez l'URL "raw" :
    // Exemple: 'https://raw.githubusercontent.com/VotreUtilisateur/VotreRepo/main/members.json'
    const membersDataUrl = 'members.json'; // Ou l'URL raw de votre fichier GitHub

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

                // Utilisation de Template Literals (ES6) pour construire le HTML de manière propre
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
            // Vous pouvez afficher un message d'erreur à l'utilisateur ici
            bottomMembersContainer.innerHTML = "<p style='color: red; text-align: center;'>Impossible de charger les membres pour le moment. Veuillez réessayer plus tard.</p>";
        });
});
