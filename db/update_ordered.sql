update carts
set ordered = true
where user_id = $1;