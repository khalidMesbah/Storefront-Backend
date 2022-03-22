const getOrders = 'SELECT * FROM orders;';
const getOrder = 'SELECT * FROM orders WHERE orders_id_PK = ($1);';
const addOrder =
  'INSERT INTO orders (status,user_id_FK) VALUES($1, $2) RETURNING *;';
const updateOrder =
  'UPDATE orders SET status = ($1) Where orders_id_PK = ($2) RETURNING *;';
const removeOrder = 'DELETE FROM orders WHERE orders_id_PK=($1) RETURNING *;';
const addProduct =
  'INSERT INTO order_products(quantity , order_id_FK , product_id_FK) VALUES($1,$2,$3) RETURNING *;';
const getOrderProducts =
  'SELECT products_id_PK,name,price,category,quantity,order_id_FK FROM products INNER JOIN order_products ON order_products.product_id_FK = products.products_id_PK where order_id_FK = ($1)';
export default {
  getOrders,
  getOrder,
  addOrder,
  addProduct,
  getOrderProducts,
  removeOrder,
  updateOrder,
};
