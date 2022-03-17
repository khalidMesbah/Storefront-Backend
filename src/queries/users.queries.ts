const getUsers = 'SELECT id,firstName,LastName FROM users;';
const getUser = 'SELECT id,firstName,LastName FROM users WHERE id=($1);';
const addUser =
  'INSERT INTO users (firstname , lastname , password) VALUES($1, $2, $3) RETURNING id,firstName,lastName,password;';
const updateUser =
  'UPDATE users SET firstname = ($1), lastname = ($2), password = ($3) WHERE id = ($4) RETURNING id,firstName,lastName;';
const removeUser =
  'DELETE FROM users WHERE id=($1) RETURNING id,firstName,lastName;';
const authenticate = 'SELECT * FROM users WHERE id = ($1);';
export default {
  getUsers,
  getUser,
  addUser,
  updateUser,
  removeUser,
  authenticate,
};
