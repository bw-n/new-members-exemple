document.addEventListener("DOMContentLoaded", function() {
    // Récupère le contenu des membres depuis le <template> HTML
    const memberTemplate = document.getElementById("member-data");
    const allMembers = Array.from(memberTemplate.content.children).map(node => node.cloneNode(true));

    let topContainer = document.getElementById("topMembers");
    let bottomContainer = document.getElementById("bottomMembers");

    const numTopMembers = 4; // Nombre de membres à afficher dans la section "Membres à l'honneur"

    if (allMembers.length === 0) {
        console.error("Le template 'member-data' est vide. Aucun membre à afficher.");
        topContainer.innerHTML = "<p>Membres à l'honneur</p><p>Aucun membre disponible pour le moment.</p>";
        bottomContainer.innerHTML = "<p>🔹 Tous les membres 🔹</p><p>Aucun membre disponible pour le moment.</p>";
        return;
    }

    let shuffledMembers = [...allMembers].sort(() => Math.random() - 0.5);

    let currentTopMembers = [];
    let currentBottomMembers = [];

    function initializeMembers() {
        shuffledMembers = [...allMembers].sort(() => Math.random() - 0.5);
        currentTopMembers = shuffledMembers.slice(0, numTopMembers);
        currentBottomMembers = shuffledMembers.slice(numTopMembers);
    }

    function updateMembers() {
        if (currentBottomMembers.length === 0) {
            initializeMembers();
        } else {
            if (currentTopMembers.length >= numTopMembers && currentTopMembers.length > 0) {
                let oldTopMember = currentTopMembers.shift();
                currentBottomMembers.push(oldTopMember);
            }
            let nextMember = currentBottomMembers.shift();
            if (nextMember) {
                currentTopMembers.push(nextMember);
            } else {
                console.warn("Erreur logique: currentBottomMembers était vide de manière inattendue.");
                initializeMembers();
            }
        }

        topContainer.innerHTML = "<p>Membres à l'honneur</p>" +
                                 currentTopMembers.map(m => m.outerHTML).join("");
        bottomContainer.innerHTML = "<p>🔹 Tous les membres 🔹</p>" +
                                         currentBottomMembers.map(m => m.outerHTML).join("");
    }

    initializeMembers();
    updateMembers();

    setInterval(updateMembers, 10000);

    // --- Script d'animation d'icône par Intersection Observer (pour l'icône de la page) ---
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
        threshold: 0.15
    });

    document.querySelectorAll('.icon').forEach(icon => {
        iconObserver.observe(icon);
    });

    // --- NOUVEAU : Script pour le bouton de retour en haut (Smooth Scroll) ---
    const backToTopButton = document.getElementById("backToTopButton");
    const mainTitle = document.getElementById("mainTitle"); // L'élément vers lequel on veut scroller

    // Montrer ou cacher le bouton en fonction du défilement
    window.addEventListener("scroll", function() {
        // Affiche le bouton si on a défilé de plus de 200px (ajustez si besoin)
        if (window.scrollY > 200) {
            backToTopButton.style.display = "block";
        } else {
            backToTopButton.style.display = "none";
        }
    });

    // Gérer le clic sur le bouton pour le défilement fluide
    backToTopButton.addEventListener("click", function() {
        if (mainTitle) {
            mainTitle.scrollIntoView({ behavior: "smooth" });
        } else {
            // Si le titre n'est pas trouvé, scroll vers le haut de la page
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    });
});
