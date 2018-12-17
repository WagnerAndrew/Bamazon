DROP DATABASE IF EXISTS bamazonDB;
CREATE database bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  ID INT(100) AUTO_INCREMENT NOT NULL,
  Product VARCHAR(100) NOT NULL,
  Department VARCHAR(100) NOT NULL,
  Price DECIMAL(10,2) NOT NULL,
  Quantity INT(100) NOT NULL,
  Product_Sales DECIMAL(10,2) DEFAULT 0 NOT NULL,
  PRIMARY KEY (ID)
);

INSERT INTO products (Product, Department, Price, Quantity, Product_Sales)
VALUES ("Skis", "Sporting Goods", 100.00, 20, 0);

INSERT INTO products (Product, Department, Price, Quantity, Product_Sales)
VALUES ("Pants", "Clothing", 40.00, 10, 0);

INSERT INTO products (Product, Department, Price, Quantity, Product_Sales)
VALUES ("Chicken Soup", "Food", 5.00, 50, 0);

INSERT INTO products (Product, Department, Price, Quantity, Product_Sales)
VALUES ("Stereo", "Electronics", 40.00, 20, 0);

INSERT INTO products (Product, Department, Price, Quantity, Product_Sales)
VALUES ("Mug", "Home Goods", 10.00, 40, 0);

INSERT INTO products (Product, Department, Price, Quantity, Product_Sales)
VALUES ("Fishing Pole", "Sporting Goods", 20.00, 35, 0);

INSERT INTO products (Product, Department, Price, Quantity, Product_Sales)
VALUES ("Sunglasses", "Accessories", 70.00, 45, 0);

INSERT INTO products (Product, Department, Price, Quantity, Product_Sales)
VALUES ("Monopoly", "Games", 20.00, 50, 0);

INSERT INTO products (Product, Department, Price, Quantity, Product_Sales)
VALUES ("Scissors", "Office Supplies", 5.00, 30, 0);

INSERT INTO products (Product, Department, Price, Quantity, Product_Sales)
VALUES ("Tape", "Office Supplies", 10.00, 10, 0);


SELECT * FROM products;



CREATE TABLE departments (
  DepartmentID INT(100) AUTO_INCREMENT NOT NULL,
  Department VARCHAR(100) NOT NULL,
  Overhead_Cost DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (departmentID)
);

INSERT INTO departments (Department, Overhead_Cost)
VALUES ("Sporting Goods", 10000.00);

INSERT INTO departments (Department, Overhead_Cost)
VALUES ("Home Goods", 800000.00);

INSERT INTO departments (Department, Overhead_Cost)
VALUES ("Education", 70000.00);

SELECT * FROM departments;



