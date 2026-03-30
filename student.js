const apiURL = "https://script.google.com/macros/s/AKfycbyM_Gc1Ec0yQXQ8HUq1HXVHMrgZRzkj6JHDgbZ2Z50Kgi8R_eKcNOBt_70v17fBleg/exec";

let currentUser = null;
let currentPass = null;
let isLoading = false;

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

  // ✅ USE GET (NO CORS ISSUE)
  const url = apiURL +
    "?username=" + encodeURIComponent(username) +
    "&password=" + encodeURIComponent(password) +
    "&t=" + Date.now(); // prevent caching

  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (data.status === "success") {

        currentUser = username;
        currentPass = password;

        // 🔹 SORT
        data.grades.sort((a, b) =>
          Number(a.year) - Number(b.year) ||
          Number(a.semester) - Number(b.semester)
        );

        // 🔹 GROUP BY YEAR
        const grouped = {
          1: [],
          2: [],
          3: [],
          4: []
        };

        data.grades.forEach(g => {
          const yr = Number(g.year);
          if (grouped[yr]) grouped[yr].push(g);
        });

        // 🔹 BUILD UI
        let html = `
          <h2>${data.name}</h2>
          <p><strong>Course:</strong> ${data.course}</p>
        `;

        function renderYear(year, label) {
          if (grouped[year].length === 0) return "";

          let rows = "";
          grouped[year].forEach(g => {
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
            <table border="1" cellpadding="5">
              <tr>
                <th>Semester</th>
                <th>Course Code</th>
                <th>Subject</th>
                <th>Teacher</th>
                <th>Grade</th>
              </tr>
              ${rows}
            </table>
            <br>
          `;
        }

        html += renderYear(1, "🎓 First Year");
        html += renderYear(2, "🎓 Second Year");
        html += renderYear(3, "🎓 Third Year");
        html += renderYear(4, "🎓 Fourth Year");

        // 🔹 BUTTONS
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

// 🔹 ENTER KEY LOGIN
document.getElementById("password").addEventListener("keypress", e => {
  if (e.key === "Enter") login();
});

// 🔹 REFRESH
function refreshGrades() {
  if (currentUser && currentPass) {
    login(currentUser, currentPass);
  }
}

// 🔹 LOGOUT
function logout() {
  currentUser = null;
  currentPass = null;
  location.reload();
}
