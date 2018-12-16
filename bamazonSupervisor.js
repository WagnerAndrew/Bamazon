
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
                choices: ["View product sales by Department", "Create new department", "Exit Supervisor Mode"]
            }

        ]).then(function (manager) {

            switch (manager.choice) {
                case "View product sales by Department":
                  viewDepartments();
                  break;
          
                case "Create new department":
                  addNewDepartment();
                  break;

                case "Exit Supervisor Mode":
                    console.log("\nSee ya later!\n");
                        connection.end ();
                break;
                }

        });

}
//END USER SEARCH FUNCTION


function viewDepartments() {
    connection.query("SELECT DepartmentID, Department, Overhead_Cost FROM departments", function (err, res) {
        if (err) throw err;

        //Prints Table
        console.log("\n");
        console.table(res);
        console.log("\n");

        userSearch();
    });

}


function addNewDepartment() {

    connection.query("SELECT DepartmentID, Department, Overhead_Cost FROM departments", function (err, res) {
        if (err) throw err;

        //Prints Table
        console.log("\n");
            console.table(res);

        //Runs purchase inquiry
        inquirer.prompt([
            {
                type: "input",
                name: "department",
                message: "What department do you want to add?"
            },
            {
                type: "input",
                name: "overhead",
                message: "What is the overhead cost for the department?",
                validate: function(value) {
                    if (isNaN(value) === false) {
                      return true;
                    }
                    return false;
                  }
            }

        ]).then(function (user) {

            connection.query ("INSERT INTO departments SET ?",
            {
              Department: user.department,
              Overhead_Cost: parseInt(user.overhead),
            },
        
            function (err, res) {
              if (err) throw err;

            });
            
            connection.query("SELECT Department, Overhead_Cost FROM departments ORDER BY DepartmentID DESC LIMIT 1", function (err, res) {
                if (err) throw err;

                console.log("You added: \n");
                console.table(res);

                userSearch();

            });

}); 
})   
};                   




