document.addEventListener("DOMContentLoaded", function() {
    // Récupère le contenu des membres depuis le <template> HTML
    const memberTemplate = document.getElementById("member-data");
    const allMembersHTML = memberTemplate.content.children; // HTMLCollection des divs de membres

    // Convertit les éléments HTML en un tableau pour faciliter la manipulation
    let allMembers = Array.from(allMembersHTML).map(node => node.cloneNode(true));

    let topContainer = document.getElementById("topMembers");
    let bottomContainer = document.getElementById("bottomMembers");

    const numTopMembers = 4; // Nombre de membres à afficher dans la section "Membres à l'honneur"

    // Initialisation des membres pour le turnover
    // Assure que allMembers est bien rempli avant de mélanger et trancher
    if (allMembers.length === 0) {
        console.error("Le template 'member-data' est vide. Aucun membre à afficher.");
        return; // Arrête l'exécution si aucun membre n'est trouvé
    }

    let shuffledMembers = [...allMembers].sort(() => Math.random() - 0.5); // Mélange aléatoire
    // S'assure de ne pas prendre plus de membres qu'il n'y en a
    let initialTopCount = Math.min(numTopMembers, shuffledMembers.length);
    let currentTopMembers = shuffledMembers.slice(0, initialTopCount);
    let currentBottomMembers = shuffledMembers.slice(initialTopCount);

    function updateMembers() {
        // Si le tableau du bas est vide, réinitialise tous les membres pour une nouvelle rotation
        if (currentBottomMembers.length === 0) {
            currentBottomMembers = [...allMembers].sort(() => Math.random() - 0.5); // Mélange à nouveau
            // Empêche de prendre plus de membres que disponible si allMembers est petit
            // Les membres qui étaient en haut sont maintenant mélangés avec les autres pour une nouvelle rotation
            currentTopMembers = currentBottomMembers.splice(0, Math.min(numTopMembers, currentBottomMembers.length));
        }

        // Récupère le prochain membre du bas de la liste
        let nextMember = currentBottomMembers.shift();

        // Déplace le membre le plus ancien de "topMembers" vers "bottomMembers"
        // Seulement si nous avons déjà atteint le nombre maximal de topMembers
        if (currentTopMembers.length >= numTopMembers && currentTopMembers.length > 0) {
            let oldTopMember = currentTopMembers.shift();
            currentBottomMembers.push(oldTopMember);
        }

        // Ajoute le nouveau membre à "topMembers" si un membre a été récupéré
        if (nextMember) {
            currentTopMembers.push(nextMember);
        } else {
            // Cas de secours si, pour une raison quelconque, nextMember est null (ne devrait pas arriver avec la réinitialisation)
            console.warn("Problème: Aucun nouveau membre à ajouter, réinitialisation forcée des membres.");
            currentBottomMembers = [...allMembers].sort(() => Math.random() - 0.5);
            currentTopMembers = currentBottomMembers.splice(0, Math.min(numTopMembers, currentBottomMembers.length));
            nextMember = currentBottomMembers.shift();
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
    // Ce code peut rester ici s'il y a des éléments .icon dans votre HTML actuel.
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
});
