DROP DATABASE IF EXISTS food_ordering;
CREATE DATABASE IF NOT EXISTS food_ordering;
USE food_ordering;

COMMIT;

--
-- Create table for USER
--

CREATE TABLE IF NOT EXISTS USER(
	user_id INT NOT NULL AUTO_INCREMENT UNIQUE,
    phone_num INT NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    email VARCHAR(255),
    PRIMARY KEY (user_id, phone_num)
);
COMMIT;

--
-- Create table for USER_IS_STAFF
--

CREATE TABLE IF NOT EXISTS USER_IS_STAFF(
	user_id INT NOT NULL UNIQUE,
    FOREIGN KEY (user_id) REFERENCES USER(user_id)
    	ON DELETE NO ACTION
        ON UPDATE NO ACTION
);
COMMIT;

--
-- Table for STAFF_IS_MANAGER
--

CREATE TABLE IF NOT EXISTS STAFF_IS_MANAGER(
	user_id INT NOT NULL UNIQUE,
    FOREIGN KEY (user_id) REFERENCES USER_IS_STAFF(user_id)
    	ON DELETE NO ACTION
        ON UPDATE NO ACTION
);
COMMIT;


--
-- Create table for USER_IS_CUSTOMER
--

CREATE TABLE IF NOT EXISTS USER_IS_CUSTOMER(
	user_id INT NOT NULL UNIQUE,
    FOREIGN KEY (user_id) REFERENCES USER(user_id)
    	ON DELETE NO ACTION
        ON UPDATE NO ACTION
);
COMMIT;

--
-- Create table for RESTAURANT
--

CREATE TABLE IF NOT EXISTS RESTAURANT(
	restaurant_id INT NOT NULL AUTO_INCREMENT UNIQUE,
    hotline INT,
    address VARCHAR(255),
    PRIMARY KEY (restaurant_id)
);
COMMIT;

--
-- Create table for FOOD
--

CREATE TABLE IF NOT EXISTS FOOD(
	food_id INT NOT NULL AUTO_INCREMENT UNIQUE,
    name VARCHAR(255),
    price FLOAT,
    nutrition_value BLOB,
    type VARCHAR(255),
    PRIMARY KEY (food_id)
);
COMMIT;

--
-- Create table for FOOD_TAG
--

CREATE TABLE IF NOT EXISTS FOOD_TAG(
	food_id INT NOT NULL UNIQUE,
    tag VARCHAR(255),
    FOREIGN KEY (food_id) REFERENCES FOOD(food_id)
    	ON DELETE NO ACTION
        ON UPDATE NO ACTION
);
COMMIT;

--
-- Create table for PROMOTION
--

CREATE TABLE IF NOT EXISTS PROMOTION(
	promotion_id INT NOT NULL UNIQUE,
    name VARCHAR(255),
    decrease_price FLOAT,
    PRIMARY KEY (promotion_id)
);
COMMIT;

--
-- Create table for FOOD_HAS_PROMOTION
--

CREATE TABLE IF NOT EXISTS FOOD_HAS_PROMOTION(
	food_id INT NOT NULL UNIQUE,
	promotion_id INT NOT NULL UNIQUE,
    FOREIGN KEY (food_id) REFERENCES FOOD(food_id)
    	ON DELETE NO ACTION
        ON UPDATE NO ACTION,
	FOREIGN KEY (promotion_id) REFERENCES PROMOTION(promotion_id)
    	ON DELETE NO ACTION
        ON UPDATE NO ACTION
);
COMMIT;

--
-- Create table for COMBO
--

CREATE TABLE IF NOT EXISTS COMBO(
	combo_id INT NOT NULL AUTO_INCREMENT UNIQUE,
    name VARCHAR(255),
    price FLOAT,
    nutrition_value BLOB,
    PRIMARY KEY (combo_id)
);
COMMIT;

--
-- Create table for COMBO_TAG
--

CREATE TABLE IF NOT EXISTS COMBO_TAG(
	combo_id INT NOT NULL UNIQUE,
	tag VARCHAR(255),
    FOREIGN KEY (combo_id) REFERENCES COMBO(combo_id)
    	ON DELETE NO ACTION
        ON UPDATE NO ACTION
);
COMMIT;

--
-- Create table for FOOD_INCLUDES_COMBO
--

CREATE TABLE IF NOT EXISTS FOOD_INCLUDES_COMBO(
	food_id INT NOT NULL UNIQUE,
    combo_id INT NOT NULL UNIQUE,
    FOREIGN KEY (food_id) REFERENCES FOOD(food_id)
    	ON DELETE NO ACTION
        ON UPDATE NO ACTION,
    FOREIGN KEY (combo_id) REFERENCES COMBO(combo_id)
    	ON DELETE NO ACTION
        ON UPDATE NO ACTION
);
COMMIT;

--
-- Create table for RESERVATION
--

CREATE TABLE IF NOT EXISTS RESERVATION(
	reservation_id INT NOT NULL AUTO_INCREMENT UNIQUE,
    customer_name VARCHAR(255),
    phone_num INT,
    eat_time DATETIME,
    num_of_people INT(2),
    review BLOB,
    PRIMARY KEY (reservation_id)
);
COMMIT;

--
-- Create table for RESERVATION_TABLE
--

CREATE TABLE IF NOT EXISTS RESERVATION_TABLE(
	reservation_id INT NOT NULL UNIQUE,
    table_name varchar(255),
    FOREIGN KEY (reservation_id) REFERENCES RESERVATION(reservation_id)
    	ON DELETE NO ACTION
        ON UPDATE NO ACTION
);
COMMIT;

--
-- Create table for RESERVATION_VIP
--

CREATE TABLE IF NOT EXISTS RESERVATION_VIP(
	reservation_id INT NOT NULL UNIQUE,
    table_name varchar(255),
    FOREIGN KEY (reservation_id) REFERENCES RESERVATION(reservation_id)
    	ON DELETE NO ACTION
        ON UPDATE NO ACTION
);
COMMIT;

--
-- Create table for SERVICE
--

CREATE TABLE IF NOT EXISTS SERVICE(
	service_id INT NOT NULL AUTO_INCREMENT UNIQUE,
    service_name VARCHAR(255),
    price FLOAT,
    PRIMARY KEY (service_id)
);
COMMIT;

--
-- Create table for RESERVATION_SERVICE_USES
--

CREATE TABLE IF NOT EXISTS RESERVATION_SERVICE_USES(
	reservation_id INT NOT NULL UNIQUE,
    service_id INT NOT NULL UNIQUE,
    FOREIGN KEY (reservation_id) REFERENCES RESERVATION(reservation_id)
    	ON DELETE NO ACTION
        ON UPDATE NO ACTION,
    FOREIGN KEY (service_id) REFERENCES SERVICE(service_id)
    	ON DELETE NO ACTION
        ON UPDATE NO ACTION
);
COMMIT;

--
-- Create table for CUSTOMER_RESERVATION_RESTAURANT_CREATES
--

CREATE TABLE IF NOT EXISTS CUSTOMER_RESERVATION_RESTAURANT_CREATES(
	user_id INT NOT NULL UNIQUE,
	reservation_id INT NOT NULL UNIQUE,
    restaurant_id INT NOT NULL UNIQUE,
    FOREIGN KEY (user_id) REFERENCES USER_IS_CUSTOMER(user_id)
		ON DELETE NO ACTION
        ON UPDATE NO ACTION,
    FOREIGN KEY (reservation_id) REFERENCES RESERVATION(reservation_id)
		ON DELETE NO ACTION
        ON UPDATE NO ACTION,
    FOREIGN KEY (restaurant_id) REFERENCES RESTAURANT(restaurant_id)
		ON DELETE NO ACTION
        ON UPDATE NO ACTION
);
COMMIT;

--
-- Create table for COMMENT
--

CREATE TABLE IF NOT EXISTS COMMENT(
	comment_id INT NOT NULL AUTO_INCREMENT UNIQUE,
    description BLOB,
	commenter_name VARCHAR(255),
    like_reaction INT,
    dislike_reaction INT,
    original_comment_id INT,
    PRIMARY KEY (comment_id),
    FOREIGN KEY (original_comment_id) REFERENCES COMMENT(comment_id)
		ON DELETE NO ACTION
        ON UPDATE NO ACTION
);

--
-- Create table for CUSTOMER_COMBO
--

CREATE TABLE IF NOT EXISTS CUSTOMER_COMBO(
	user_id INT NOT NULL UNIQUE,
    price float,
    nutrition_value BLOB,
    creation_time DATETIME,
    FOREIGN KEY (user_id) REFERENCES USER_IS_CUSTOMER(user_id)
    	ON DELETE NO ACTION
        ON UPDATE NO ACTION
);
COMMIT;

--
-- Create table for CUSTOMER_COMBO_INCLUDES_FOOD
--

CREATE TABLE IF NOT EXISTS CUSTOMER_COMBO_INCLUDES_FOOD(
	food_id INT NOT NULL UNIQUE,
    price float,
    nutrition_value BLOB,
    creation_time DATETIME,
    FOREIGN KEY (food_id) REFERENCES FOOD(food_id)
    	ON DELETE NO ACTION
        ON UPDATE NO ACTION
);
COMMIT;


--
-- Create table for ANNOUNCEMENT
--

CREATE TABLE IF NOT EXISTS ANNOUNCEMENT(
	announcement_id INT NOT NULL AUTO_INCREMENT UNIQUE,
    user_id INT NOT NULL,
    date DATETIME,
    description blob,
    PRIMARY KEY (announcement_id),
    FOREIGN KEY (user_id) REFERENCES STAFF_IS_MANAGER(user_id)
    	ON DELETE NO ACTION
        ON UPDATE NO ACTION
);
COMMIT;

--
-- Create table for RESTAURANT_SERVES_FOOD
--

CREATE TABLE IF NOT EXISTS RESTAURANT_SERVES_FOOD(
	food_id INT NOT NULL UNIQUE,
    restaurant_id INT NOT NULL UNIQUE,
    FOREIGN KEY (food_id) REFERENCES FOOD(food_id)
    	ON DELETE NO ACTION
        ON UPDATE NO ACTION,
	FOREIGN KEY (restaurant_id) REFERENCES RESTAURANT(restaurant_id)
    	ON DELETE NO ACTION
        ON UPDATE NO ACTION
);
COMMIT;

--
-- Create table for ORDERING
--

CREATE TABLE IF NOT EXISTS ORDERING(
	ordering_id INT NOT NULL AUTO_INCREMENT UNIQUE,
    orderer_name VARCHAR(255),
    phone_num INT,
    receive_address VARCHAR(255),
	review BLOB,
    PRIMARY KEY (ordering_id)
);
COMMIT;

--
-- Create table for ORDERING_HAS_FOOD
--

CREATE TABLE IF NOT EXISTS ORDERING_HAS_FOOD(
	ordering_id INT NOT NULL UNIQUE,
    food_id INT NOT NULL UNIQUE,
    amount INT,
    FOREIGN KEY (ordering_id) REFERENCES ORDERING(ordering_id)
    	ON DELETE NO ACTION
        ON UPDATE NO ACTION,
	FOREIGN KEY (food_id) REFERENCES FOOD(food_id)
    	ON DELETE NO ACTION
        ON UPDATE NO ACTION
);
COMMIT;

--
-- Create table for CUSTOMER_CREATES_ORDERING
--

CREATE TABLE IF NOT EXISTS CUSTOMER_CREATES_ORDERING(
	user_id INT NOT NULL UNIQUE,
	ordering_id INT NOT NULL UNIQUE,
    delivery_time DATETIME,
    FOREIGN KEY (ordering_id) REFERENCES ORDERING(ordering_id)
    	ON DELETE NO ACTION
        ON UPDATE NO ACTION,
	FOREIGN KEY (user_id) REFERENCES USER_IS_CUSTOMER(user_id)
    	ON DELETE NO ACTION
        ON UPDATE NO ACTION
);
COMMIT;
