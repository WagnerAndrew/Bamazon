// List a set of menu options:
// View Products for Sale
// View Low Inventory
// Add to Inventory
// Add New Product
// If a manager selects View Products for Sale, the app should list every available item: the item IDs, names, prices, and quantities.
// If a manager selects View Low Inventory, then it should list all items with an inventory count lower than five.
// If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.
// If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.


var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require('console.table');

var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazonDB"
});

connection.connect(function (err) {
    if (err) throw err;
    userSearch();
});


//START USER SEARCH FUNCTION
function userSearch() {

        inquirer.prompt([
            {
                type: "list",
                name: "choice",
                message: "What would you like to do:",
                choices: ["View products for sale", "View low inventory", "Add to inventory", "Add new product", "Exit Manager Mode"]
            }

        ]).then(function (manager) {

            switch (manager.choice) {
                case "View products for sale":
                  viewProducts();
                  break;
          
                case "View low inventory":
                  lowInventory();
                  break;
          
                case "Add to inventory":
                  addToInventory();
                  break;
          
                case "Add new product":
                  addNewProduct();
                  break;

                case "Exit Manager Mode":
                    console.log("\nSee ya later!\n");
                        connection.end ();
                break;
                }

        });

}
//END USER SEARCH FUNCTION


function viewProducts() {
    connection.query("SELECT ID, Product, Price, Quantity FROM products", function (err, res) {
        if (err) throw err;

        //Prints Table
        console.log("\n");
        console.table(res);
        console.log("\n");

        userSearch();
    });

}

// SELECT artist FROM top5000 GROUP BY artist HAVING count(*) > 1
// select * from users where length(zip_code) < 5

function lowInventory() {
    connection.query("SELECT * FROM products WHERE (Quantity) < 5", function (err, res) {
        if (err) throw err;

        //Prints Table
        console.log("\n");
        console.table(res);
        console.log("\n");

        userSearch();
    });

}