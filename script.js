// Smooth scroll pour le menu
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

// Bouton "retour en haut"
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

// Mode sombre / clair
var themeToggle = document.getElementById('themeToggle');

// Vérifie si un thème est déjà enregistré
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
