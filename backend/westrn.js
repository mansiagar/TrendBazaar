import { baseUrl } from "./baseUrl.js";
window.onload = async function () {
  try {
    let arr = await getdata();

    //let select = document.getElementById("select");
    let data = []; // to hold filtered data
    // display default data

    let defaultData = arr.filter((item) => item.type === "tops");
    console.log("default data", defaultData);
    data = defaultData;
    console.log("current data", data);
    displaydata(data);

    // eventlistener for type change
    select.addEventListener("change", function () {
      let typeToDisplay = select.value;

      if (typeToDisplay === "tops") {
        data = arr.filter((item) => item.type == "tops");
      } else if (typeToDisplay === "jeans") {
        data = arr.filter((item) => item.type == "jeans");
      } else {
        console.error("Invalid type specified");
        return;
      }
      displaydata(data);
    });

    // Event listener for color change
    let filtercolor = document.getElementById("color");
    filtercolor.addEventListener("change", function () {
      let selectedColor = filtercolor.value;

      let filteredData = data;
      if (selectedColor !== "all") {
        // Apply color filter if not 'all'
        filteredData = data.filter((item) => item.color === selectedColor);
      }
      displaydata(filteredData);
    });

    // Event listener for fabric change
    let filterFabric = document.getElementById("Fabric");
    filterFabric.addEventListener("change", function () {
      let selectFabric = filterFabric.value;

      let filteredData = data;
      if (selectFabric != "Fabric") {
        filteredData = data.filter((item) => item.material === selectFabric);
      }
      displaydata(filteredData);
    });

    // Event listener for sorting by price
    let sortPrice = document.getElementById("Price");
    sortPrice.addEventListener("change", function () {
      let sortOrder = sortPrice.value;

      let sortedData = [...data]; // Clone the array to avoid mutating original
      if (sortOrder === "htl") {
        // Sort High to Low
        sortedData.sort((a, b) => b.price - a.price);
      } else if (sortOrder === "lth") {
        // Sort Low to High
        sortedData.sort((a, b) => a.price - b.price);
      }
      displaydata(sortedData);
    });

    // Event Listener for sorting by alpha
    let sortalpha = document.getElementById("Alpha");
    sortalpha.addEventListener("change", function () {
      let sortalphaOrder = sortalpha.value;

      let sortedData = [...data];
      // sort a to z
      if (sortalphaOrder == "atoz") {
        sortedData.sort((a, b) => {
          if (a.name > b.name) {
            return 1;
          } else {
            return -1;
          }
        });
        displaydata(sortedData);
      } else {
        sortedData.sort((a, b) => {
          if (a.name > b.name) {
            return -1;
          } else {
            return 1;
          }
        });
        displaydata(sortedData);
      }
    });
  } catch (err) {
    console.log(err);
  }
};

// get data function
async function getdata() {
  try {
    let res = await fetch(`${baseUrl}/westrnwear`);

    let dataoj = res.json();
    console.log(dataoj);
    return dataoj;
  } catch (err) {
    console.log(err);
  }
}

// // display arr
let displaydata = (arr) => {
  const productDiv = document.getElementById("products");
  productDiv.innerHTML = "";

  arr.map((el, i) => {
    let product = document.createElement("div");

    let kurtieImg = document.createElement("img");
    kurtieImg.src = `${el.image}`;
    kurtieImg.alt = `${el.name}`;
    kurtieImg.style.width = "250px";
    kurtieImg.style.height = "250px";

    let price_stock = document.createElement("h3");
    price_stock.textContent = `Price : ${el.price}      ${
      el.inStock ? "In Stock" : "Out Of Stock"
    }`;

    let title = document.createElement("h3");
    title.textContent = `${el.name}`;

    let stock = document.createElement("h3");
    stock.textContent = ``;

    let wishCartdiv = document.createElement("div");
    wishCartdiv.setAttribute("class", "wishCartdiv");

    let wishlist = document.createElement("button");
    wishlist.setAttribute("id", "wishlist");
    wishlist.textContent = "Add to WishList";
    wishlist.addEventListener("click", function () {
      console.log(" wishlist function clicked", el);

      fetch(`${baseUrl}/users`)
        .then((res) => res.json())
        .then((data) => {
          if (data.length != 0) {
            addProductWishlist(el);
          } else {
            alert("user not present");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });

    let cart = document.createElement("button");
    cart.setAttribute("id", "cart");
    cart.textContent = "Add to Cart";
    cart.addEventListener("click", function () {
      console.log("clicked", el);
      fetch(`${baseUrl}/users`)
        .then((res) => res.json())
        .then((data) => {
          if (data.length != 0) {
            addToCart(el);
          } else {
            alert("user not present");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });

    wishCartdiv.append(wishlist, cart);
    product.append(kurtieImg, title, price_stock, wishCartdiv);
    productDiv.append(product);
  });
};
let addProductWishlist = async (product) => {
  try {
    // Fetch the current wishlist from the server
    let response = await fetch(`${baseUrl}/wishlist`);
    let wishlist = await response.json();
    console.log("wishlist", wishlist);

    // Check if the product is already in the wishlist
    let isProductInWishlist = wishlist.some(
      (item) => item.name === product.name
    );

    if (!isProductInWishlist) {
      // Add the product to the server-side wishlist
      let addResponse = await fetch(`${baseUrl}/wishlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      if (addResponse.ok) {
        alert("Product successfully added to Wishlist");
        confirm("Are you sure you want to add this item to the wishlist?");
        // window.location.href = "/TrendBazaar/frontend/wishlist.html";
        window.location.href = "./wishlist.html";
      } else {
        alert("Failed to add product to Wishlist. Please try again.");
      }
    } else {
      alert("This product is already in your wishlist.");
    }
  } catch (error) {
    console.error("Error adding product to wishlist:", error);
    alert("Something went wrong. Please try again later.");
  }
};

// add to cart function
//add to cart function
let addToCart = async (product) => {
  try {
    let response = await fetch(`${baseUrl}/cart`);
    let cart = await response.json();
    console.log("cart item ", cart);

    // Check if the product is already in the cart
    let isProductInCart = cart.some((item) => item.name === product.name);
    if (!isProductInCart) {
      // Add the product to the cart
      let addResponse = await fetch(`${baseUrl}/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
      if (addResponse.ok) {
        alert("Product successfully added to the cart!");
        window.location.href = "/TrendBazaar/frontend/cart.html"; // Redirect to cart page
        //window.location.href = "/frontend/cart.html"; // Redirect to cart page
      }
    } else {
      alert("This product is already in your cart.");
    }
  } catch (error) {
    console.log("Error adding product to cart:", error);
    alert("Something went wrong. Please try again later.");
  }
};
let form = document.getElementById("form");
form.addEventListener("submit", function (event) {
  event.preventDefault();

  //window.location.href = "/TrendBazaar/frontend/SignUp.html";

  window.location.href = "./SignUp.html";
});
