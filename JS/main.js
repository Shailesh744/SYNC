let totalEl = document.getElementById("total");
let titleInput = document.getElementById("title");
let priceInput = document.getElementById("price");
let taxesInput = document.getElementById("taxes");
let adsInput = document.getElementById("ads");
let discountInput = document.getElementById("discount");
let countInput = document.getElementById("count");
let categoryInput = document.getElementById("cat");
let searchInput = document.getElementById("search");
let createBtn = document.getElementById("btn");
let searchByTitleBtn = document.getElementById("search-title");
let searchByCatBtn = document.getElementById("search-cat");
let tableBody = document.getElementById("body");
let updateBtn = document.getElementById("update");
let deleteBtn = document.getElementById("delete");
let deleteAllEl = document.getElementById("delete-all");

let appMood = "Create";
let stash;
let searchMood = "title";

let productsDataArray = [];
if (window.localStorage.getItem("Products")) {
  productsDataArray = JSON.parse(window.localStorage.getItem("Products"));
}

function getTotal() {
  if (priceInput.value != "") {
    let result =
      +priceInput.value +
      +taxesInput.value +
      +adsInput.value -
      +discountInput.value;
    totalEl.innerHTML = result;
    totalEl.style.backgroundColor = "#040";
  } else {
    totalEl.innerHTML = "";
    totalEl.style.backgroundColor = "#a00d02";
  }
}

function clearInputs() {
  titleInput.value = "";
  priceInput.value = "";
  taxesInput.value = "";
  adsInput.value = "";
  discountInput.value = "";
  totalEl.innerHTML = "";
  totalEl.style.backgroundColor = "#a00d02";
  countInput.value = "";
  categoryInput.value = "";
}

function showData() {
  let table = "";
  for (let i = 0; i < productsDataArray.length; i++) {
    table += `
    <tr>
      <td>${i + 1}</td>
      <td>${productsDataArray[i].title}</td>
      <td>${productsDataArray[i].price}</td>
      <td>${productsDataArray[i].taxes}</td>
      <td>${productsDataArray[i].ads}</td>
      <td>${productsDataArray[i].discount}</td>
      <td>${productsDataArray[i].total}</td>
      <td>${productsDataArray[i].category}</td>
      <td><button onclick="updateData(${i})" id="update">update</button></td>
      <td><button onclick="deleteProduct(${i})" id="delete">Delete</button></td>
    </tr>
    `;
  }
  tableBody.innerHTML = table;
  if (productsDataArray.length > 0) {
    deleteAllEl.innerHTML = `
    <button onclick="deleteAllProducts()" >Delete All (${productsDataArray.length})</button>
    `;
  } else {
    deleteAllEl.innerHTML = "";
  }
}
showData();

createBtn.onclick = function () {
  const productData = {
    title: titleInput.value.toLowerCase(),
    price: priceInput.value,
    taxes: taxesInput.value,
    ads: adsInput.value,
    discount: discountInput.value,
    total: totalEl.innerHTML,
    count: countInput.value,
    category: categoryInput.value.toLowerCase(),
  };
  if (titleInput.value && priceInput.value && categoryInput.value && countInput.value <= 100) {
    if (appMood === "Create") {
      if (productData.count > 1) {
        for (let i = 0; i < productData.count; i++) {
          productsDataArray.push(productData);
        }
      } else {
        productsDataArray.push(productData);
      }
    } else {
      productsDataArray[stash] = productData;
      countInput.style.display = "block";
      createBtn.innerHTML = "Create";
      appMood = "Create";
    }
    clearInputs();
  }
  window.localStorage.setItem("Products", JSON.stringify(productsDataArray));
  showData();
};

function deleteProduct(id) {
  productsDataArray.splice(id, 1);
  window.localStorage.setItem("Products", JSON.stringify(productsDataArray));
  showData();
}

function deleteAllProducts() {
  productsDataArray = [];
  window.localStorage.setItem("Products", JSON.stringify(productsDataArray));
  showData();
}

function updateData(id) {
  titleInput.value = productsDataArray[id].title;
  priceInput.value = productsDataArray[id].price;
  taxesInput.value = productsDataArray[id].taxes;
  adsInput.value = productsDataArray[id].ads;
  discountInput.value = productsDataArray[id].discount;
  categoryInput.value = productsDataArray[id].category;
  countInput.style.display = "none";
  getTotal();
  createBtn.innerHTML = "Update";
  appMood = "Update";
  stash = id;
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

function getSearchMood(id) {
  if (id === "search-title") {
    searchMood = "title";
    searchInput.placeholder = "Search By Title";
  } else {
    searchMood = "category";
    searchInput.placeholder = "Search By Category";
  }
  searchInput.focus();
  searchInput.value = "";
  showData();
}

function search(value) {
  let table = "";
  if (searchMood === "title") {
    for (let i = 0; i < productsDataArray.length; i++) {
      if (productsDataArray[i].title.includes(value.toLowerCase())) {
        table += `
          <tr>
            <td>${i}</td>
            <td>${productsDataArray[i].title}</td>
            <td>${productsDataArray[i].price}</td>
            <td>${productsDataArray[i].taxes}</td>
            <td>${productsDataArray[i].ads}</td>
            <td>${productsDataArray[i].discount}</td>
            <td>${productsDataArray[i].total}</td>
            <td>${productsDataArray[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">update</button></td>
            <td><button onclick="deleteProduct(${i})" id="delete">Delete</button></td>
          </tr>
          `;
      }
    }
  } else {
    for (let i = 0; i < productsDataArray.length; i++) {
      if (productsDataArray[i].category.includes(value)) {
        table += `
          <tr>
            <td>${i}</td>
            <td>${productsDataArray[i].title}</td>
            <td>${productsDataArray[i].price}</td>
            <td>${productsDataArray[i].taxes}</td>
            <td>${productsDataArray[i].ads}</td>
            <td>${productsDataArray[i].discount}</td>
            <td>${productsDataArray[i].total}</td>
            <td>${productsDataArray[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">update</button></td>
            <td><button onclick="deleteProduct(${i})" id="delete">Delete</button></td>
          </tr>
          `;
      }
    }
  }
  tableBody.innerHTML = table;
}
