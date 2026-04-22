document.addEventListener('DOMContentLoaded', () => {
    const logoSection = document.querySelector('.logo-body-wrapper');
    const boxes = document.querySelectorAll('.d-box');

    // Define colors for each specific box (optional) 
    // or just use one consistent hover color
    const hoverColor = "rgba(128, 0, 0, 0.05)"; // Very light KLL Maroon tint

    boxes.forEach(box => {
        box.addEventListener('mouseenter', () => {
            // Change background of the whole section
            logoSection.style.backgroundColor = hoverColor;
            logoSection.style.borderRadius = "20px"; // Optional styling touch
        });

        box.addEventListener('mouseleave', () => {
            // Reset background when leaving
            logoSection.style.backgroundColor = "transparent";
        });
    });
});
