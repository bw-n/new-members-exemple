// DONNÉES DES MEMBRES : Maintenant un tableau d'objets JavaScript pour le filtrage
// ATTENTION : Ajustez les 'metier' pour qu'ils correspondent à vos catégories réelles.
window.membersData = [
    {
        nom: "Jane Doe",
        profession: "Blockchain Expert",
        fiche: "https://janedoe.com",
        contactEmail: "jane@bwxxx.bw",
        image: "https://www.weebly.com/editor/uploads/9/7/1/8/9718598/custom_themes/990953050610449310/files/logo_BW_WEB_200x200.jpg",
        metier: "Blockchain & Crypto" // Exemple de métier
    },
    {
        nom: "John Smith",
        profession: "Cybersecurity Specialist",
        fiche: "https://johnsmith.com",
        contactEmail: "john@bwxxx.bw",
        image: "https://www.weebly.com/editor/uploads/9/7/1/8/9718598/custom_themes/990953050610449310/files/logo_BW_WEB_200x200.jpg",
        metier: "Cybersécurité" // Exemple de métier
    },
    {
        nom: "Alice Brown",
        profession: "Web3 Developer",
        fiche: "https://alicebrown.com",
        contactEmail: "alice@bwxxx.bw",
        image: "https://www.weebly.com/editor/uploads/9/7/1/8/9718598/custom_themes/990953050610449310/files/logo_BW_WEB_200x200.jpg",
        metier: "Développement Web3" // Exemple de métier
    },
    {
        nom: "David Lee",
        profession: "AI Researcher",
        fiche: "https://davidlee.com",
        contactEmail: "david@bwxxx.bw",
        image: "https://www.weebly.com/editor/uploads/9/7/1/8/9718598/custom_themes/990953050610449310/files/logo_BW_WEB_200x200.jpg",
        metier: "Data & IA" // Exemple de métier
    },
    {
        nom: "Sarah Green",
        profession: "UX Designer",
        fiche: "https://sarahgreen.com",
        contactEmail: "sarah@bwxxx.bw",
        image: "https://www.weebly.com/editor/uploads/9/7/1/8/9718598/custom_themes/990953050610449310/files/logo_BW_WEB_200x200.jpg",
        metier: "Design UX/UI" // Exemple de métier
    },
    {
        nom: "Michael Johnson",
        profession: "Smart Contract Engineer",
        fiche: "https://michaeljohnson.com",
        contactEmail: "michael@bwxxx.bw",
        image: "https://www.weebly.com/editor/uploads/9/7/1/8/9718598/custom_themes/990953050610449310/files/logo_BW_WEB_200x200.jpg",
        metier: "Blockchain & Crypto" // Exemple de métier
    },
    {
        nom: "Emily White",
        profession: "Data Analyst",
        fiche: "https://emilywhite.com",
        contactEmail: "emily@bwxxx.bw",
        image: "https://www.weebly.com/editor/uploads/9/7/1/8/9718598/custom_themes/990953050610449310/files/logo_BW_WEB_200x200.jpg",
        metier: "Data & IA" // Exemple de métier
    },
    {
        nom: "Robert Black",
        profession: "Marketing Strategist",
        fiche: "https://robertblack.com",
        contactEmail: "robert@bwxxx.bw",
        image: "https://www.weebly.com/editor/uploads/9/7/1/8/9718598/custom_themes/990953050610449310/files/logo_BW_WEB_200x200.jpg",
        metier: "Marketing Digital" // Exemple de métier
    },
    {
        nom: "Laura Adams",
        profession: "Finance & Crypto Expert",
        fiche: "https://lauraadams.com",
        contactEmail: "laura@bwxxx.bw",
        image: "https://www.weebly.com/editor/uploads/9/7/1/8/9718598/custom_themes/990953050610449310/files/logo_BW_WEB_200x200.jpg",
        metier: "Blockchain & Crypto" // Exemple de métier
    },
    {
        nom: "Chris Miller",
        profession: "Community Manager",
        fiche: "https://chrismiller.com",
        contactEmail: "chris@bwxxx.bw",
        image: "https://www.weebly.com/editor/uploads/9/7/1/8/9718598/custom_themes/990953050610449310/files/logo_BW_WEB_200x200.jpg",
        metier: "Communication & Community" // Exemple de métier
    },
    {
        nom: "Daniel Wilson",
        profession: "DevOps Engineer",
        fiche: "https://danielwilson.com",
        contactEmail: "daniel@bwxxx.bw",
        image: "https://www.weebly.com/editor/uploads/9/7/1/8/9718598/custom_themes/990953050610449310/files/logo_BW_WEB_200x200.jpg",
        metier: "DevOps & Infrastructure" // Exemple de métier
    },
    {
        nom: "Olivia King",
        profession: "Cloud Architect",
        fiche: "https://oliviaking.com",
        contactEmail: "olivia@bwxxx.bw",
        image: "https://www.weebly.com/editor/uploads/9/7/1/8/9718598/custom_themes/990953050610449310/files/logo_BW_WEB_200x200.jpg",
        metier: "DevOps & Infrastructure" // Exemple de métier
    },
    {
        nom: "James Wright",
        profession: "Mobile Developer",
        fiche: "https://jameswright.com",
        contactEmail: "james@bwxxx.bw",
        image: "https://www.weebly.com/editor/uploads/9/7/1/8/9718598/custom_themes/990953050610449310/files/logo_BW_WEB_200x200.jpg",
        metier: "Développement Frontend" // Exemple de métier
    },
    {
        nom: "Sophia Hall",
        profession: "Network Engineer",
        fiche: "https://sophiahall.com",
        contactEmail: "sophia@bwxxx.bw",
        image: "https://www.weebly.com/editor/uploads/9/7/1/8/9718598/custom_themes/990953050610449310/files/logo_BW_WEB_200x200.jpg",
        metier: "Cybersécurité" // Exemple de métier
    },
    {
        nom: "William Turner",
        profession: "Quantum Computing Researcher",
        fiche: "https://williamturner.com",
        contactEmail: "william@bwxxx.bw",
        image: "https://www.weebly.com/editor/uploads/9/7/1/8/9718598/custom_themes/990953050610449310/files/logo_BW_WEB_200x200.jpg",
        metier: "Data & IA" // Exemple de métier
    },
    {
        nom: "Isabella Clark",
        profession: "Bioinformatics Specialist",
        fiche: "https://isabellaclark.com",
        contactEmail: "isabella@bwxxx.bw",
        image: "https://www.weebly.com/editor/uploads/9/7/1/8/9718598/custom_themes/990953050610449310/files/logo_BW_WEB_200x200.jpg",
        metier: "Data & IA" // Exemple de métier
    },
    {
        nom: "Joseph Lewis",
        profession: "Game Developer",
        fiche: "https://josephlewis.com",
        contactEmail: "joseph@bwxxx.bw",
        image: "https://www.weebly.com/editor/uploads/9/7/1/8/9718598/custom_themes/990953050610449310/files/logo_BW_WEB_200x200.jpg",
        metier: "Design & Création Visuelle" // Exemple de métier
    },
    {
        nom: "Mia Young",
        profession: "Robotics Engineer",
        fiche: "https://miayoung.com",
        contactEmail: "mia@bwxxx.bw",
        image: "https://www.weebly.com/editor/uploads/9/7/1/8/9718598/custom_themes/990953050610449310/files/logo_BW_WEB_200x200.jpg",
        metier: "Data & IA" // Exemple de métier
    },
    {
        nom: "Benjamin Scott",
        profession: "AR/VR Developer",
        fiche: "https://benjaminscott.com",
        contactEmail: "benjamin@bwxxx.bw",
        image: "https://www.weebly.com/editor/uploads/9/7/1/8/9718598/custom_themes/990953050610449310/files/logo_BW_WEB_200x200.jpg",
        metier: "Design & Création Visuelle" // Exemple de métier
    },
    {
        nom: "Charlotte Baker",
        profession: "Ethical Hacker",
        fiche: "https://charlottebaker.com",
        contactEmail: "charlotte@bwxxx.bw",
        image: "https://www.weebly.com/editor/uploads/9/7/1/8/9718598/custom_themes/990953050610449310/files/logo_BW_WEB_200x200.jpg",
        metier: "Cybersécurité" // Exemple de métier
    }
];


document.addEventListener("DOMContentLoaded", function() {
    const membersData = window.membersData; // Utilisation des données JS

    const filtersSection = document.getElementById("filters-section");
    const memberResultsGrid = document.getElementById("member-results-grid");
    const backToTopButton = document.getElementById("backToTopButton");
    const returnBtnDiv = document.getElementById("return-btn"); // Le div qui contient le bouton

    // Collecte des métiers uniques
    const allMetiers = membersData.flatMap(m => Array.isArray(m.metier) ? m.metier : [m.metier]);
    const uniqueFilters = [...new Set(allMetiers)].sort();

    // Fonction pour rendre les membres dans la grille
    function renderMembers(list) {
        memberResultsGrid.innerHTML = ""; // Vide la grille avant d'ajouter de nouveaux membres
        if (list.length === 0) {
            memberResultsGrid.innerHTML = "<p style='text-align: center; color: #888;'>Aucun membre trouvé pour cette catégorie.</p>";
            return;
        }

        list.forEach(member => {
            const memberBlock = document.createElement("div");
            memberBlock.className = "member-block";
            memberBlock.innerHTML = `
                <div class="photo" style="background-image:url('${member.image}')"></div>
                <strong>${member.nom}</strong>
                <span class="profession">${member.profession}</span>
                ${member.fiche ? `<a href="${member.fiche}" target="_blank">Voir la fiche</a>` : ''}
                ${member.contactEmail ? `<span class="contact-email">${member.contactEmail}</span>` : ''}
                <div class="separator-line"></div>
            `;
            memberResultsGrid.appendChild(memberBlock);
        });

        // Smooth scroll vers la grille des membres après un filtre
        const y = memberResultsGrid.getBoundingClientRect().top + window.scrollY;
        const offset = window.innerWidth > 768 ? 100 : 20; // Moins d'offset sur mobile
        window.scrollTo({ top: y - offset, behavior: "smooth" });
    }

    // Fonction pour générer les boutons de métier
    function generateMetierButtons() {
        filtersSection.innerHTML = ""; // Assure qu'ils sont générés une seule fois ou rafraîchis
        uniqueFilters.forEach(metier => {
            const button = document.createElement("button");
            button.textContent = metier;
            button.addEventListener("click", () => filterMembersByMetier(metier));
            filtersSection.appendChild(button);
        });
    }

    // Fonction de filtrage des membres
    function filterMembersByMetier(metier) {
        const filteredMembers = membersData.filter(member =>
            Array.isArray(member.metier) ? member.metier.includes(metier) : member.metier === metier
        );
        renderMembers(filteredMembers); // Affiche les membres filtrés
        returnBtnDiv.style.display = "block"; // Affiche le bouton de retour
        // Les boutons de métier restent visibles (grâce au CSS et au fait qu'on ne les cache pas)
    }

    // Fonction appelée par le bouton de retour
    function showAllMetiers() {
        memberResultsGrid.innerHTML = ""; // Vide la grille des membres
        returnBtnDiv.style.display = "none"; // Cache le bouton de retour
        // Les boutons de métier sont déjà visibles, pas besoin de changer leur display
        
        // Smooth scroll vers le haut de la section des filtres
        const y = filtersSection.getBoundingClientRect().top + window.scrollY;
        const offset = window.innerWidth > 768 ? 100 : 20;
        window.scrollTo({ top: y - offset, behavior: "smooth" });
    }

    // Initialisation au chargement de la page
    generateMetierButtons(); // Génère les boutons de métier
    showAllMetiers(); // Assure que la grille des membres est vide au démarrage et le bouton retour caché

    // Écouteur d'événement pour le bouton de retour
    backToTopButton.addEventListener("click", showAllMetiers);


    // --- Ancien script d'animation d'icône par Intersection Observer (si pertinent) ---
    // Si l'icône animée est DANS cet iframe, laissez ce code.
    // Sinon, si elle est sur la page Weebly principale, ce code devrait être là-bas.
    const iconObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) rotate(0deg)';
                entry.target.style.zIndex = '10'; // Assurez-vous que l'icône est au-dessus du reste
            } else {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(40px) rotate(-15deg)';
            }
        });
    }, {
        threshold: 0.15 // déclenchement à environ 15% de visibilité
    });

    // Cherche l'icône dans le DOM de l'iframe
    document.querySelectorAll('.icon').forEach(icon => {
        iconObserver.observe(icon);
    });

    // Remarque : Le Swiper (main-swiper, thumbs-swiper) n'est pas inclus ici car il concerne les sliders
    // et n'est pas lié à la section des membres. Il devrait rester sur votre page Weebly principale
    // ou dans un autre iframe si c'est ainsi que vous le gérez.

    // La logique de "topMembers" et "bottomMembers" avec rotation aléatoire est supprimée
    // car elle est incompatible avec le filtrage par métier.
    // Si vous souhaitez conserver des "membres à l'honneur" séparés des membres filtrables,
    // cela nécessitera une structure HTML et une logique JS plus complexes.
    // Pour l'instant, cette version se concentre sur les métiers et les filtres.
});
