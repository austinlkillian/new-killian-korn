select *
from carts
where user_id = $1 and ordered = false;