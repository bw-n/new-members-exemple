/* ------------------------------------------------------------- */
/* DÉBUT DU SCRIPT JS POUR LA SECTION DES MEMBRES              */
/* ------------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", function() {
    let topContainer = document.getElementById("topMembers");
    let bottomContainer = document.getElementById("bottomMembers");

    const numTopMembers = 4; // Nombre de membres à afficher dans la section "Membres à l'honneur"
    let allMembersData = []; // Pour stocker les données des membres chargées depuis JSON
    let currentTopMembers = [];
    let currentBottomMembers = [];

    // Fonction pour créer un bloc de membre HTML à partir des données JSON
    function createMemberBlock(member) {
        return `
            <div class="member-block">
                <div class="photo" style="background-image:url('${member.photo}')"></div>
                <strong>${member.name}</strong>
                <span class="profession">${member.profession}</span>
                <a href="${member.website}" target="_blank">${member.name}'s Website</a>
                <span class="contact-email">${member.email}</span>
                <div class="separator-line"></div>
            </div>
        `;
    }

    // Fonction pour charger les membres depuis le fichier JSON
    function loadMembers() {
        fetch('members.json') // Assurez-vous que le chemin est correct
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                allMembersData = data; // Stocke les données chargées
                if (allMembersData.length === 0) {
                    console.error("Le fichier members.json est vide. Aucun membre à afficher.");
                    topContainer.innerHTML = "<p>Membres à l'honneur</p><p>Aucun membre disponible pour le moment.</p>";
                    bottomContainer.innerHTML = "<p>🔹 Tous les membres 🔹</p><p>Aucun membre disponible pour le moment.</p>";
                    return;
                }
                initializeMembers();
                updateMembers(); // Affiche les membres initiaux
                setInterval(updateMembers, 10000); // Démarre le turnover
            })
            .catch(error => {
                console.error("Erreur lors du chargement des membres:", error);
                topContainer.innerHTML = "<p>Membres à l'honneur</p><p>Erreur de chargement des membres.</p>";
                bottomContainer.innerHTML = "<p>🔹 Tous les membres 🔹</p><p>Erreur de chargement des membres.</p>";
            });
    }

    function initializeMembers() {
        // Mélange les membres et les divise
        let shuffledMembers = [...allMembersData].sort(() => Math.random() - 0.5);
        currentTopMembers = shuffledMembers.slice(0, numTopMembers);
        currentBottomMembers = shuffledMembers.slice(numTopMembers);
    }

    function updateMembers() {
        if (currentBottomMembers.length === 0 && currentTopMembers.length === numTopMembers) {
            initializeMembers(); // Réinitialise si toutes les cartes ont tourné
        } else if (currentBottomMembers.length > 0) {
            // Déplace le membre le plus ancien de "topMembers" vers "bottomMembers"
            if (currentTopMembers.length >= numTopMembers && currentTopMembers.length > 0) {
                let oldTopMember = currentTopMembers.shift();
                currentBottomMembers.push(oldTopMember);
            }
            // Récupère le prochain membre de "currentBottomMembers" pour le mettre en haut
            let nextMember = currentBottomMembers.shift();
            if (nextMember) {
                currentTopMembers.push(nextMember);
            }
        } else {
             // Cas où tous les membres ont déjà tourné et sont en bas
             initializeMembers();
        }

        topContainer.innerHTML = "<p>Membres à l'honneur</p>" +
                                 currentTopMembers.map(createMemberBlock).join("");
        bottomContainer.innerHTML = "<p>🔹 Tous les membres 🔹</p>" +
                                         currentBottomMembers.map(createMemberBlock).join("");
    }

    // --- Script d'animation d'icône par Intersection Observer ---
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

    // --- Script pour le bouton de retour en haut (Smooth Scroll) ---
    const backToTopButton = document.getElementById("backToTopButton");
    const mainTitle = document.getElementById("mainTitle");

    window.addEventListener("scroll", function() {
        if (window.scrollY > 200) {
            backToTopButton.style.display = "block";
        } else {
            backToTopButton.style.display = "none";
        }
    });

    backToTopButton.addEventListener("click", function() {
        if (mainTitle) {
            mainTitle.scrollIntoView({ behavior: "smooth" });
        } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    });

    // Lance le chargement des membres au démarrage
    loadMembers();

});

/* ------------------------------------------------------------- */
/* FIN DU SCRIPT JS POUR LA SECTION DES MEMBRES                */
/* ------------------------------------------------------------- */
