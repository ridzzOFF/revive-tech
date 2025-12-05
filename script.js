document.querySelectorAll('nav a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        var targetId = this.getAttribute('href').slice(1);
        var target = document.getElementById(targetId);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

var backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', function () {
    if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

backToTopBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

var themeToggle = document.getElementById('themeToggle');
var savedTheme = localStorage.getItem('revivetech-theme');

if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    themeToggle.textContent = 'Mode clair';
} else {
    themeToggle.textContent = 'Mode sombre';
}

themeToggle.addEventListener('click', function () {
    document.body.classList.toggle('dark');
    var isDark = document.body.classList.contains('dark');
    themeToggle.textContent = isDark ? 'Mode clair' : 'Mode sombre';
    localStorage.setItem('revivetech-theme', isDark ? 'dark' : 'light');
});

var contactForm = document.getElementById('contactForm');
var contactFeedback = document.getElementById('contactFeedback');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        var prenom = document.getElementById('prenom').value.trim();
        var nom = document.getElementById('nom').value.trim();
        var email = document.getElementById('email').value.trim();
        var message = document.getElementById('message').value.trim();

        if (!prenom || !nom || !email || !message) {
            contactFeedback.textContent = 'Merci de compléter tous les champs obligatoires.';
            contactFeedback.classList.remove('success');
            contactFeedback.classList.add('error');
            return;
        }

        contactFeedback.textContent = 'Merci ' + prenom + ', votre message a bien été enregistré dans le cadre du projet ReviveTech.';
        contactFeedback.classList.remove('error');
        contactFeedback.classList.add('success');

        contactForm.reset();
    });
}

var reservationModal = document.getElementById('reservationModal');
var modalOfferTitle = document.getElementById('modalOfferTitle');
var modalOfferPrice = document.getElementById('modalOfferPrice');
var reservationForm = document.getElementById('reservationForm');
var reservationFeedback = document.getElementById('reservationFeedback');

var currentOfferTitle = '';
var currentOfferPrice = '';

function openReservationModal(title, price) {
    currentOfferTitle = title;
    currentOfferPrice = price;

    if (modalOfferTitle) modalOfferTitle.textContent = title;
    if (modalOfferPrice) modalOfferPrice.textContent = price;

    if (reservationFeedback) {
        reservationFeedback.textContent = '';
        reservationFeedback.classList.remove('success', 'error');
    }

    if (reservationForm) {
        reservationForm.reset();
    }

    reservationModal.classList.add('open');
}

function closeReservationModal() {
    reservationModal.classList.remove('open');
}

document.querySelectorAll('.offer-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
        var card = btn.closest('.offer-card');
        if (!card) return;

        var titleEl = card.querySelector('h3');
        var priceEl = card.querySelector('.offer-price');

        if (!titleEl || !priceEl) return;

        var title = titleEl.textContent.trim();
        var price = priceEl.textContent.trim();

        openReservationModal(title, price);
    });
});

document.querySelectorAll('.modal-close').forEach(function (btn) {
    btn.addEventListener('click', function () {
        closeReservationModal();
    });
});

reservationModal.addEventListener('click', function (e) {
    if (e.target === reservationModal) {
        closeReservationModal();
    }
});

if (reservationForm) 
    if (reservationForm) {
    reservationForm.addEventListener('submit', function (e) {
        e.preventDefault();

        var prenom = document.getElementById('resPrenom').value.trim();
        var nom = document.getElementById('resNom').value.trim();
        var email = document.getElementById('resEmail').value.trim();
        var tel = document.getElementById('resTel').value.trim();
        var comment = document.getElementById('resComment').value.trim();

        if (!prenom || !nom || !email) {
            reservationFeedback.textContent = 'Merci de renseigner au minimum prénom, nom et e-mail.';
            reservationFeedback.classList.remove('success');
            reservationFeedback.classList.add('error');
            return;
        }

        var reservation = {
            offre: currentOfferTitle,
            prix: currentOfferPrice,
            prenom: prenom,
            nom: nom,
            email: email,
            telephone: tel,
            commentaire: comment,
            date: new Date().toLocaleString()
        };

        var liste = JSON.parse(localStorage.getItem('reservations') || '[]');
        liste.push(reservation);
        localStorage.setItem('reservations', JSON.stringify(liste));

        reservationFeedback.textContent = 'Merci ' + prenom + ', votre réservation pour "' +
            currentOfferTitle + '" a bien été enregistrée.';
        reservationFeedback.classList.remove('error');
        reservationFeedback.classList.add('success');

        setTimeout(function () {
            closeReservationModal();
        }, 900);
    });
}

const ADMIN_PASSWORD = "gg";

function loginAdmin() {
    const entered = prompt("Entrez le code admin :");

    if (entered === ADMIN_PASSWORD) {
        document.getElementById("adminPanel").style.display = "block";
        loadReservations();
    } else {
        alert("Code incorrect.");
    }
}

function loadReservations() {
    const container = document.getElementById("reservationsList");
    container.innerHTML = "";

    const reservations = JSON.parse(localStorage.getItem("reservations")) || [];

    if (reservations.length === 0) {
        container.innerHTML = "<p>Aucune réservation pour le moment.</p>";
        return;
    }

    reservations.forEach((res, index) => {
        const div = document.createElement("div");
        div.className = "reservation-card";

        div.innerHTML = `
            <h3>${res.offre}</h3>
            <p><strong>Nom :</strong> ${res.nom}</p>
            <p><strong>Prénom :</strong> ${res.prenom}</p>
            <p><strong>Email :</strong> ${res.email}</p>
            <p><strong>Téléphone :</strong> ${res.telephone}</p>
            <p><strong>Date :</strong> ${res.date}</p>
            <button onclick="deleteReservation(${index})" class="btn delete-btn">Supprimer</button>
        `;

        container.appendChild(div);
    });
}
function deleteReservation(index) {
    const reservations = JSON.parse(localStorage.getItem("reservations")) || [];
    reservations.splice(index, 1);
    localStorage.setItem("reservations", JSON.stringify(reservations));
    loadReservations();
}
