const getBooks = 'SELECT * FROM books;';
const getBook = 'SELECT * FROM books WHERE id=($1);';
const addBook =
  'INSERT INTO books (title, author, total_pages, summary) VALUES($1, $2, $3, $4) RETURNING *;';
const updateBook =
  'UPDATE books SET title = $1, author = $2, total_pages = $3, summary = $4 WHERE id = $5 RETURNING *;';
const removeBook = 'DELETE FROM books WHERE id=($1) RETURNING *';

export default {
  getBooks,
  getBook,
  addBook,
  updateBook,
  removeBook,
};
