var ProductName = document.getElementById("ProductName");
var ProductCategory = document.getElementById("ProductCategory");
var ProductPrice = document.getElementById("ProductPrice");
var ProductDescription = document.getElementById("ProductDescription");
var search = document.getElementById("search");
var products = [];
var Uproduct = [];
if (localStorage.getItem("products") == null) {
    products = []

} else {
    products = JSON.parse(localStorage.getItem("products"))
    display();

}

function getData() {
    var product = {
        name: ProductName.value,
        cate: ProductCategory.value,
        price: ProductPrice.value,
        des: ProductDescription.value
    };
    if (Uproduct.length == 0) {
        products.push(product);
        localStorage.setItem("products", JSON.stringify(products))
        display();
    } else {
        doUpdate(product);
    }
    clear()

}

function display() {
    var tdata = "";

    for (var i = 0; i < products.length; i++) {
        tdata += `         <tr>
<td>${i+1}</td>
<td>${products[i].name}</td>
<td>${products[i].cate}</td>
<td>${products[i].price}</td>
<td>${products[i].des}</td>
<td><button onclick="Delete(${i})" class="btn btn-danger">Delete</button></td>
<td><button onclick="Update(${i})" class="btn btn-info">Update</button></td>
</tr>`;
    };
    document.getElementById("table").innerHTML = tdata;
}

function Delete(i) {
    products.splice(i, 1);
    localStorage.setItem("products", JSON.stringify(products));
    display();
}

function Update(i) {
    Uproduct.push(i);
    ProductName.value = products[i].name;
    ProductCategory.value = products[i].cate;
    ProductPrice.value = products[i].price;
    ProductDescription.value = products[i].des;
}

function doUpdate(p) {
    products.splice(Uproduct[0], 1, p);
    localStorage.setItem("products", JSON.stringify(products));
    display();
    Uproduct = [];
}

function clear() {
    ProductName.value = "";
    ProductCategory.value = "";
    ProductPrice.value = "";
    ProductDescription.value = "";
}

function Search() {
    box = ``;
    for (i = 0; i < products.length; i++) {
        if (products[i].name.toUpperCase().includes(search.value.toUpperCase())) {
            box += `         <tr>
        <td>${i+1}</td>
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
}