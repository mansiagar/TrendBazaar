import { baseUrl } from "./baseUrl.js";
let form = document.getElementById("productForm");
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const category = document.getElementById("category").value;
  const type = document.getElementById(category)?.value;

  const name = document.getElementById("name").value;
  const price = parseFloat(document.getElementById("price").value);
  const size = document
    .getElementById("size")
    .value.split(",")
    .map((s) => s.trim());
  const color = document.getElementById("color").value;
  const material = document.getElementById("material").value;
  const inStock = document.getElementById("inStock").value === "true";
  const image = document.getElementById("image").value;

  const newProduct = {
    type,
    id: Date.now(), // Generate a unique ID for the product
    name,
    price,
    size,
    color,
    material,
    inStock,
    image,
  };
  fetch(`${baseUrl}/indianwear`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(newProduct),
  })
    .then(() => {
      alert("successfully user added");
    })
    .catch((err) => {
      alert("something went wrong");
    });
});
