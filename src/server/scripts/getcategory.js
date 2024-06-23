const sqlite3 = require('sqlite3');
const path = require('path');

async function getCategory(category, store){
    var db = new sqlite3.Database(path.resolve('swm.sqlite'));

    var products = await new Promise((reslove, reject) => {
        db.all("SELECT * FROM products WHERE P_CATEGORY = ? AND P_STORE = ?", [category, store], (err, rows) => {
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

module.exports = { getCategory }