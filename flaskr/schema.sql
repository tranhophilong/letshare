-- DROP TABLE IF EXISTS user;
-- DROP TABLE IF EXISTS role;

-- CREATE TABLE role(
--     role_id  INTEGER PRIMARY KEY AUTOINCREMENT,
--     type_role TEXT NOT NULL

-- );

-- CREATE TABLE user (
--     id INTEGER PRIMARY KEY AUTOINCREMENT,
--     last_name TEXT NOT NULL,
--     first_name TEXT NOT NULL,
--     email TEXT UNIQUE NOT NULL,
--     address_user TEXT NOT NULL,
--     create_date TIMESTAMP  DEFAULT CURRENT_TIMESTAMP,
--     password_user TEXT NOT NULL, 
--     gender TEXT NOT NULL,
--     date_of_birth TEXT NOT NULL,
--     month_of_birth TEXT NOT NULL,
--     year_of_birth TEXT NOT NULL,
--     phone_number TEXT NOT NULL
--     -- role_id INTEGER NOT NULL,
--     -- FOREIGN KEY (role_id) REFERENCES role (role_id)

-- );

DROP TABLE IF EXISTS category;
DROP TABLE IF EXISTS product;

CREATE TABLE category(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
);

CREATE TABLE product(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    title TEXT NOT NULL,
    thumnail TEXT NOT NULL,
    description TEXT NOT NULL,
    category_id INTEGER NOT NULL,
    FOREIGN KEY(category_id) REFERENCES category (id)
);


CREATE TABLE post_management(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER NOT NULL,
    userpost_id INTEGER NOT NULL,
    status_post TEXT NOT NULL,
    create_date TIMESTAMP  DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(product_id) REFERENCES product(id),
    FOREIGN KEY (userpost_id) REFERENCES user(id)
);


