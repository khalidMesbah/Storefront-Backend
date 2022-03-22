const getUsers = 'SELECT users_id_PK,first_name,last_name FROM users;';
const getUser =
  'SELECT users_id_PK,first_name,last_name FROM users WHERE users_id_PK = ($1);';
const getAll = 'SELECT * FROM users WHERE users_id_PK=($1);';
const addUser =
  'INSERT INTO users (first_name , last_name , password) VALUES($1, $2, $3) RETURNING *;';
const updateUser =
  'UPDATE users SET first_name = ($1), last_name = ($2), password = ($3) WHERE users_id_PK = ($4) RETURNING *;';
const removeUser =
  'DELETE FROM users WHERE users_id_PK=($1) RETURNING users_id_PK,first_name,last_name;';
const authenticate = 'SELECT * FROM users WHERE users_id_PK = ($1);';
const getRecentPurchases =
  'SELECT orders_id_PK,name,price,quantity FROM orders INNER JOIN order_products ON orders.orders_id_PK = order_products.order_id_FK INNER JOIN products ON products.products_id_PK = order_products.product_id_FK WHERE user_id_FK =($1);';
export default {
  getUsers,
  getUser,
  getAll,
  addUser,
  updateUser,
  removeUser,
  authenticate,
  getRecentPurchases,
};
