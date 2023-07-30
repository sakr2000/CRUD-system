let ProductName = document.getElementById("ProductName");
let ProductCategory = document.getElementById("ProductCategory");
let ProductPrice = document.getElementById("ProductPrice");
let ProductDescription = document.getElementById("ProductDescription");
let search = document.getElementById("search");
let addProduct = document.getElementById("add_product");
let products = [];
let Uproduct = [];

// Get old products from local storage -if there-
if (localStorage.getItem("products") == null) {
  products = [];
} else {
  products = JSON.parse(localStorage.getItem("products"));
  display();
}

const setError = (element, message) => {
  const parent = element.parentElement;
  const error = parent.querySelector(".error");
  error.innerText = message;
  element.classList.add("invalid");
};
const setValid = (element) => {
  const parent = element.parentElement;
  const error = parent.querySelector(".error");
  error.innerText = "";
  element.classList.remove("invalid");
};

function checkname() {
  let re = /^[a-zA-Z ][a-z A-Z 0-9]{2,50}$/;
  let name = ProductName.querySelector("input").value;
  if (name == "") {
    setError(ProductName, "Product Name can't be empty ");
  } else if (!name.match(re)) {
    setError(ProductName, "Product Name not valid ");
  } else {
    setValid(ProductName);
  }
}
function checkCategory() {
  let re = /^[a-z A-Z 0-9_-]{2,50}$/;
  let name = ProductCategory.querySelector("input").value;
  if (name == "") {
    setError(ProductCategory, "Product Category can't be empty ");
  } else if (!name.match(re)) {
    setError(ProductCategory, "Product Category not valid ");
  } else {
    setValid(ProductCategory);
  }
}
function checkPrice() {
  let re = /^[0-9]{1,20}$/;
  let name = ProductPrice.querySelector("input").value;
  if (name == "") {
    setError(ProductPrice, "Product Price can't be empty ");
  } else if (!name.match(re)) {
    setError(ProductPrice, "Product Price is unresonable ");
  } else {
    setValid(ProductPrice);
  }
}
function checkDescription() {
  let name = ProductDescription.querySelector("input").value;
  if (name == "") {
    setError(ProductDescription, "Product Description can't be empty ");
  } else {
    setValid(ProductDescription);
  }
}

// Validate values on keyup
ProductName.querySelector("input").onkeyup = () => {
  checkname();
};
ProductCategory.querySelector("input").onkeyup = () => {
  checkCategory();
};
ProductPrice.querySelector("input").onkeyup = () => {
  checkPrice();
};
ProductDescription.querySelector("input").onblur = () => {
  checkDescription();
};

// Add product if data is valid
addProduct.addEventListener("click", () => {
  checkname();
  checkCategory();
  checkPrice();
  checkDescription;
  if (
    !ProductName.classList.contains("invalid") &&
    !ProductCategory.classList.contains("invalid") &&
    !ProductPrice.classList.contains("invalid") &&
    !ProductDescription.classList.contains("invalid")
  ) {
    let product = {
      name: ProductName.querySelector("input").value,
      cate: ProductCategory.querySelector("input").value,
      price: ProductPrice.querySelector("input").value,
      des: ProductDescription.querySelector("input").value,
    };
    if (Uproduct.length == 0) {
      products.push(product);
      localStorage.setItem("products", JSON.stringify(products));
      display();
    } else {
      doUpdate(product);
      addProduct.innerHTML = "Add Product";
    }
    clear();
  }
});

function display() {
  let tdata = "";

  for (let i = 0; i < products.length; i++) {
    tdata += `         <tr>
<td>${i + 1}</td>
<td>${products[i].name}</td>
<td>${products[i].cate}</td>
<td>${products[i].price}</td>
<td>${products[i].des}</td>
<td><button onclick="Delete(${i})" class="btn btn-danger">Delete</button></td>
<td><button onclick="Update(${i})" class="btn btn-info">Update</button></td>
</tr>`;
  }
  document.getElementById("table").innerHTML = tdata;
}

function Delete(i) {
  products.splice(i, 1);
  localStorage.setItem("products", JSON.stringify(products));
  display();
}

function Update(i) {
  Uproduct.push(i);
  ProductName.querySelector("input").value = products[i].name;
  ProductCategory.querySelector("input").value = products[i].cate;
  ProductPrice.querySelector("input").value = products[i].price;
  ProductDescription.querySelector("input").value = products[i].des;
  addProduct.innerHTML = "Update Product";
}

function doUpdate(p) {
  products.splice(Uproduct[0], 1, p);
  localStorage.setItem("products", JSON.stringify(products));
  display();
  Uproduct = [];
}

function clear() {
  ProductName.querySelector("input").value = "";
  ProductCategory.querySelector("input").value = "";
  ProductPrice.querySelector("input").value = "";
  ProductDescription.querySelector("input").value = "";
}

// Search
search.addEventListener("keyup", () => {
  box = ``;
  for (i = 0; i < products.length; i++) {
    if (products[i].name.toUpperCase().includes(search.value.toUpperCase())) {
      box += `         <tr>
          <td>${i + 1}</td>
          <td>${products[i].name}</td>
          <td>${products[i].cate}</td>
          <td>${products[i].price}</td>
          <td>${products[i].des}</td>
          <td><button onclick="Delete(${i})" class="btn btn-danger">Delete</button></td>
          <td><button onclick="Update(${i})" class="btn btn-info">Update</button></td>
          </tr>`;
    }
  }
  document.getElementById("table").innerHTML = box;
});
