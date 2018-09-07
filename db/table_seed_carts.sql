create table carts
(
    cart_id serial primary key,
    user_id int,
    foreign key(user_id) references users(user_id),
    product_id int,
    foreign key(product_id) references products(product_id),
    size_id int,
    foreign key(size_id) references sizes(size_id),
    quantity int,
    ordered boolean
);