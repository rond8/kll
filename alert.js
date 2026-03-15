document.addEventListener("DOMContentLoaded", function() {

    // Direct download links for Dropbox files
    const dropboxFiles = [        "https://dl.dropboxusercontent.com/scl/fi/53yy17muuqq3e4b0pm3i4/announce.txt?rlkey=fp2sr8w7q160rsrur9fqaqfbb"];

    // Fetch the first file as an example
    fetch(dropboxFiles[0])
        .then(response => {
            if (!response.ok) throw new Error("Network response was not ok");
            return response.text();
        })
        .then(data => {
            document.getElementById("announcementText").innerHTML = data;
            // Show announcement on first visit
            if (!localStorage.getItem('hasVisited')) {
                document.getElementById('announcementModal').style.display = 'block';
                localStorage.setItem('hasVisited', 'true');
            }
        })
        .catch(() => {
            document.getElementById("announcementText").innerText = "Announcement unavailable.";
        });

    // Close button
    document.querySelector(".close").onclick = function() {
        document.getElementById("announcementModal").style.display = "none";
    }

});
