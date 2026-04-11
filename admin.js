const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzuFQBx3dYTnXE5UdZ7psLJefv3Gm-S6mdSD-J8TcSW0rNwe1p28MCbquk954nUG1w/exec";

// 1. Fetch Dashboard Statistics
async function fetchLiveStats() {
    try {
        const response = await fetch(SCRIPT_URL);
        const data = await response.json();

        if (data.status === "stats") {
            document.getElementById('stat-total-students').innerText = data.totalStudents;
            document.getElementById('stat-active-courses').innerText = data.activeCourses;
            document.getElementById('stat-enrollments').innerText = data.totalEnrollments;
        }
    } catch (error) {
        console.error("Failed to fetch sheet data:", error);
    }
}

// 2. Handle Logout Logic
function handleLogout() {
    // Clear the session status
    sessionStorage.removeItem('isLoggedIn');
    // Redirect back to login page
    window.location.href = 'admin-login.html';
}

// 3. UI Helper: Mobile Sidebar Toggle
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    sidebar.classList.toggle('sidebar-hidden');
    overlay.classList.toggle('hidden');
}

// 4. Initialization
window.onload = () => {
    fetchLiveStats();
    
    // Optional: Dynamic Greeting based on time
    const hour = new Date().getHours();
    const greetingEl = document.getElementById('greeting');
    if (hour < 12) greetingEl.innerText = "Good Morning";
    else if (hour < 18) greetingEl.innerText = "Good Afternoon";
    else greetingEl.innerText = "Good Evening";
};

// Auto-refresh stats every 2 minutes
setInterval(fetchLiveStats, 120000);
