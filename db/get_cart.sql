select *
from carts
where user_id = $1 and ordered = false and shipped = false
order by cart_id;