// Function to fetch data from a Free API
async function fetchInspiration() {
    const textElement = document.getElementById('inspiration-text');
    
    // Visual feedback that it's loading
    textElement.style.opacity = "0.5";
    textElement.innerText = "Seeking wisdom...";

    try {
        // We use the Advice Slip API (Free, no key needed)
        const response = await fetch('https://api.adviceslip.com/advice');
        
        if (!response.ok) throw new Error("API Limit reached");

        const data = await response.json();
        
        // Update the HTML with the API result
        textElement.innerText = `"${data.slip.advice}"`;
        textElement.style.opacity = "1";

    } catch (error) {
        // Fallback message if the internet is slow or API is down
        textElement.innerText = "Education is the most powerful weapon which you can use to change the world.";
        textElement.style.opacity = "1";
        console.log("Error fetching API:", error);
    }
}


document.addEventListener('DOMContentLoaded', fetchInspiration);