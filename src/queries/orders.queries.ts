const getOrders = 'SELECT * FROM orders;';
const getOrder = 'SELECT * FROM orders WHERE id=($1);';
const addOrder =
  'INSERT INTO orders (status,user_id) VALUES($1, $2) RETURNING *;';
const addProduct =
  'INSERT INTO order_products(quantity , order_id , product_id) VALUES($1,$2,$3) RETURNING *;';
const getOrderProducts = 'SELECT * FROM order_products';
export default {
  getOrders,
  getOrder,
  addOrder,
  addProduct,
  getOrderProducts,
};
