create table products (
product_id serial primary key,
product varchar(80),
size_id int,
foreign key(size_id) references sizes(size_id),
price float,
description text,
img text,
category_id int,
foreign key(category_id) references categories(category_id)
);