const productsInOrders =
  'SELECT name,price,order_id_FK FROM products INNER JOIN order_products ON products.products_id_PK = order_products.product_id_FK;';
const mostExpProducts =
  'SELECT name,price FROM products GROUP BY name,price order By 2 DESC LIMIT ($1);';
const usersWithOrders =
  'SELECT * FROM users INNER JOIN orders ON users.users_id_PK = orders.user_id_FK;';
const mostPopProducts =
  'SELECT name ,count(*) FROM products INNER JOIN order_products ON products.products_id_PK = order_products.product_id_FK GROUP BY name order By 2 DESC LIMIT ($1)';
const CurrentOrderByUser =
  "SELECT * FROM orders WHERE user_id_FK = ($1) AND status = 'active' LIMIT 1;";
const completedOrdersByUser =
  "SELECT * FROM orders WHERE user_id_FK = ($1) AND status = 'complete';";
export default {
  productsInOrders,
  mostExpProducts,
  usersWithOrders,
  mostPopProducts,
  CurrentOrderByUser,
  completedOrdersByUser,
};
