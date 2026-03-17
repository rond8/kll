const navbar = `
<header>
    <button id="navToggle" class="nav-toggle" aria-label="Toggle navigation" aria-expanded="false">☰</button>
</header>
<nav id="mainNav" class="nav">
<ul>
<li><a href="index.html">HOME</a></li>
<li><a href="news.html" id="nav-news">NEWS<span class="nav-badge" aria-label="New content"></span></a></li>
<li><a href="admission.html">ADMISSION</a></li>
<li><a href="about.html">ABOUT US</a></li>
<li><a href="programs.html">PROGRAMS</a></li>
<li><a href="student_login.html">STUDENT PORTAL</a></li>
<li><a href="contacts.html">CONTACT US</a></li>
</ul>
</nav>
`;


function updateNewsBadge() {
    const badge = document.querySelector('#nav-news .nav-badge');
    if (!badge) return;

    const isRead = localStorage.getItem('kllNewsRead') === 'true';
    badge.classList.toggle('hidden', isRead);
}

function displaynav() {
     const container = document.getElementById("navbar");
     if (!container) return;

     container.innerHTML = navbar;

     const toggle = document.getElementById('navToggle');
     const nav = document.getElementById('mainNav');

     if (toggle && nav) {
         toggle.addEventListener('click', () => {
             const isOpen = nav.classList.toggle('open');
             toggle.setAttribute('aria-expanded', isOpen);
         });

         // Close menu after clicking a link (mobile)
         nav.querySelectorAll('a').forEach(link => {
             link.addEventListener('click', () => {
                 nav.classList.remove('open');
                 toggle.setAttribute('aria-expanded', 'false');
             });
         });
     }

     updateNewsBadge();
     // If the user is on the news page, mark news as read.
     if (window.location.pathname.endsWith('news.html')) {
         localStorage.setItem('kllNewsRead', 'true');
         updateNewsBadge();
     }
}

document.addEventListener('DOMContentLoaded', displaynav);
