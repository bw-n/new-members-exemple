document.addEventListener('DOMContentLoaded', () => {
    console.log("Script est en cours d'exécution : DOMContentLoaded a été déclenché.");

    const topMembersContainer = document.getElementById('topMembers');
    const bottomMembersContainer = document.getElementById('bottomMembers');
    
    const membersDataUrl = 'https://bw-n.github.io/new-members-featured/members.json';

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
        .then(members => {
            console.log("Données des membres récupérées avec succès :", members);

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

            // ---- Logique pour la section "Membres à l'honneur" (topMembers) ----
            if (topMembersContainer) {
                const featuredMembersCount = 4; // Nombre de membres à afficher en "honneur"
                let currentFeaturedIndex = 0;

                const updateFeaturedMembers = () => {
                    topMembersContainer.innerHTML = ''; // Nettoyer le contenu existant
                    
                    // Sélectionner 4 membres à partir de l'index courant
                    const membersToShow = [];
                    for (let i = 0; i < featuredMembersCount; i++) {
                        membersToShow.push(members[(currentFeaturedIndex + i) % members.length]);
                    }

                    membersToShow.forEach(member => {
                        topMembersContainer.appendChild(createMemberBlock(member));
                    });

                    // Passer à l'ensemble de membres suivant pour la prochaine itération
                    currentFeaturedIndex = (currentFeaturedIndex + 1) % members.length;
                    
                    console.log(`Membres à l'honneur mis à jour. Index de départ: ${currentFeaturedIndex}`);
                };

                // Afficher les membres une première fois
                updateFeaturedMembers();

                // Mettre à jour les membres toutes les 10 secondes (10000 millisecondes)
                setInterval(updateFeaturedMembers, 10000); 
            }

            // ---- Logique pour la section "Nos nouveaux membres" (bottomMembers) ----
            if (bottomMembersContainer) {
                bottomMembersContainer.innerHTML = ''; // Nettoyer le contenu existant
                members.forEach(member => {
                    bottomMembersContainer.appendChild(createMemberBlock(member));
                });
                console.log(`${members.length} membres ajoutés à la section "Nos nouveaux membres".`);
            }
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
