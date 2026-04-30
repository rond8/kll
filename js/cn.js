
const title = document.getElementById('main-title');
const container = document.getElementById('content-container');

title.innerText = "College of Nursing PAGE";
container.innerHTML = `
    <div class="cn-info">
        <p>Welcome to the College of Nursing Department portal.</p>
        <ul>
            <li>Medical Terminology</li>
            <li>Anatomy and Physiology</li>
            <li>Pharmacology</li>
        </ul>
    </div>
`;

// You can also add module-specific functions
console.log("College of Nursing Specific Logic initialized.");