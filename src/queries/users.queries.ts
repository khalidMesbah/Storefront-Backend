const getUsers = 'SELECT id,firstname,lastname FROM users;';
const getUser = 'SELECT id,firstname,lastname FROM users WHERE id=($1);';
const addUser =
  'INSERT INTO users (firstname , lastname , password) VALUES($1, $2, $3) RETURNING id,firstname,lastName,password;';
const updateUser =
  'UPDATE users SET firstname = ($1), lastname = ($2), password = ($3) WHERE id = ($4) RETURNING *;';
const removeUser =
  'DELETE FROM users WHERE id=($1) RETURNING id,firstname,lastName;';
const authenticate = 'SELECT * FROM users WHERE id = ($1);';
export default {
  getUsers,
  getUser,
  addUser,
  updateUser,
  removeUser,
  authenticate,
};
