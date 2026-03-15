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
            // Removed auto-display
        })
        .catch(() => {
            document.getElementById("announcementText").innerText = "Announcement unavailable.";
            // Removed auto-display
        });

    // Close button
    document.querySelector(".close").onclick = function() {
        document.getElementById("announcementModal").style.display = "none";
    }

});
