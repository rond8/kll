const apiURL = "https://script.google.com/macros/s/AKfycbxhAkwYwx17v6VSLfe8e448QBnIDdxm1mD6knfb6_4sJ41WwYeBzUcYtxlDec3A1Qo/exec";

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

  fetch(apiURL, {
    method: "POST",
    body: JSON.stringify({ username, password }),
  })
    .then(res => res.json())
    .then(data => {
      if (data.status === "success") {

        currentUser = username;
        currentPass = password;

        // SORT properly
        data.grades.sort((a, b) =>
          Number(a.year) - Number(b.year) ||
          Number(a.semester) - Number(b.semester)
        );

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
          <button onclick="logout()">Logout</button>
          <button onclick="location.href='schedule.html'">CLASS SCHEDULE</button>
          <button onclick="refreshGrades()">Refresh Grades</button>
        `;

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

// ENTER KEY LOGIN
document.getElementById("password").addEventListener("keypress", e => {
  if (e.key === "Enter") login();
});

// REFRESH
function refreshGrades() {
  if (currentUser && currentPass) {
    login(currentUser, currentPass);
  }
}

// LOGOUT
function logout() {
  currentUser = null;
  currentPass = null;
  location.reload();
}
