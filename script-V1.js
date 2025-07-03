document.addEventListener('DOMContentLoaded', () => {
    console.log("Script est en cours d'exécution : DOMContentLoaded a été déclenché.");

    const topMembersContainer = document.getElementById('topMembers'); // Section "Membres à l'honneur"
    const bottomMembersContainer = document.getElementById('bottomMembers'); // Section "Nos nouveaux membres"
    
    const membersDataUrl = 'https://bw-n.github.io/new-members-featured/members.json'; // URL de GitHub Pages

    if (!topMembersContainer) {
        console.error("L'élément avec l'ID 'topMembers' n'a pas été trouvé.");
    }

    if (!bottomMembersContainer) {
        console.error("L'élément avec l'ID 'bottomMembers' n'a pas été trouvé.");
    }

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
        .then(allMembers => { // Renommé 'allMembers' pour plus de clarté
            console.log("Données des membres récupérées avec succès :", allMembers);

            // Création d'une copie de la liste pour la manipulation du turnover
            let rotatingMembers = [...allMembers]; // Utilisez cette liste pour la rotation

            const createMemberBlock = (member) => {
                const memberBlock = document.createElement('div');
                memberBlock.classList.add('member-block'); 

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

            // Fonction de mise à jour des deux sections
            const updateMembersDisplay = () => {
                const featuredCount = 4; // Nombre de membres dans la section "Membres à l'honneur"

                // ---- Logique pour la section "Membres à l'honneur" (topMembers) ----
                if (topMembersContainer) {
                    topMembersContainer.innerHTML = ''; // Nettoyer le contenu
                    const featuredMembers = rotatingMembers.slice(0, featuredCount);
                    featuredMembers.forEach(member => {
                        topMembersContainer.appendChild(createMemberBlock(member));
                    });
                    console.log(`Membres à l'honneur mis à jour. Affichage des ${featuredMembers.length} premiers.`);
                }

                // ---- Logique pour la section "Nos nouveaux membres" (bottomMembers) ----
                if (bottomMembersContainer) {
                    bottomMembersContainer.innerHTML = ''; // Nettoyer le contenu
                    const otherMembers = rotatingMembers.slice(featuredCount); // Le reste des membres
                    otherMembers.forEach(member => {
                        bottomMembersContainer.appendChild(createMemberBlock(member));
                    });
                    console.log(`${otherMembers.length} membres ajoutés à la section "Nos nouveaux membres".`);
                }

                // ---- Logique de rotation (le "turnover en chaîne") ----
                // Déplacer le premier membre vers la fin de la liste
                const firstMember = rotatingMembers.shift(); // Retire le premier élément
                rotatingMembers.push(firstMember); // L'ajoute à la fin
                console.log("Rotation effectuée : le premier membre est passé en fin de liste.");
            };

            // Appeler la fonction une première fois pour l'affichage initial
            updateMembersDisplay();

            // Mettre à jour les membres toutes les 10 secondes (10000 millisecondes)
            setInterval(updateMembersDisplay, 10000); 

        })
        .catch(error => {
            console.error("Erreur lors du chargement ou du traitement des membres :", error);
            if (topMembersContainer) {
                topMembersContainer.innerHTML = "<p style='color: red; text-align: center;'>Impossible de charger les membres à l'honneur.</p>";
            }
            if (bottomMembersContainer) {
                bottomMembersContainer.innerHTML = "<p style='color: red; text-align: center;'>Impossible de charger les nouveaux membres.</p>";
            }
        });
});
