window.onload = async function () {
  try {
    let arr = await getdata();
    let select = document.getElementById("select");
    let data = []; // to hold filtered data
    // display default data
    let defaultData = arr.find((item) => item.type === "kurties")?.items;
    data = defaultData;
    displaydata(data);

    // eventlistener for type change
    select.addEventListener("change", function () {
      let typeToDisplay = select.value;

      if (typeToDisplay === "kurties") {
        data = arr.find((item) => item.type == "kurties").items;
      } else if (typeToDisplay === "sarees") {
        data = arr.find((item) => item.type == "sarees").items;
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

    //
  } catch (err) {
    console.log(err);
  }
};

// get data function
async function getdata() {
  try {
    let res = await fetch("http://localhost:3000/indianwear");
    let dataoj = res.json();
    // console.log(dataoj);
    return dataoj;
  } catch (err) {
    console.log(err);
  }
}
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

    let wishlist = document.createElement("button");
    wishlist.textContent = "Add to WishList";

    product.append(kurtieImg, title, price_stock, wishlist);
    productDiv.append(product);
  });
};
