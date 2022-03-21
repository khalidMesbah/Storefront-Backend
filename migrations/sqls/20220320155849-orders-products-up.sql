CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE order_products (
    id_PK uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    quantity INTEGER ,
    order_id_FK uuid REFERENCES orders(id_PK),
    product_id_FK uuid REFERENCES products(id_PK)
)