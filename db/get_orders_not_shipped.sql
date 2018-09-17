select *
from carts c
join products p on p.product_id = c.product_id
where user_id = $1 and ordered = true and shipped = false
order by cart_id desc
limit 5;