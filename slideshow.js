// configuration
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx6iiH63-2l4HJYVty_FTSOyxtmDptReJX2BSBjnj5u_hfWYYbkhEY0LTTH0ZCQRAg/exec"; 

let slideIndex = 1;

async function initSlideshow() {
    try {
        const response = await fetch(GOOGLE_SCRIPT_URL);
        const data = await response.json();
        
        const container = document.getElementById('slide-inner');
        
        // Maps the Google Sheet columns: slideNumber, image, link, alt
        container.innerHTML = data.map((slide, index) => `
            <div class="mySlides fade" style="display: ${index === 0 ? 'block' : 'none'}" onclick="window.location.href='${slide.link}';">
                <img src="${slide.image}" alt="${slide.alt}" style="width:100%">
            </div>
        `).join('');

        updateCounter(1, data.length);
    } catch (error) {
        console.error("Failed to load slides:", error);
        document.getElementById('slide-inner').innerHTML = "<p>Error loading slides.</p>";
    }
}

function moveSlide(n) {
    showSlides(slideIndex += n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    
    slides[slideIndex - 1].style.display = "block";
    updateCounter(slideIndex, slides.length);
}

function updateCounter(current, total) {
    const counter = document.getElementById("slide-num");
    if (counter) {
        counter.innerText = `${current} / ${total}`;
    }
}

// Start the script
document.addEventListener("DOMContentLoaded", initSlideshow);
