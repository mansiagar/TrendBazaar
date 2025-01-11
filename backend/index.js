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

let westrnbutton = document.getElementById("westrn");
westrnbutton.addEventListener("click", function (event) {
  event.preventDefault();
  window.location.href = "/TrendBazaar/frontend/westrn.html";

  //window.location.href = "/frontend/westrn.html";
});

let logo = document.getElementById("logo");
logo.addEventListener("click", function () {
  window.location.href = "/TrendBazaar/frontend/admin.html";
  //window.location.href = "/frontend/admin.html";
});

let circleimg1 = document.getElementById("circleimg1");
circleimg1.addEventListener("click", function (event) {
  event.preventDefault();
  window.location.href = "/TrendBazaar/frontend/homepage.html";

  //window.location.href = "/frontend/homepage.html";
});
let circleimg4 = document.getElementById("circleimg4");
circleimg4.addEventListener("click", function (event) {
  event.preventDefault();
  window.location.href = "/TrendBazaar/frontend/homepage.html";

  //window.location.href = "/frontend/homepage.html";
});

let circleimg3 = document.getElementById("circleimg3");
circleimg3.addEventListener("click", function (event) {
  event.preventDefault();
  window.location.href = "/TrendBazaar/frontend/homepage.html";

  //window.location.href = "/frontend/westrn.html";
});
