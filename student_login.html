// student.js

const apiURL = "https://script.google.com/macros/s/AKfycbw7wGp9i_-RWwbUB0oAu4XvBgHzEUMepboWo9plOP1gNOESI_PSumG_mKEhXXjbRQQ/exec";

let currentUser = null;
let currentPass = null;
let isLoading = false;

// Map numeric years to display strings
const yearMap = {
  1: "1st year",
  2: "2nd year",
  3: "3rd year",
  4: "4th year"
};

function login(usernameInput = null, passwordInput = null) {
  if (isLoading) return;

  const username = usernameInput || document.getElementById("username").value.trim();
  const password = passwordInput || document.getElementById("password").value.trim();

  if (!username || !password) {
    document.getElementById("result").innerText = "Enter username and password";
    return;
  }

  isLoading = true;
  document.getElementById("result").innerText = "Logging in...";

  const url = apiURL +
    "?username=" + encodeURIComponent(username) +
    "&password=" + encodeURIComponent(password) +
    "&t=" + Date.now();

  fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log("API response:", data);

      if (data.status === "success") {
        currentUser = username;
        currentPass = password;

        // Sort grades by year and semester
        data.grades.sort((a, b) => a.year - b.year || a.semester - b.semester);

        // Group grades by year
        const grouped = {
          "1st year": [],
          "2nd year": [],
          "3rd year": [],
          "4th year": []
        };

        data.grades.forEach(g => {
          const yearKey = yearMap[g.year] || "Unknown year";
          if (grouped[yearKey]) grouped[yearKey].push(g);
        });

        let html = `
          <h2>${data.name}</h2>
          <p><strong>Course:</strong> ${data.course}</p>
        `;

        function renderYear(yearKey, label) {
          if (!grouped[yearKey] || grouped[yearKey].length === 0) return "";

          let rows = "";
          grouped[yearKey].forEach(g => {
            rows += `
              <tr>
                <td>${g.semester}</td>
                <td>${g.coursecode}</td>
                <td>${g.subject}</td>
                <td>${g.teacher}</td>
                <td>${g.grade}</td>
              </tr>
            `;
          });

          return `
            <h3>${label}</h3>
            <table border="1" cellpadding="5" cellspacing="0" style="border-collapse: collapse;">
              <thead>
                <tr>
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
          `;
        }

        html += renderYear("1st year", "🎓 First Year");
        html += renderYear("2nd year", "🎓 Second Year");
        html += renderYear("3rd year", "🎓 Third Year");
        html += renderYear("4th year", "🎓 Fourth Year");

        if (data.grades.length === 0) {
          html += `<p><em>No grades available yet.</em></p>`;
        }

        html += `
          <button onclick="logout()">Logout</button>
          <button onclick="location.href='schedule.html'">CLASS SCHEDULE</button>
          <button onclick="refreshGrades()">Refresh Grades</button>
        `;

        document.getElementById("result").innerHTML = html;
        document.getElementById("login").style.display = "none";

      } else {
        document.getElementById("result").innerText = "❌ Invalid username or password.";
      }
    })
    .catch(err => {
      console.error(err);
      document.getElementById("result").innerText = "⚠️ Cannot connect to server.";
    })
    .finally(() => {
      isLoading = false;
    });
}

// Press Enter to login
document.getElementById("password").addEventListener("keypress", e => {
  if (e.key === "Enter") login();
});

// Refresh grades for current user
function refreshGrades() {
  if (currentUser && currentPass) {
    login(currentUser, currentPass);
  }
}

// Logout
function logout() {
  currentUser = null;
  currentPass = null;
  location.reload();
}
