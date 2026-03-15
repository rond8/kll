const navbar = `
<header>
    <img src="schoolicon.jpg" alt="" id="schoolicon">
   
</header>

<nav>
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
     document.getElementById("navbar").innerHTML = navbar;
}   

displaynav();
