update carts
set quantity = $2
where cart_id = $1;