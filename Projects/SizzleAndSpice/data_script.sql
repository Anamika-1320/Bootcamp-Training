create schema menu;

create table menu.food (
id serial primary key,
name varchar(50) not null,
description text,
price varchar(10) not null
)

insert into menu.food (name, description, price) values 
('Nachos','Cheese, onions, tomotoes.','$12'),
('Tacos','Chicken or beef with your choice of side.','$12'),
('Chicken rice bowl','Brown rice, and veggies, served with choice or sauce .','$16'),
('Grilled chicken','Juicy grilled chicken served with choice of sauce.','$15'),
('Steak and fired beans','Steak and your choice of side.','$15'),
('Burrito','Your choice of beef or chicken.','$12'),
('Pizza','Your choice of toppings.','$12'),
('Burger','Veg, chicken, beef.','$18');

select * from menu.food;

create table menu.drinks (
id serial primary key,
name varchar(50) not null,
description text,
price varchar(10) not null
)

insert into menu.drinks (name, description, price) values 
('Vodka 1oz','Vodka and choice of juice or soda.','$6'),
('Rum 1oz','Rum and choice of juice or soda.','$6'),
('Whisky 1oz','Whisky and choice of juice or soda.','$6'),
('Tequila 1oz','Tequila served with juice or soda.','$6'),
('Red Wine','8oz Red wine, ask server for our wine selection.','$8'),
('White Wine','8oz white wine, ask server for our wine selection.','$8'),
('Sparkling Wine','8oz sparking wine glass of your choice.','$12'),
('Domestic and foreign beer','Domestic and foreign beer of you choice','$6 - $8');

select * from menu.drinks;

create table menu.deserts (
id serial primary key,
name varchar(50) not null,
description text,
price varchar(10) not null
)

insert into menu.deserts (name, description, price) values 
('Chocolate cake','Loaded Chocolate cake with fudge topping.','$7'),
('NY cheesecake','NY cheesecake toped with strawberry topping.','$12'),
('Apple Pie','Warm apple pie tooped with icecream.','$6'),
('Churros','Pancake mix, water, oil, sugar, cinnamon.','$7'),
('Sopaipillas','Light, crispy pastry puffs, sopaipillas are a sweet way to round out a spicy meal.','$7'),
('Creamy Caramel Flan','A small slice of this impressively rich, creamy, caramel flan dessert goes a long way.','$12'),
('Shortcut Tres Leches Cake','My mom''s favorite cake is tres leches, a butter cake soaked in three kinds of milk.','$12'),
('Pressure-Cooker Pumpkin Flans','This silky, smooth dessert captures the essence and elegance of fall.','$14');

select * from menu.deserts;

create table users(
id serial primary key,
first_name varchar(30) not null,
last_name varchar(30),
email varchar(50) not null unique,
mobile bigint not null,
password text not null unique
)

select * from users;




