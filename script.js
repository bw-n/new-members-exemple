document.addEventListener('DOMContentLoaded', () => {
    console.log("Script est en cours d'exécution : DOMContentLoaded a été déclenché.");

    const topMembersContainer = document.getElementById('topMembers'); // Ciblage de la section "Membres à l'honneur"
    const bottomMembersContainer = document.getElementById('bottomMembers'); // Ciblage de la section "Nos nouveaux membres"
    
    const membersDataUrl = 'https://bw-n.github.io/new-members-featured/members.json'; // URL de GitHub Pages

    if (!topMembersContainer) {
        console.error("L'élément avec l'ID 'topMembers' n'a pas été trouvé.");
        // Pas de return ici, car bottomMembersContainer pourrait exister
    }

    if (!bottomMembersContainer) {
        console.error("L'élément avec l'ID 'bottomMembers' n'a pas été trouvé.");
        // Pas de return ici, pour que l'autre section puisse être traitée si elle existe
    }

    // Si aucun des conteneurs n'est trouvé, il n'y a rien à faire
    if (!topMembersContainer && !bottomMembersContainer) {
        console.error("Aucun des conteneurs de membres n'a été trouvé. Le script s'arrête.");
        return;
    }

    console.log("Conteneurs trouvés, tentative de récupération du JSON.");

    fetch(membersDataUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erreur HTTP! Statut: ${response.status}`);
            }
            return response.json();
        })
        .then(members => {
            console.log("Données des membres récupérées avec succès :", members);

            // Fonction pour créer un bloc de membre (réutilisable)
            const createMemberBlock = (member) => {
                const memberBlock = document.createElement('div');
                memberBlock.classList.add('member-block'); // Assurez-vous que cette classe applique votre style de grille

                // Correction de la photoUrl si elle est vide ou non valide
                const photoUrl = member.photoUrl && member.photoUrl.trim() !== '' ? member.photoUrl : 'URL_DE_VOTRE_IMAGE_PAR_DEFAUT.jpg';
                
                memberBlock.innerHTML = `
                    <div class="photo" style="background-image:url('${photoUrl}')"></div>
                    <strong>${member.name}</strong>
                    <span class="profession">${member.profession}</span>
                    <a href="${member.website}" target="_blank">${member.name}'s Website</a>
                    <span class="contact-email">${member.email}</span>
                    <div class="separator-line"></div>
                `;
                return memberBlock;
            };

            // ---- Logique pour la section "Membres à l'honneur" (topMembers) ----
            if (topMembersContainer) {
                // Mélanger les membres pour un affichage "aléatoire" (turnover)
                const shuffledMembers = [...members].sort(() => 0.5 - Math.random());
                const featuredMembersCount = 4; // Nombre de membres à afficher en "honneur"
                const featuredMembers = shuffledMembers.slice(0, featuredMembersCount);

                topMembersContainer.innerHTML = ''; // Nettoyer le contenu existant
                featuredMembers.forEach(member => {
                    topMembersContainer.appendChild(createMemberBlock(member));
                });
                console.log(`${featuredMembers.length} membres ajoutés à la section "Membres à l'honneur".`);
            }

            // ---- Logique pour la section "Nos nouveaux membres" (bottomMembers) ----
            if (bottomMembersContainer) {
                bottomMembersContainer.innerHTML = ''; // Nettoyer le contenu existant
                // Pour cette section, nous allons afficher TOUS les membres (ou les autres, si vous préférez)
                members.forEach(member => {
                    bottomMembersContainer.appendChild(createMemberBlock(member));
                });
                console.log(`${members.length} membres ajoutés à la section "Nos nouveaux membres".`);
            }
        })
        .catch(error => {
            console.error("Erreur lors du chargement ou du traitement des membres :", error);
            // Afficher un message d'erreur dans les deux sections si elles existent
            if (topMembersContainer) {
                topMembersContainer.innerHTML = "<p style='color: red; text-align: center;'>Impossible de charger les membres à l'honneur.</p>";
            }
            if (bottomMembersContainer) {
                bottomMembersContainer.innerHTML = "<p style='color: red; text-align: center;'>Impossible de charger les nouveaux membres.</p>";
            }
        });
});
