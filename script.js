// script.js (sur GitHub Pages)

document.addEventListener("DOMContentLoaded", function() {

    // --- Script de turnover des membres ---
    // Fonction pour charger les membres depuis members.json
    async function loadMembers() {
        try {
            const response = await fetch('https://bw-n.github.io/new-members-featured/members.json');
            const data = await response.json();
            return data.members;
        } catch (error) {
            console.error('Erreur lors du chargement des membres:', error);
            return [];
        }
    }

    let allMembers = []; // Stockera tous les membres après le chargement
    let currentTopMembers = [];
    let currentBottomMembers = [];
    const numTopMembers = 4;
    const topContainer = document.getElementById("topMembers");
    const bottomContainer = document.getElementById("bottomMembers");

    async function initMembers() {
        allMembers = await loadMembers();
        if (allMembers.length === 0) {
            topContainer.innerHTML = "<p>Aucun membre à afficher pour le moment.</p>";
            bottomContainer.innerHTML = "<p>🔹 Tous les membres 🔹<br>Aucun membre à afficher pour le moment.</p>";
            return;
        }

        let shuffledMembers = [...allMembers].sort(() => Math.random() - 0.5);
        currentTopMembers = shuffledMembers.slice(0, numTopMembers);
        currentBottomMembers = shuffledMembers.slice(numTopMembers);
        updateMembersDisplay();
    }

    function createMemberHtml(member) {
        return `
            <div class="member-block">
                <div class="photo" style="background-image:url('${member.photo}')"></div>
                <strong>${member.name}</strong>
                <span class="profession">${member.profession}</span>
                ${member.website ? `<a href="${member.website}" target="_blank">${member.website.replace(/(^\w+:|^)\/\//, '')}</a>` : ''}
                <span class="contact-email">${member.email}</span>
                <div class="separator-line"></div>
            </div>
        `;
    }

    function updateMembersDisplay() {
        topContainer.innerHTML = "<p>Membres à l'honneur</p>" +
                                 currentTopMembers.map(createMemberHtml).join("");
        bottomContainer.innerHTML = "<p>🔹 Tous les membres 🔹</p>" +
                                     currentBottomMembers.map(createMemberHtml).join("");
    }

    function rotateMembers() {
        if (currentBottomMembers.length === 0) {
            currentBottomMembers = [...allMembers].sort(() => Math.random() - 0.5);
            currentTopMembers = currentBottomMembers.splice(0, numTopMembers);
        }

        let nextMember = currentBottomMembers.shift();

        if (currentTopMembers.length > 0) {
            let oldTopMember = currentTopMembers.shift();
            currentBottomMembers.push(oldTopMember);
        }

        currentTopMembers.push(nextMember);
        updateMembersDisplay();
    }

    // Initialise les membres et lance la rotation
    initMembers();
    setInterval(rotateMembers, 10000); // 10000 millisecondes = 10 secondes


    // --- Script d'effet de scroll pour le menu ---
    // (Conservez si nav-wrap existe dans votre thème Weebly)
    const navWrap = document.querySelector('.nav-wrap');
    if (navWrap) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navWrap.classList.add('scrolled');
            } else {
                navWrap.classList.remove('scrolled');
            }
        });
    }

    // --- Script d'animation de l'icône ---
    const observer = new IntersectionObserver(entries => {
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
        observer.observe(icon);
    });

    // --- Script d'animation du Canvas ---
    const canvas = document.getElementById('networkCanvas');
    if (canvas) { // S'assure que le canvas existe avant d'essayer de le manipuler
        const ctx = canvas.getContext('2d');
        let width = canvas.offsetWidth;
        let height = canvas.offsetHeight;
        canvas.width = width;
        canvas.height = height;

        const POINT_COUNT = 40;
        const MAX_DISTANCE = 120;
        const points = [];

        function generatePoints() {
            points.length = 0;
            for (let i = 0; i < POINT_COUNT; i++) {
                points.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 0.4,
                    vy: (Math.random() - 0.5) * 0.4,
                });
            }
        }

        function distance(p1, p2) {
            return Math.hypot(p1.x - p2.x, p1.y - p2.y);
        }

        function draw() {
            ctx.clearRect(0, 0, width, height);
            for (let i = 0; i < POINT_COUNT; i++) {
                for (let j = i + 1; j < POINT_COUNT; j++) {
                    const dist = distance(points[i], points[j]);
                    if (dist < MAX_DISTANCE) {
                        const alpha = 1 - dist / MAX_DISTANCE;
                        ctx.strokeStyle = `rgba(92, 188, 224, ${alpha})`;
                        ctx.beginPath();
                        ctx.moveTo(points[i].x, points[i].y);
                        ctx.lineTo(points[j].x, points[j].y);
                        ctx.stroke();
                    }
                }
                const p = points[i];
                ctx.beginPath();
                ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(92, 188, 224, 0.9)';
                ctx.fill();
            }
        }

        function update() {
            for (const p of points) {
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;
            }
        }

        function animate() {
            update();
            draw();
            requestAnimationFrame(animate);
        }

        generatePoints();
        animate();

        window.addEventListener('resize', () => {
            width = canvas.offsetWidth;
            height = canvas.offsetHeight;
            canvas.width = width;
            canvas.height = height;
            generatePoints();
        });
    }

    // --- Script Swiper (si vous utilisez Swiper ailleurs que dans le "banner-wrap") ---
    // S'assure que les éléments Swiper existent
    const thumbsSwiperElement = document.querySelector(".thumbs-swiper");
    const mainSwiperElement = document.querySelector(".main-swiper");

    if (thumbsSwiperElement && mainSwiperElement) {
        const thumbsSwiper = new Swiper(".thumbs-swiper", {
            spaceBetween: 10,
            slidesPerView: 3,
            freeMode: true,
            watchSlidesProgress: true,
            watchSlidesVisibility: true,
        });
        const mainSwiper = new Swiper(".main-swiper", {
            spaceBetween: 10,
            loop: true,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            thumbs: {
                swiper: thumbsSwiper
            },
            autoplay: {
                delay: 4500,
                disableOnInteraction: false,
            },
        });
    }


    // --- Script du cookie banner ---
    const banner = document.getElementById("cookie-banner");
    const acceptBtn = document.getElementById("accept-cookies");
    const consentKey = "cookies-consent";

    if (banner && !localStorage.getItem(consentKey)) { // Vérifie que le banner existe
        banner.style.display = "flex";
    }

    if (acceptBtn) { // Vérifie que le bouton existe
        acceptBtn.addEventListener("click", () => {
            localStorage.setItem(consentKey, "true");
            banner.style.display = "none";
        });
    }

    // --- Script du bouton Retour en haut ---
    const backToTopButton = document.getElementById("backToTopButton");
    if (backToTopButton) { // Vérifie que le bouton existe
        window.addEventListener("scroll", () => {
            if (window.scrollY > 200) { // Affiche le bouton après 200px de défilement
                backToTopButton.style.display = "block";
            } else {
                backToTopButton.style.display = "none";
            }
        });

        backToTopButton.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }
});
