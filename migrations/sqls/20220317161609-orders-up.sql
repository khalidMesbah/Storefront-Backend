CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE orders(
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    prod_id uuid DEFAULT uuid_generate_v4(),
    quan_prod INTEGER,
    user_id uuid DEFAULT uuid_generate_v4(),
    status VARCHAR(20) NOT NULL
);