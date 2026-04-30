
const title = document.getElementById('main-title');
const container = document.getElementById('content-container');

title.innerText = "Computer Science Module";
container.innerHTML = `
    <div class="ccs-info">
        <p>Welcome to the CCS Department portal.</p>
        <ul>
            <li>Programming Logic</li>
            <li>Web Development</li>
            <li>Database Management</li>
        </ul>
    </div>
`;

// You can also add module-specific functions
console.log("CCS Specific Logic initialized.");