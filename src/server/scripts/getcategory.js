const sqlite3 = require('sqlite3');
const path = require('path');

async function getCategory(category){
    var db = new sqlite3.Database(path.resolve('swm.sqlite'));

    var products = await new Promise((reslove, reject) => {
        db.all("SELECT * FROM products WHERE P_CATEGORY = ?", [category], (err, rows) => {
            if (err){
                console.error(err);
                reslove("err");
            }

            reslove(rows)
        });
    })

    return products;
}

module.exports = { getCategory }