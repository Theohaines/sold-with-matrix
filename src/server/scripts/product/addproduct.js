const sqlite3 = require('sqlite3');
const path = require('path');
const toolkit = require('../toolkit.js');

async function addProduct(name, sku, category, store){
    //First validate store exists

    var validateStore = await toolkit.validateStore(store);

    if (!validateStore){
        return "err";
    }

    // Next validate sku

    if (sku >= 1000000 || sku <= 99999){
        return "err";
    }

    // Validate name

    if (name.length < 10){
        return "err";
    }

    // validate category

    var validateCategory = await toolkit.validateCategory(category);

    if (!validateCategory){
        return "err";
    }

    // If all checks have passed add to table

    var validatedAdded = await addProductToDB(name, sku, category, store);

    if (!validatedAdded){
        return "err";
    }

    return true;
}

async function addProductToDB(name, sku, category, store){
    var db = new sqlite3.Database(path.resolve('swm.sqlite'));

    var validated = await new Promise((resolve, reject) => {
        db.run("INSERT INTO products (P_NAME, P_SKU, P_CATEGORY, P_STORE) VALUES (?, ?, ?, ?)", [name, sku, category, store], (err) => {
            if (err){
                console.error(err);
                resolve(false);
            }

            resolve(true)
        });
    })

    db.close();
    return validated;
}

module.exports = { addProduct }