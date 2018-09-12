insert into users (user_name, email, img, auth_id, administrator) values ($1, $2, $3, $4, false)
returning *;