const output = document.getElementById('output');
var currentStore = null;

function init(){
    populateStoresList();

    if (document.getElementById("addCategory")){
        populateCategorysList();
    }
}

function populateStoresList(){
    fetch("/getstores", {
        method: "POST",
        headers: { "Content-Type": "application/json" }
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            
            for (var store of data.stores){
                var storePicker = document.getElementById("storePicker");

                var storeOption = document.createElement("option");
                storeOption.value = store.S_NUMBER;
                storeOption.textContent = (store.S_NUMBER + " " + store.S_NAME)

                storePicker.appendChild(storeOption);
            }
        })
        .catch((error) => console.error(error));
}

function populateCategorysList(){
    fetch("/getallcategorys", {
        method: "POST",
        headers: { "Content-Type": "application/json" }
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            
            for (var category of data.categorys){
                var addCategory = document.getElementById("addCategory");

                var categoryOption = document.createElement("option");
                categoryOption.value = category.C_NAME;
                categoryOption.textContent = category.C_NAME;

                addCategory.appendChild(categoryOption);
            }
        })
        .catch((error) => console.error(error));
}

function getProductsViaCategory(category){
    fetch("/getcategory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category }),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            populateOutput(data);
        })
        .catch((error) => console.error(error));
}

function clearOutput(){
    output.innerHTML = "<tr><th>Name</th><th>SKU</th><th>Category</th><th>Store</th></tr>";

    var tr = document.createElement("tr");
    output.appendChild(tr);
}

function populateOutput(data){
    clearOutput();

    for (var product of data.products){
        var productListing = document.createElement("tr");
        output.appendChild(productListing);

        var productListingName = document.createElement("td");
        productListingName.innerText = ("NAME:", product.P_NAME);
        productListing.appendChild(productListingName);

        var productListingSKU = document.createElement("td");
        productListingSKU.innerText = ("SKU:", product.P_SKU);
        productListing.appendChild(productListingSKU);

        var productListingCategory = document.createElement("td");
        productListingCategory.innerText = ("Category:", product.P_CATEGORY);
        productListing.appendChild(productListingCategory);

        var productListingStore = document.createElement("td");
        productListingStore.innerText = ("Store:", product.P_STORE);
        productListing.appendChild(productListingStore);
    }
}

function loginToStore(){
    var storePicker = document.getElementById("storePicker").value;

    fetch("/logintostore", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ store : storePicker }),
    })
        .then((response) => response.json())
        .then((data) => {
            if (!data.validated){
                alert('Invalid store!');
            } else {
                alert('logged in as ' + storePicker);
            }
        })
        .catch((error) => console.error(error));
}

function addProduct(){
    var productName = document.getElementById("productName").value;
    var productSku = document.getElementById("productSku").value;
    var addCategory = document.getElementById("addCategory").value;

    fetch("/addproduct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name : productName, sku : productSku, category : addCategory }),
    })
        .then((response) => response.json())
        .then((data) => {
            if (!data.validated){
                alert('something went wrong!');
            } else {
                getAllProducts();
            }
        })
        .catch((error) => console.error(error));
}

function getAllProducts(){
    fetch("/getallproducts", {
        method: "POST",
        headers: { "Content-Type": "application/json" }
    })
        .then((response) => response.json())
        .then((data) => {
            populateOutput(data);
        })
        .catch((error) => console.error(error));
}

init();

