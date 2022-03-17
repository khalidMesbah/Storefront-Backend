const getUsers = 'SELECT id,firstName,LastName FROM users;';
const getUser = 'SELECT id,firstName,LastName FROM users WHERE id=($1);';
const addUser =
  'INSERT INTO users (firstname , lastname , password) VALUES($1, $2, $3) RETURNING id,firstName,lastName,password;';

export default {
  getUsers,
  getUser,
  addUser,
};
