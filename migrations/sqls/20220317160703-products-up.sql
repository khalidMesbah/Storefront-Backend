CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE products(
    products_id_PK uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR NOT NULL,
    price INTEGER NOT NULL,
    category VARCHAR NOT NULL
);