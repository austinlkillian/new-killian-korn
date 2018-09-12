select sum(p.price * c.quantity)
from carts c
join products p on p.product_id = c.product_id
where user_id = $1 and ordered = false;