import { baseUrl } from "./baseUrl.js";

// windows on load function
window.onload = async function () {
  try {
    let arr = await getdata();

    let data = []; // to hold filtered data
    // display default data
    // console.log(arr);
    // let defaultData = arr.map((el,i) => item.type === "kurties");
    // // console.log("default data", defaultData);
    data = arr;
    // console.log(data);
    displaydata(data);

    // eventlistener for type change
    select.addEventListener("change", function () {
      let typeToDisplay = select.value;

      if (typeToDisplay === "kurties") {
        data = arr.filter((item) => item.type == "kurties");
      } else if (typeToDisplay === "sarees") {
        data = arr.filter((item) => item.type == "sarees");
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

// display arr
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

    let cart = document.createElement("button");
    cart.setAttribute("id", "cart");
    cart.textContent = "Add to Cart";
    cart.addEventListener("click", function () {
      console.log("clicked", el);
      addToCart(el);
    });

    let RemoveItem = document.createElement("button");
    RemoveItem.setAttribute("id", "wishlist");
    RemoveItem.textContent = "Delete ";
    RemoveItem.addEventListener("click", function () {
      console.log(" delete item", el);
      removeProductWishlist(el);
    });

    wishCartdiv.append(cart, RemoveItem);
    product.append(kurtieImg, title, price_stock, wishCartdiv);
    productDiv.append(product);
  });
};

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
      window.location.href = "/TrendBazaar/frontend/cart.html"; // Redirect to cart page
      //window.location.href = "/frontend/cart.html";
    }
  } catch (error) {
    console.log("Error adding product to cart:", error);
    alert("Something went wrong. Please try again later.");
  }
};

// get data function
async function getdata() {
  try {
    let res = await fetch(`${baseUrl}/wishlist`);

    let dataoj = res.json();
    // console.log(dataoj);
    return dataoj;
  } catch (err) {
    console.log(err);
  }
}

const logout = document.getElementById("Logout");

if (!logout) {
  console.error("Logout button not found in the DOM");
} else {
  logout.addEventListener("click", function () {
    // Get the user's ID from localStorage
    const userId = localStorage.getItem("userid");

    if (!userId) {
      alert("No user is logged in");
      return;
    }

    // Send a DELETE request to remove the user by their ID
    fetch(`${baseUrl}/users/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          alert("Successfully logged out and user deleted");

          // Clear localStorage and redirect to the homepage
          localStorage.removeItem("userid");
          window.location.href = "./homepage.html";
        } else {
          alert("Failed to log out. Please try again.");
        }
      })
      .catch((err) => {
        console.error("Error during logout:", err);
        alert("An error occurred. Please check the console for details.");
      });
  });
}

//remove cart
let removeProductWishlist = async (product) => {
  try {
    // Fetch the current wishlist from the server
    let response = await fetch(`${baseUrl}/wishlist`);
    let wishlist = await response.json();
    console.log("wishlist", wishlist);

    // Check if the product is already in the wishlist
    let isProductInWishlist = wishlist.some(
      (item) => item.name === product.name
    );

    if (isProductInWishlist) {
      // Add the product to the server-side wishlist
      let deleteResponse = await fetch(`${baseUrl}/wishlist/${product.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (deleteResponse.ok) {
        alert("Product successfully Delete to Wishlist");
        confirm("Are you sure you want to delete this item to the wishlist?");
        // window.location.href = "/TrendBazaar/frontend/wishlist.html";
        window.location.href = "./homepage.html";
      } else {
        alert("Failed to delete product to Wishlist. Please try again.");
      }
    } else {
      alert("This product is already in your wishlist.");
    }
  } catch (error) {
    console.error("Error delete product from wishlist:", error);
    alert("Something went wrong. Please try again later.");
  }
};
