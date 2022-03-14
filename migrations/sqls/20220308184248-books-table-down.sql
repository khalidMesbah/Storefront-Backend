-- The record of a database schema change that also includes the logic to enact and rollback that change.
-- uses the database.json
DROP TABLE books;

/* 
    how to create a migration for a table
    `npx db-migrate create <name>-table --sql-file`

 */