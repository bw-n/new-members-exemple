document.addEventListener("DOMContentLoaded", function() {
    // Récupère le contenu des membres depuis le <template> HTML
    const memberTemplate = document.getElementById("member-data");
    const allMembersHTML = memberTemplate.content.children; // HTMLCollection des divs de membres

    // Convertit les éléments HTML en un tableau pour faciliter la manipulation
    let allMembers = Array.from(allMembersHTML).map(node => node.cloneNode(true));

    let topContainer = document.getElementById("topMembers");
    let bottomContainer = document.getElementById("bottomMembers");

    const numTopMembers = 4; // Nombre de membres à afficher dans la section "Nouveaux Membres"

    let shuffledMembers = [...allMembers].sort(() => Math.random() - 0.5); // Mélange aléatoire
    let currentTopMembers = shuffledMembers.slice(0, numTopMembers);
    let currentBottomMembers = shuffledMembers.slice(numTopMembers);

    function updateMembers() {
        // Si le tableau du bas est vide, réinitialise tous les membres pour une nouvelle rotation
        if (currentBottomMembers.length === 0) {
            currentBottomMembers = [...allMembers].sort(() => Math.random() - 0.5); // Mélange à nouveau
            // Empêche de prendre plus de membres que disponible si allMembers est petit
            currentTopMembers = currentBottomMembers.splice(0, Math.min(numTopMembers, currentBottomMembers.length));
        }

        // Récupère le prochain membre du bas de la liste
        let nextMember = currentBottomMembers.shift();

        // Déplace le membre le plus ancien de "topMembers" vers "bottomMembers"
        if (currentTopMembers.length >= numTopMembers && currentTopMembers.length > 0) {
            let oldTopMember = currentTopMembers.shift();
            currentBottomMembers.push(oldTopMember);
        }

        // Ajoute le nouveau membre à "topMembers"
        if (nextMember) { // S'assure qu'il y a un prochain membre
            currentTopMembers.push(nextMember);
        } else { // Si nextMember est undefined (tableau bottomMembers vide après splice)
            // Ceci ne devrait pas arriver avec la logique de réinitialisation, mais pour la robustesse
            console.warn("Aucun prochain membre à ajouter. Vérifiez la logique de réinitialisation.");
            // Re-générer les membres si un cas inattendu de manque de membres se produit
            currentBottomMembers = [...allMembers].sort(() => Math.random() - 0.5);
            currentTopMembers = currentBottomMembers.splice(0, numTopMembers);
            nextMember = currentBottomMembers.shift(); // Tente de récupérer un nouveau membre
            if(nextMember) currentTopMembers.push(nextMember);
        }


        // Met à jour l'affichage des conteneurs
        topContainer.innerHTML = "<p>Membres à l'honneur</p>" +
                                 currentTopMembers.map(m => m.outerHTML).join("");
        bottomContainer.innerHTML = "<p>🔹 Tous les membres 🔹</p>" +
                                     currentBottomMembers.map(m => m.outerHTML).join("");
    }

    // Appelle la fonction une fois pour afficher les membres initiaux
    updateMembers();

    // Définit l'intervalle de rotation (toutes les 10 secondes)
    setInterval(updateMembers, 10000); // 10000 millisecondes = 10 secondes

    // --- Script d'animation d'icône par Intersection Observer (si vous le voulez dans l'iframe) ---
    // Vous aviez ceci dans votre code original Weebly.
    // Si l'icône est dans cet iframe, ce script doit rester ici.
    // Si l'icône est sur la page Weebly principale, retirez ce code de l'iframe.
    const iconObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) rotate(0deg)';
                entry.target.style.zIndex = '10';
            } else {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(40px) rotate(-15deg)';
            }
        });
    }, {
        threshold: 0.15 // déclenchement à environ 30% de visibilité
    });

    document.querySelectorAll('.icon').forEach(icon => {
        iconObserver.observe(icon);
    });

    // Remarque : Le Swiper (main-swiper, thumbs-swiper) n'est pas inclus ici car il concerne les sliders
    // et n'est pas lié à la section des membres. Assurez-vous que le script Swiper reste sur votre page Weebly
    // ou dans un autre iframe si c'est ainsi que vous le gérez.
});
