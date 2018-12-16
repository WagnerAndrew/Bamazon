DROP DATABASE IF EXISTS bamazonDB;
CREATE database bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  ID INT(100) AUTO_INCREMENT NOT NULL,
  Product VARCHAR(100) NOT NULL,
  Department VARCHAR(100) NOT NULL,
  Price DECIMAL(10,2) NOT NULL,
  Quantity INT(100) NOT NULL,
  Product_Sales DECIMAL(10,2),
  PRIMARY KEY (ID)
);

INSERT INTO products (Product, Department, Price, Quantity)
VALUES ("Skis", "Sporting Goods", 100.00, 4);

INSERT INTO products (Product, Department, Price, Quantity)
VALUES ("Pants", "Clothing", 40.00, 10);

INSERT INTO products (Product, Department, Price, Quantity)
VALUES ("Chicken Soup", "Food", 5.00, 50);

INSERT INTO products (Product, Department, Price, Quantity)
VALUES ("Stereo", "Electronics", 40.00, 20);

INSERT INTO products (Product, Department, Price, Quantity)
VALUES ("Mug", "Home Goods", 10.00, 40);

INSERT INTO products (Product, Department, Price, Quantity)
VALUES ("Fishing Pole", "Sporting Goods", 20.00, 35);

INSERT INTO products (Product, Department, Price, Quantity)
VALUES ("Sunglasses", "Accessories", 70.00, 45);

INSERT INTO products (Product, Department, Price, Quantity)
VALUES ("Monopoly", "Games", 20.00, 50);

INSERT INTO products (Product, Department, Price, Quantity)
VALUES ("Scissors", "Office Supplies", 5.00, 30);

INSERT INTO products (Product, Department, Price, Quantity)
VALUES ("Tape", "Office Supplies", 10.00, 10);


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



