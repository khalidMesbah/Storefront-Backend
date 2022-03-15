-- The record of a database schema change that also includes the logic to enact and rollback that change.
-- uses the database.json
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE books (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(150),
    total_pages integer,
    author VARCHAR(255),
    summary text
);

/* 
 how to create a migration for a table
 `npx db-migrate create <name>-table --sql-file`
 
 */