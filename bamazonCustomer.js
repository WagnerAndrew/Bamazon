
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

    connection.query("SELECT ID, Product, Price FROM products", function (err, res) {
        if (err) throw err;

        //Prints Table
        console.log("\n");
        console.table(res);

        //Runs purchase inquiry
        inquirer.prompt([
            {
                type: "input",
                name: "id",
                message: "What ID number do you want to buy?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            },

            {
                type: "input",
                name: "quantity",
                message: "How many do you want to buy?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }

        ]).then(function (userBuy) {

                connection.query("SELECT * FROM products WHERE ?", { ID: userBuy.id }, function (err, res) {
                    if (err) throw err;

                    if (res[0].Quantity < userBuy.quantity) {
                        console.log(`\nInsufficient quantity! We only have ${res[0].Quantity} ${res[0].Product} left!\n`);

                        keepShopping();

                    } else {
                        var cost = costCalculator(res[0].Price, userBuy.quantity);
                        
                        console.log(`\nYour total for ${userBuy.quantity} ${res[0].Product} will be $${cost}\n`);

                        connection.query
                        ("UPDATE products SET Quantity = Quantity - ?, Product_Sales = Product_Sales + ? WHERE ID = ?", 
                        [userBuy.quantity, cost, userBuy.id], function (err, res) {
                            if (err) throw err;
                        
                        });

                        keepShopping();
                    }
                
                });
        });
    });
}
//END USER SEARCH FUNCTION


//COST CALCULATOR FUNCTION    
function costCalculator(price, quantity) {
    return parseInt(price * quantity)
};

//KEEP SHOPPING FUNCTION    
function keepShopping() {

    inquirer.prompt([

        {
            type: "confirm",
            name: "keepShopping",
            message: "Do you want to keep shopping?"
        }

    ]).then(function (answer) {
        if (answer.keepShopping) {
            userSearch();
        } else {
            console.log("\nSee you next time!\n");
            connection.end();
        }
    });

};
