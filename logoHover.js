/**
 * logo-hover.js
 * Dynamically changes the section background to a specific image 
 * when hovering over geometric logo parts.
 */

document.addEventListener('DOMContentLoaded', () => {
    const logoSection = document.getElementById('image-preview');
    const boxes = document.querySelectorAll('.d-box');

    boxes.forEach(box => {
        box.addEventListener('mouseenter', () => {
            // Get the image path from the data-bg attribute in HTML
            const bgImage = box.getAttribute('data-bg');
             const bgText = box.getAttribute('txt');
            
            if (bgImage && logoSection) {
                /**
                 * We use a linear-gradient overlay (rgba 255,255,255, 0.8) 
                 * This keeps the background image subtle so the logo stays readable.
                 * Change the 0.8 to a higher number for more fade, or lower for more clarity.
                 */
                logoSection.style.backgroundImage = ` url('${bgImage}')`;
                logoSection.innerHTML=`${bgtext}`
                // Ensure the image covers the section properly
                logoSection.style.backgroundSize = 'cover';
                logoSection.style.backgroundPosition = 'center';
                logoSection.style.borderRadius = "20px";
            }
        });

        box.addEventListener('mouseleave', () => {
            if (logoSection) {
                // Reset to default state
                logoSection.style.backgroundImage = 'none';
                logoSection.style.backgroundColor = "transparent";
                logoSection.style.borderRadius = "0px";
            }
        });
    });
});
