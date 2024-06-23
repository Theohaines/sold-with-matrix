const sqlite3 = require('sqlite3');
const path = require('path');

async function getAllStores(){
    var db = new sqlite3.Database(path.resolve('swm.sqlite'));

    var stores = await new Promise((resolve, reject) => {
        db.all("SELECT * FROM stores", (err, rows) => {
            if (err){
                console.error(err);
                resolve("err");
            }

            resolve(rows)
        });
    })

    db.close();
    return stores;
}

async function validateStore(store){
    var db = new sqlite3.Database(path.resolve('swm.sqlite'));

    var stores = await new Promise((resolve, reject) => {
        db.get("SELECT * FROM stores WHERE S_NUMBER = ?", [store], (err, rows) => {
            if (err){
                console.error(err);
                resolve(false);
            }

            if (!rows){
                resolve(false);
            }

            resolve(true)
        });
    })

    db.close();
    return stores;
}

async function getAllCategorys(){
    var db = new sqlite3.Database(path.resolve('swm.sqlite'));

    var categorys = await new Promise((resolve, reject) => {
        db.all("SELECT * FROM categorys", (err, rows) => {
            if (err){
                console.error(err);
                resolve("err");
            }

            resolve(rows)
        });
    })

    db.close();
    return categorys;
}

async function validateCategory(category){
    var db = new sqlite3.Database(path.resolve('swm.sqlite'));

    var category = await new Promise((resolve, reject) => {
        db.get("SELECT * FROM categorys WHERE C_NAME = ?", [category], (err, rows) => {
            if (err){
                console.error(err);
                resolve(false);
            }

            if (!rows){
                resolve(false);
            }

            resolve(true)
        });
    })

    db.close();
    return category;
}

async function getAllProducts(store){
    var db = new sqlite3.Database(path.resolve('swm.sqlite'));

    var products = await new Promise((reslove, reject) => {
        db.all("SELECT * FROM products WHERE P_STORE = ?", [store], (err, rows) => {
            if (err){
                console.error(err);
                resolve("err");
            }

            reslove(rows)
        });
    })

    db.close();
    return products;
}

module.exports = { getAllStores, validateStore, getAllCategorys, validateCategory, getAllProducts }