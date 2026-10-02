const loginForm = document.getElementById("loginform");
const loginMessage = document.getElementById("login-message");
// Demo credentials only. Never put real admin credentials in front-end JavaScript.
const DEMO_ADMIN = "atharva@123";
const DEMO_PASSWORD = "19191818";
loginForm.addEventListener("submit", event => {
  event.preventDefault();
  const admin = document.getElementById("Admin").value.trim();
  const password = document.getElementById("password").value;
  if (admin === DEMO_ADMIN && password === DEMO_PASSWORD) {
    localStorage.setItem("islogedin", "true");
    window.location.href = "dashboard.html";
  } else {
    loginMessage.textContent = "Invalid username or password. Please try again.";
    loginMessage.className = "login-message show error";
  }
});