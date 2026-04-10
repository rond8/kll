        // Toggle Mobile Sidebar
        function toggleSidebar() {
            const sidebar = document.getElementById('sidebar');
            const overlay = document.getElementById('sidebar-overlay');
            sidebar.classList.toggle('sidebar-hidden');
            overlay.classList.toggle('hidden');
        }

        // Dynamic Greeting
        function updateGreeting() {
            const hour = new Date().getHours();
            const greetingEl = document.getElementById('greeting');
            if (hour < 12) greetingEl.innerText = "Good Morning";
            else if (hour < 18) greetingEl.innerText = "Good Afternoon";
            else greetingEl.innerText = "Good Evening";
        }

        // Handle Logout
        function handleLogout() {
            if(confirm("Are you sure you want to log out?")) {
                window.location.href = "index.html";
            }
        }

        // Announcement Form Simulation
        document.getElementById('announcementForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const sub = document.getElementById('annSub').value;
            alert("Announcement Published!\nSubject: " + sub);
            this.reset();
        });

        // Initialize
        updateGreeting();