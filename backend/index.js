let form = document.getElementById("form");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  // window.location.href = "/TrendBazaar/frontend/SignUp.html";
  console.log("clicked");
  window.location.href = "/frontend/SignUp.html";
});

let indianbutton = document.getElementById("indian");
indianbutton.addEventListener("click", function (event) {
  event.preventDefault();
  // window.location.href = "/TrendBazaar/frontend/SignUp.html";
  console.log("clicked");
  window.location.href = "/frontend/homepage.html";
});
