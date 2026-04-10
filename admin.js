
        const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzuFQBx3dYTnXE5UdZ7psLJefv3Gm-S6mdSD-J8TcSW0rNwe1p28MCbquk954nUG1w/exec"; // REPLACE THIS

        async function fetchLiveStats() {
            try {
                // Call Google Apps Script with NO parameters to get stats
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

        // Initial Load
        window.onload = fetchLiveStats;
        // Auto-refresh every 2 minutes
        setInterval(fetchLiveStats, 120000);

        