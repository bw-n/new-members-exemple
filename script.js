document.addEventListener("DOMContentLoaded", function() {
    // Récupère le contenu des membres depuis le <template> HTML
    const memberTemplate = document.getElementById("member-data");
    // Crée un tableau de tous les nœuds de membres clonés à partir du template
    const allMembers = Array.from(memberTemplate.content.children).map(node => node.cloneNode(true));

    let topContainer = document.getElementById("topMembers");
    let bottomContainer = document.getElementById("bottomMembers");

    const numTopMembers = 4; // Nombre de membres à afficher dans la section "Membres à l'honneur"

    // Vérifie qu'il y a des membres dans le template
    if (allMembers.length === 0) {
        console.error("Le template 'member-data' est vide. Aucun membre à afficher.");
        // Affiche un message à l'utilisateur si aucun membre n'est trouvé
        topContainer.innerHTML = "<p>Membres à l'honneur</p><p>Aucun membre disponible pour le moment.</p>";
        bottomContainer.innerHTML = "<p>🔹 Tous les membres 🔹</p><p>Aucun membre disponible pour le moment.</p>";
        return; // Arrête l'exécution du script si aucun membre
    }

    // Mélange initial de tous les membres
    let shuffledMembers = [...allMembers].sort(() => Math.random() - 0.5);

    // Initialise les membres du haut et du bas
    let currentTopMembers = [];
    let currentBottomMembers = [];

    function initializeMembers() {
        // Mélange tous les membres à nouveau
        shuffledMembers = [...allMembers].sort(() => Math.random() - 0.5);
        // Prend les premiers `numTopMembers` pour la section du haut
        currentTopMembers = shuffledMembers.slice(0, numTopMembers);
        // Le reste va dans la section du bas
        currentBottomMembers = shuffledMembers.slice(numTopMembers);
    }

    function updateMembers() {
        // Si la liste des membres du bas est vide ou si les membres du haut sont tous passés
        if (currentBottomMembers.length === 0) {
            initializeMembers(); // Réinitialise et mélange tout
        } else {
            // Déplace le membre le plus ancien de "topMembers" vers "bottomMembers"
            if (currentTopMembers.length >= numTopMembers && currentTopMembers.length > 0) {
                let oldTopMember = currentTopMembers.shift();
                currentBottomMembers.push(oldTopMember);
            }

            // Récupère le prochain membre de "currentBottomMembers" pour le mettre en haut
            let nextMember = currentBottomMembers.shift();
            if (nextMember) {
                currentTopMembers.push(nextMember);
            } else {
                // Ce cas ne devrait normalement pas être atteint si initializeMembers() est appelé correctement
                console.warn("Erreur logique: currentBottomMembers était vide de manière inattendue.");
                initializeMembers(); // Réinitialise par sécurité
            }
        }

        // Met à jour l'affichage des conteneurs
        topContainer.innerHTML = "<p>Membres à l'honneur</p>" +
                                 currentTopMembers.map(m => m.outerHTML).join("");
        bottomContainer.innerHTML = "<p>🔹 Tous les membres 🔹</p>" +
                                         currentBottomMembers.map(m => m.outerHTML).join("");
    }

    // Initialise et affiche les membres une première fois
    initializeMembers();
    updateMembers(); // Affiche l'état initial après l'initialisation

    // Définit l'intervalle de rotation (toutes les 10 secondes)
    setInterval(updateMembers, 10000); // 10000 millisecondes = 10 secondes

    // --- Script d'animation d'icône par Intersection Observer (pour l'icône de la page) ---
    // Assurez-vous que votre HTML Weebly contient bien un élément avec la classe 'icon'
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
