window.onload = async function () {
  try {
    let arr = await getdata();
    displaydata(arr);
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
    title.textContent = `${el.type}`;

    product.append(title);
    productDiv.append(product);
  });
};
