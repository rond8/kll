const apiURL = "https://script.google.com/macros/s/AKfycbxqS0ICDpV6g-5KAX6vax137av_rOPOGwUqCZ54Qi8zneA_gdCP4Abizz5M5HZsZA4/exec";

function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !password) {
    document.getElementById("result").innerText = "Enter username and password";
    return;
  }

  // Show logging in message
  document.getElementById("result").innerText = "Logging in...";

  // Add timestamp to prevent caching
  const url =
    apiURL +
    "?username=" +
    encodeURIComponent(username) +
    "&password=" +
    encodeURIComponent(password) +
    "&t=" + new Date().getTime();

  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (data.status === "success") {
        // Sort by year and semester
        data.grades.sort((a, b) => a.year - b.year || a.semester - b.semester);

        let rows = "";
        data.grades.forEach(g => {
          rows += `
            <tr>
              <td>${g.year}</td>
              <td>${g.semester}</td>
              <td>${g.coursecode}</td>
              <td>${g.subject}</td>
              <td>${g.teacher}</td>
              <td>${g.grade}</td>
            </tr>
          `;
        });

        document.getElementById("result").innerHTML = `
          <h2>${data.name}</h2>
          <p><strong>Course:</strong> ${data.course}</p>

          <h3>Grades</h3>
          <table border="1" cellspacing="0" cellpadding="5">
            <thead>
              <tr>
                <th>Year</th>
                <th>Semester</th>
                <th>Course Code</th>
                <th>Subject</th>
                <th>Teacher</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              ${rows}
            </tbody>
          </table>

          <br>
          <button onclick="location.reload()">Logout</button>
          <button onclick="location.href='schedule.html'">CLASS SCHEDULE</button>
          <button onclick="refreshGrades()">Refresh Grades</button>
        `;

        document.getElementById("login").style.display = "none";
      } else {
        document.getElementById("result").innerText = "❌ Invalid username or password.";
      }
    })
    .catch(() => {
      document.getElementById("result").innerText = "⚠️ Cannot connect to server.";
    });
}

// Enter key triggers login
document.getElementById("password").addEventListener("keypress", e => {
  if (e.key === "Enter") login();
});

// Refresh grades function
function refreshGrades() {
  if (document.getElementById("login").style.display === "none") {
    login(); // re-fetch grades
  }
}

