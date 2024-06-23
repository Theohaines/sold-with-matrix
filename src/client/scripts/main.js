const output = document.getElementById('output');

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
    
}