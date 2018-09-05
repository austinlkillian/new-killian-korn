select * 
from products p
join sizes s on p.size_id = s.size_id
where product_id = $1;