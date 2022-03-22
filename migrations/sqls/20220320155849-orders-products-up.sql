CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE order_products (
    order_products_id_PK uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    quantity INTEGER ,
    order_id_FK uuid REFERENCES orders(orders_id_PK),
    product_id_FK uuid REFERENCES products(products_id_PK)
)