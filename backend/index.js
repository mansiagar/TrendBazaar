let form = document.getElementById("form");
form.addEventListener("submit", function (event) {
  event.preventDefault();

  window.location.href = "/TrendBazaar/frontend/SignUp.html";

  // window.location.href = "/frontend/SignUp.html";
});

let indianbutton = document.getElementById("indian");
indianbutton.addEventListener("click", function (event) {
  event.preventDefault();
  window.location.href = "/TrendBazaar/frontend/homepage.html";

  // window.location.href = "/frontend/homepage.html";
});
let logo = document.getElementById("logo");
logo.addEventListener("click", function () {
  window.location.href = "/TrendBazaar/frontend/admin.html";
  // window.location.href = "/frontend/admin.html";
});
