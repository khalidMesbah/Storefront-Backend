CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    id_PK uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    first_name VARCHAR NOT NULL,
    last_name VARCHAR NOT NULL,
    password VARCHAR NOT NULL
);