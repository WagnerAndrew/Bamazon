
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
                message: "What ID number do you want to buy?"
            },

            {
                type: "input",
                name: "quantity",
                message: "How many do you want to buy?"
            }

        ]).then(function (userBuy) {

            connection.query("SELECT * FROM products WHERE ?", { ID: userBuy.id }, function (err, res) {
                if (err) throw err;

                if (res[0].Quantity < userBuy.quantity) {
                    console.log(`\nInsufficient quantity! We only have ${res[0].Quantity} ${res[0].Product} left!\n`);

                    keepShopping();

                } else {

                    console.log(`\nYour total for ${userBuy.quantity} ${res[0].Product} will be $${costCalculator(res[0].Price, userBuy.quantity)}\n`);

                    var quantityUpdate = (parseInt(res[0].Quantity) - parseInt(userBuy.quantity));

                    connection.query("UPDATE products SET ? WHERE ?", [{ Quantity: quantityUpdate }, { id: userBuy.id }], function (err, res) {
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
    return price * quantity
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
        if (answer.keepShopping === true) {
            userSearch();
        } else {
            console.log("\nSee you next time!\n");
            connection.end();
        }
    });

};






//VERSION WITH FUNCTIONS BROKEN OUT

// var mysql = require("mysql");
// var inquirer = require("inquirer");
// const cTable = require('console.table');

// var connection = mysql.createConnection({
//     host: "localhost",
//     port: 8889,
//     user: "root",
//     password: "root",
//     database: "bamazonDB"
// });

// connection.connect(function (err) {
//     if (err) throw err;
//     userSearch();
// });

// //START USER SEARCH FUNCTION
// function userSearch() {

//         inquirer.prompt([
//             {
//                 type: "input",
//                 name: "id",
//                 message: "What ID number do you want to buy?"
//             },

//             {
//                 type: "input",
//                 name: "quantity",
//                 message: "How many do you want to buy?"
//             }

//         ]).then(function (userBuy) {
//             userCost (userBuy);            
//         });

// }
// //END USER SEARCH FUNCTION


// function printProducts () {

// connection.query("SELECT * FROM products", function (err, res) {
//     if (err) throw err;

//     //Prints Table
//     return console.table(res);
//     });

// }

// //PRINT USER COST FUNCTION
// function userCost () {

//     connection.query("SELECT * FROM products WHERE ?", { id: userBuy.id }, function (err, res) {
//         if (err) throw err;

//             if (res[0].quantity < userBuy.quantity){
//                 return console.log("Insufficient quantity!");

//             }else{
//                 quantityUpdate();
//                 return console.log(`You total for ${userBuy.quantity} ${res[0].product_name} will be $${costCalculator(res[0].price, userBuy.quantity)} `);
//             };
//     });
// }

// //PRODUCT QUANTITY UPDATE
// function quantityUpdate() {

//     var quantityUpdate = (res[0].quantity - userBuy.quantity);

//     connection.query ("UPDATE products SET ? WHERE ?", {quantity: quantityUpdate}, function(err, res) {
//         if (err) throw err;
//         userSearch ();

//     });

// }

// //COST CALCULATOR FUNCTION    
// function costCalculator (price, quantity) {
//     return price * quantity
// };



// -----------------------------------------------------------------------------------------------------------------

