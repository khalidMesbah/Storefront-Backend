const getUsers = 'SELECT id,first_name,last_name FROM users;';
const getUser = 'SELECT id,first_name,last_name FROM users WHERE id=($1);';
const getAll = 'SELECT * FROM users WHERE id=($1);';
const addUser =
  'INSERT INTO users (first_name , last_name , password) VALUES($1, $2, $3) RETURNING id,first_name,last_name,password;';
const updateUser =
  'UPDATE users SET first_name = ($1), last_name = ($2), password = ($3) WHERE id = ($4) RETURNING *;';
const removeUser =
  'DELETE FROM users WHERE id=($1) RETURNING id,first_name,last_name;';
const authenticate = 'SELECT * FROM users WHERE id = ($1);';
export default {
  getUsers,
  getUser,
  getAll,
  addUser,
  updateUser,
  removeUser,
  authenticate,
};
