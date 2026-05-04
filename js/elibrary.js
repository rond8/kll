
const sheetURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQutB-VPuDwQR0UWAbDDKk4TbqoBpCJujh8bST3ZhomYSzKdMJoY_LZvlFO6AkGh8QJASgN-FUuN0ji/pub?output=csv';
let bookData = [];

async function fetchLibraryData() {
    try {
        const response = await fetch(sheetURL);
        const data = await response.text();
        
        bookData = parseCSV(data);
        displayBooks(bookData);
    } catch (error) {
        console.error("Error fetching sheet:", error);
    }
}

function parseCSV(csv) {
    const lines = csv.split("\n");
    const result = [];
    // Extract headers and clean whitespace
    const headers = lines[0].split(",").map(h => h.trim().toLowerCase());

    for (let i = 1; i < lines.length; i++) {
        if (!lines[i]) continue;
        
        const obj = {};
        const currentline = lines[i].split(",");

        headers.forEach((header, index) => {
            obj[header] = currentline[index] ? currentline[index].trim() : "";
        });
        result.push(obj);
    }
    return result;
}

function displayBooks(books) {
    const grid = document.getElementById('libraryGrid');
    grid.innerHTML = '';

    books.forEach(book => {
        const card = document.createElement('div');
        card.className = 'book-card';
        
        const isAvailable = book.status && book.status.toLowerCase() === 'available';
        const statusClass = isAvailable ? 'status-available' : 'status-borrowed';

        card.innerHTML = `
            <h3>${book.title}</h3>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Category:</strong> ${book.category}</p>
            <span class="status-badge ${statusClass}">${book.status}</span>
        `;
        grid.appendChild(card);
    });
}

// Search Functionality
document.getElementById('searchInput').addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = bookData.filter(book => 
        book.title.toLowerCase().includes(term) || 
        book.author.toLowerCase().includes(term)
    );
    displayBooks(filtered);
});

// Category Filter
function filterCategory(category) {
    if (category === 'All') {
        displayBooks(bookData);
    } else {
        const filtered = bookData.filter(book => book.category.toLowerCase() === category.toLowerCase());
        displayBooks(filtered);
    }
}

fetchLibraryData();
// Optional: Auto-refresh every 5 minutes
setInterval(fetchLibraryData, 300000);