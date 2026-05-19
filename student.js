// student.js

const apiURL = "https://script.google.com/macros/s/AKfycbylFQOLgi-k-sDp4MdiuyHkgADZjmPHCbZ9aZKU-KgiTwqxm_5sXdWWLaJ5M14xijk/exec";

let currentUser = null;
let currentPass = null;
let isLoading = false;

const yearMap = {
  1: "1st year",
  2: "2nd year",
  3: "3rd year",
  4: "4th year"
};

function login(usernameInput = null, passwordInput = null) {
  if (isLoading) return;

  const username = usernameInput ? usernameInput : (document.getElementById("username") ? document.getElementById("username").value.trim() : "");
  const password = passwordInput ? passwordInput : (document.getElementById("password") ? document.getElementById("password").value.trim() : "");
  const resultDiv = document.getElementById("result");

  if (!username || !password) {
    if (resultDiv) resultDiv.innerText = "Enter username and password";
    return;
  }

  isLoading = true;
  if (resultDiv) resultDiv.innerText = "Logging in...";

  // CORRECTED: Fixed parameters query concatenation with correct formatting (&)
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

        data.grades.sort((a, b) => a.year - b.year || a.semester - b.semester);

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
                <td><strong>${g.grade}</strong></td>
              </tr>
            `;
          });

          return `
            <h3>${label}</h3>
            <table border="1" cellpadding="5" cellspacing="0" style="border-collapse: collapse; width: 100%; margin-bottom: 20px;">
              <thead>
                <tr style="background-color: #f3f4f6;">
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
          <div style="margin-top: 20px;">
            <button onclick="logout()">Logout</button>
            <button onclick="location.href='schedule.html'">CLASS SCHEDULE</button>
            <button onclick="refreshGrades()">Refresh Grades</button>
          </div>
        `;

        if (resultDiv) resultDiv.innerHTML = html;
        
        const loginCard = document.getElementById("login");
        if (loginCard) loginCard.style.display = "none";

      } else {
        if (resultDiv) resultDiv.innerText = "❌ Invalid username or password.";
      }
    })
    .catch(err => {
      console.error(err);
      if (resultDiv) resultDiv.innerText = "⚠️ Cannot connect to server.";
    })
    .finally(() => {
      isLoading = false;
    });
}

document.addEventListener("DOMContentLoaded", () => {
  const passwordField = document.getElementById("password");
  if (passwordField) {
    passwordField.addEventListener("keypress", e => {
      if (e.key === "Enter") login();
    });
  }
});

function refreshGrades() {
  if (currentUser && currentPass) {
    login(currentUser, currentPass);
  }
}

function logout() {
  currentUser = null;
  currentPass = null;
  location.reload();
}
