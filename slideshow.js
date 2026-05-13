const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQwnuTgVmucNQmw8Dllle4tYR5qq9rZjHrMLrTo0QRxZQQDFNen9xEBws4JPaMOpU5WiBsEMc1l3MK9/pub?output=csv';

let currentIdx = 0;
let totalSlides = 0;
let slideTimer;
let slideTexts = []; // Array to store altText for each slide

async function loadSlides() {
    try {
        const response = await fetch(`${csvUrl}&cachebust=${Date.now()}`);
        const data = await response.text();

        const rows = data.split(/\r?\n/).filter(row => row.trim() !== "");
        const slideData = rows.slice(1);

        const container = document.getElementById('slide-inner');
        const slideSpan = document.getElementById('slidetext');
        container.innerHTML = '';
        slideTexts = []; // Clear array

        totalSlides = slideData.length;

        slideData.forEach((row, index) => {
            const cols = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
            const link = cols[1]?.replace(/"/g, "").trim();
            const imgSrc = cols[2]?.replace(/"/g, "").trim();
            const altText = cols[3]?.replace(/"/g, "").trim() || "No Title";

            if (imgSrc) {
                // Store text for later use in updateSlide()
                slideTexts.push(altText);

                const slideDiv = document.createElement('div');
                slideDiv.className = 'mySlides';
                
                // Show text on hover
                slideDiv.addEventListener('mouseenter', () => {
                    slideSpan.style.display = 'block';
                });

                // Hide text when leaving
                slideDiv.addEventListener('mouseleave', () => {
                    slideSpan.style.display = 'none';
                });

                slideDiv.onclick = () => window.location.href = link;
                slideDiv.innerHTML = `<img src="${imgSrc}" alt="${altText}">`;
                container.appendChild(slideDiv);
            }
        });

        updateSlide(); 
        startAutoSlide();

    } catch (error) {
        console.error('Error:', error);
        document.getElementById('slide-num').innerText = "Error Loading";
    }
}

function updateSlide() {
    const slideInner = document.getElementById('slide-inner');
    const slideSpan = document.getElementById('slidetext');
    
    if (slideInner && totalSlides > 0) {
        slideInner.style.transform = `translateX(-${currentIdx * 100}%)`;
        document.getElementById('slide-num').innerText = `${currentIdx + 1} / ${totalSlides}`;
        
        // Pull the text from our stored array using the current index
        slideSpan.innerText = slideTexts[currentIdx];
    }
}

function moveSlide(direction) {
    currentIdx += direction;
    if (currentIdx >= totalSlides) currentIdx = 0;
    if (currentIdx < 0) currentIdx = totalSlides - 1;
    updateSlide();
    resetTimer();
}

function startAutoSlide() {
    slideTimer = setInterval(() => moveSlide(1), 5000);
}

function resetTimer() {
    clearInterval(slideTimer);
    startAutoSlide();
}

loadSlides();