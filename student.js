
const apiURL="https://script.google.com/macros/s/AKfycbwa5zoScQ_143N2ts2EcXyFUVlAy51RgYsdj4pgM_rHylux6Xx8sXMJTKijOjY2CS0/exec";

function login(){

document.getElementById("result").innerText="Logging in...";

const username=document.getElementById("username").value.trim();
const password=document.getElementById("password").value.trim();

if(!username||!password){
document.getElementById("result").innerText="Enter username and password";
return;
}

const url=apiURL+"?username="+encodeURIComponent(username)+"&password="+encodeURIComponent(password);

fetch(url)

.then(res=>res.json())

.then(data=>{

if(data.status==="success"){

let subjectRows="";

data.grades.forEach(g=>{

subjectRows+=`
<tr>
<td>${g.subject}</td>
<td>${g.grade}</td>
</tr>
`;

});

document.getElementById("result").innerHTML=`


<h2>${data.name}</h2>

<p>
<strong>Year Level:</strong> ${data.yearlevel}
<br>
<strong>Course:</strong> ${data.course}
</p>

<h3>Grades</h3><h3>FIRST YEAR</h3>

<table>

<tr>
<th>Subject</th>
<th>Grade</th>
</tr>

${subjectRows}

</table>
<button onclick="location.reload()">Logout</button>
<button onclick="location.href='schedule.html'">CLASS SCHEDULE</button>
`;

document.getElementById("login").style.display="none";

}

else{

document.getElementById("result").innerText="❌ Invalid username or password.";

}

})

.catch(()=>{

document.getElementById("result").innerText="⚠️ Cannot connect to server.";

});

}

document.getElementById("password").addEventListener("keypress",function(e){
if(e.key==="Enter")login();
});

