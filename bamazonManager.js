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

function lowInventory() {
    connection.query("SELECT * FROM products WHERE (Quantity) < 5", function (err, res) {
        if (err) throw err;

        if (res.length < 1){
        console.log("\n*******************************************************\nThere are no products with quantity less than 5\n*******************************************************\n");
        userSearch();
        }else{
        //Prints Table
        console.log("\n");
        console.table(res);
        console.log("\n");

        userSearch();

    }


    });

}

function addToInventory() {

    connection.query("SELECT ID, Product, Price, Quantity FROM products", function (err, res) {
        if (err) throw err;

        //Prints Table
        console.log("\n");
            console.table(res);

        //Runs purchase inquiry
        inquirer.prompt([
            {
                type: "input",
                name: "id",
                message: "What ID number do you want to add inventory to?",
                validate: function(value) {
                    if (isNaN(value) === false) {
                      return true;
                    }
                    return false;
                  }
            },

            {
                type: "input",
                name: "quantity",
                message: "How many do you want to add",
                validate: function(value) {
                    if (isNaN(value) === false) {
                      return true;
                    }
                    return false;
                  }
            }

        ]).then(function (add) {

            connection.query("SELECT * FROM products WHERE ?", { ID: add.id }, function (err, res) {
                if (err) throw err;
                
                    var quantityUpdate = (parseInt(res[0].Quantity) + parseInt(add.quantity));
                    
                    connection.query("UPDATE products SET ? WHERE ?", [{ Quantity: quantityUpdate }, { ID: add.id }], function (err, res) {
                        if (err) throw err;
                        
                    });

                        connection.query("SELECT ID, Product, Price, Quantity FROM products WHERE ?", { ID: add.id }, function (err, res) {
                            if (err) throw err;
                            
                            console.log("\n***************************\nYou added " + add.quantity + " to " + res[0].Product + "\n");
                            console.log("There are now " + res[0].Quantity + " " + res[0].Product + "\n***************************\n");

                            userSearch();

                        });

            });
        });
    });
}


function addNewProduct() {

    connection.query("SELECT ID, Product, Price, Quantity FROM products", function (err, res) {
        if (err) throw err;

        //Prints Table
        console.log("\n");
            console.table(res);

        //Runs purchase inquiry
        inquirer.prompt([
            {
                type: "input",
                name: "product",
                message: "What product do you want to add?"
            },
            {
                type: "input",
                name: "department",
                message: "What department category does it belong in?"
            },
            {
                type: "input",
                name: "price",
                message: "What is the price?",
                validate: function(value) {
                    if (isNaN(value) === false) {
                      return true;
                    }
                    return false;
                  }
            },
            {
                type: "input",
                name: "quantity",
                message: "How many do you want to add?",
                validate: function(value) {
                    if (isNaN(value) === false) {
                      return true;
                    }
                    return false;
                  }
            },


        ]).then(function (user) {

            connection.query ("INSERT INTO products SET ?",
            {
              Product: user.product,
              Department: user.department,
              Price: parseInt(user.price),
              Quantity: parseInt(user.quantity)
            },
        
            function (err, res) {
              if (err) throw err;

            });
            // SELECT fields FROM table ORDER BY id DESC LIMIT 1;
            connection.query("SELECT Product, Price, Quantity FROM products ORDER BY ID DESC LIMIT 1", function (err, res) {
                if (err) throw err;

              console.log("You added: \n");
                console.table(res);

                userSearch();

            });

}); 
})   
};                   




