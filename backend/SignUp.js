import { baseUrl } from "./baseUrl.js";

let form = document.getElementById("form");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  let username = form.username.value;
  let email = form.email.value;
  let password = form.password.value;
  let Mobile = form.Mobile.value;
  let userObj = { username, email, password, Mobile };

  fetch(`${baseUrl}/users`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(userObj),
  })
    .then(() => {
      alert("successfully user added");
      window.location.href = "/index.html";
    })
    .catch((err) => {
      alert("something went wrong");
    });
});
