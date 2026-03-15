const navbar = `
<header>
    <img src="asset/img/schoolicon.jpg" alt="" id="schoolicon">
    <button id="navToggle" class="nav-toggle" aria-label="Toggle navigation" aria-expanded="false">☰</button>
    <h1>Kolehiyo ng Lungsod ng Lipa</h1>
</header>

<nav id="mainNav" class="nav">
<ul>
<li><a href="index.html">HOME</a></li>
<li><a href="about.html">ABOUT US</a></li>
<li><a href="student_login.html">STUDENT PORTAL</a></li>
<li><a href="programs.html">PROGRAMS</a></li>
<li><a href="contacts.html">CONTACT US</a></li>
</ul>
</nav>
`;


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
}

document.addEventListener('DOMContentLoaded', displaynav);
