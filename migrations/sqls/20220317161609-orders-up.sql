CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE orders(
    orders_id_PK uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    status VARCHAR(15) NOT NULL,
    user_id_FK uuid REFERENCES users(users_id_PK)
);