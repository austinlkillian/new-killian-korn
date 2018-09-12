select *
from carts
where user_id = $1 and ordered = true and shipped = false;