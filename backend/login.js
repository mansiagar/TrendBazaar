import { baseUrl } from "./baseUrl.js";

let form = document.getElementById("form");
form.addEventListener("submit", function (event) {
  event.preventDefault();

  let email = form.email.value;
  let password = form.password.value;
  console.log(email, password);

  fetch(`${baseUrl}/users`)
    .then((res) => res.json())
    .then((data) => {
      let user = data.filter((el) => el.email == email);
      if (user.length != 0) {
        if (user[0].password == password) {
          localStorage.setItem("userid", user[0].id);
          alert("successfully login");
          //window.location.href = "/TrendBazaar/frontend/homepage.html";
          window.location.href = "./homepage.html";
        } else {
          console.log(err);
          alert("password incorrect");
        }
      } else {
        alert("user not present");
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
