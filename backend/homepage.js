window.onload = async function () {
  try {
    let arr = await getdata();
    let typeToDisplay = "sarees";

    let data;
    if (typeToDisplay === "kurties") {
      data = arr.find((item) => item.type == "kurties").items;
    } else if (typeToDisplay === "sarees") {
      data = arr.find((item) => item.type == "sarees").items;
    } else {
      console.error("Invalid type specified");
      return;
    }
    displaydata(data);
  } catch (err) {
    console.log(err);
  }
};
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
    let title = document.createElement("h3");
    title.textContent = `${el.name}`;

    let kurtieImg = document.createElement("img");
    kurtieImg.src = `${el.image}`;
    kurtieImg.alt = `${el.name}`;
    kurtieImg.style.width = "200px";

    product.append(title, kurtieImg);
    productDiv.append(product);
  });
};
