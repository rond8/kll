document.addEventListener("DOMContentLoaded", function() {

    // Show loading spinner
    const loading = document.getElementById('loading');
    const announcementText = document.getElementById('announcementText');
    if (loading) loading.style.display = 'block';

    // Direct download links for Dropbox files
    const dropboxFiles = [        "https://dl.dropboxusercontent.com/scl/fi/53yy17muuqq3e4b0pm3i4/announce.txt?rlkey=fp2sr8w7q160rsrur9fqaqfbb"];

    // Fetch the first file as an example
    fetch(dropboxFiles[0])
        .then(response => {
            if (!response.ok) throw new Error("Network response was not ok");
            return response.text();
        })
        .then(data => {
            // Hide loading, show content
            if (loading) loading.style.display = 'none';
            announcementText.innerHTML = data;
            // Show announcement if it's new or first visit
            const lastAnnouncement = localStorage.getItem('lastAnnouncement');
            if (lastAnnouncement !== data) {
                const modal = document.getElementById('announcementModal');
                if (modal) {
                    modal.classList.add('show');
                }
                localStorage.setItem('lastAnnouncement', data);
            }
        })
        .catch(() => {
            if (loading) loading.style.display = 'none';
            announcementText.innerText = "Announcement unavailable.";
        });

    // Close button
    const closeBtn = document.querySelector(".close");
    if (closeBtn) {
        closeBtn.onclick = function() {
            const modal = document.getElementById('announcementModal');
            if (modal) modal.classList.remove('show');
        }
    }

    // Close button
    document.querySelector(".close").onclick = function() {
        document.getElementById("announcementModal").style.display = "none";
    }

});
