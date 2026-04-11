const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzuFQBx3dYTnXE5UdZ7psLJefv3Gm-S6mdSD-J8TcSW0rNwe1p28MCbquk954nUG1w/exec";

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

function handleLogout() {
    sessionStorage.removeItem('isLoggedIn');
    window.location.href = 'admin-login.html';
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    sidebar.classList.toggle('sidebar-hidden');
    overlay.classList.toggle('hidden');
}

window.onload = () => {
    fetchLiveStats();
    
    const hour = new Date().getHours();
    const greetingEl = document.getElementById('greeting');
    if (hour < 12) greetingEl.innerText = "Good Morning";
    else if (hour < 18) greetingEl.innerText = "Good Afternoon";
    else greetingEl.innerText = "Good Evening";
};

setInterval(fetchLiveStats, 120000);
