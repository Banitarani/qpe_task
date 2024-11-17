const users = JSON.parse(localStorage.getItem("users")) || []; //store value in json format
const signupBtn = document.getElementById("signupBtn");
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const goLoginBtn = document.getElementById("goLoginBtn");

function showView(view) {
  document.getElementById("signup").style.display =
    view === "signUp" ? "block" : "none";
  document.getElementById("login").style.display =
    view === "login" ? "block" : "none";
  document.getElementById("dashboard").style.display =
    view === "dashboard" ? "block" : "none";
}

// adding event
signupBtn.addEventListener("click", signUp);
loginBtn.addEventListener("click", login);
logoutBtn.addEventListener("click", logOut);
goLoginBtn.addEventListener("click", () => showView("login"));

function signUp() {
  const username = document.getElementById("username").value;
  const useremail = document.getElementById("useremail").value;
  const userpassword = document.getElementById("userpassword").value;

  const newUser = {
    name: username,
    email: useremail,
    password: userpassword,
  };
  // check if already user exsis
  const userExist = users.find((user) => user.name === username);
  if (userExist) {
    alert("username is already exist");
    return;
  }
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));
  alert("SignUp Successful!You can now login.");
  showView("login");
}
//login
function login() {
  const userloginemail = document.getElementById("loginUseremail").value;
  const userloginpassword = document.getElementById("loginPassword").value;
  const storedUser = JSON.parse(localStorage.getItem("users")) || [];
  const user = storedUser.find(
    (user) =>
      user.email === userloginemail && user.password === userloginpassword
  );

  if (user) {
    localStorage.setItem("loggedUser", JSON.stringify(user));
    alert("Login Successfull");
    showDashboard();
  } else {
    alert("invalid credentials");
  }
}

function showDashboard() {
  const user = JSON.parse(localStorage.getItem("loggedUser"));
  if (!user) {
    alert("no user login");
    showView("login");
    return;
  }
  document.getElementById("usernameDisplay").innerText = `Welcome ${user.name}`;
  showView("dashboard");
}

function logOut() {
  localStorage.removeItem("loggedUser");
  alert("You've Successfully logged out!");
  showView("signUp");
}

