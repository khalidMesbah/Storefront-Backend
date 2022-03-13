-- The record of a database schema change that also includes the logic to enact and rollback that change.
CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(150),
    total_pages integer,
    author VARCHAR(255),
    summary text
);