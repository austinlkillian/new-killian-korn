select *
from carts c
join products p on c.product_id = p.product_id
where user_id = $1 and ordered = false and shipped = false
order by cart_id desc;