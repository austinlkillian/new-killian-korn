create table users (
    user_id serial primary key,
    user_name varchar(180),
    email varchar(180),
    img text,
    auth_id text,
    administrator boolean
);