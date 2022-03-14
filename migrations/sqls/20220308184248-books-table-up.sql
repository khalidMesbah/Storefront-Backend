-- The record of a database schema change that also includes the logic to enact and rollback that change.
-- uses the database.json
CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(150),
    total_pages integer,
    author VARCHAR(255),
    summary text
);

/* 
    how to create a migration for a table
    `npx db-migrate create <name>-table --sql-file`

 */