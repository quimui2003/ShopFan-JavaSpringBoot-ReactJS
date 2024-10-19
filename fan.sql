CREATE TABLE Roles(
	role_id SERIAL PRIMARY KEY,
	role_name VARCHAR(10)
);

CREATE TABLE Customers(
	customer_id SERIAL PRIMARY KEY,
	customer_name VARCHAR(255),
	address TEXT,
	phone_number VARCHAR(12)
);

CREATE TABLE Accounts(
	account_id SERIAL PRIMARY KEY,
	email VARCHAR(254),
	password_hash VARCHAR(255),
	role_id INT NOT NULL,
	customer_id INT NOT NULL,
	FOREIGN KEY (role_id) REFERENCES Roles(role_id),
	FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
);

CREATE TABLE Category(
	category_id SERIAL PRIMARY KEY,
	category_name VARCHAR(100)
);

CREATE TABLE Products(
	product_id SERIAL PRIMARY KEY,
	product_name VARCHAR(255),
	image_path VARCHAR(255),
	inventory_quantity INT,
	original_price NUMERIC,
	unit_price NUMERIC,
	description TEXT,
	update_time DATE,
	category_id INT NOT NULL,
	FOREIGN KEY (category_id) REFERENCES Category(category_id)
);

CREATE TABLE Status(
	status_id SERIAL PRIMARY KEY,
	status_name VARCHAR(50)
);

CREATE TABLE Orders(
	order_id SERIAL PRIMARY KEY,
	order_date DATE,
	total_price NUMERIC,
	status_id INT NOT NULL,
	customer_id INT NOT NULL,
	FOREIGN KEY (status_id) REFERENCES Status(status_id),
	FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
);

CREATE TABLE OrderDetails(
	detail_id SERIAL PRIMARY KEY,
	total_quantity INT,
	sale_price NUMERIC,
	order_id INT NOT NULL,
	product_id INT NOT NULL,
	FOREIGN KEY (order_id) REFERENCES Orders(order_id),
	FOREIGN KEY (product_id) REFERENCES Products(product_id)
);

CREATE TABLE OrderCarts(
	cart_id SERIAL PRIMARY KEY,
	product_quantity INT,
	account_id INT NOT NULL,
	product_id INT NOT NULL,
	FOREIGN KEY (account_id) REFERENCES Accounts(account_id),
	FOREIGN KEY (product_id) REFERENCES Products(product_id)
);
