const getOrders = 'SELECT * FROM orders;';
const getOrder = 'SELECT * FROM orders WHERE id_PK = ($1);';
const addOrder =
  'INSERT INTO orders (status,user_id_FK) VALUES($1, $2) RETURNING *;';
const removeOrder = `DELETE FROM orders WHERE id_PK=($1) RETURNING *;`;
const addProduct =
  'INSERT INTO order_products(quantity , order_id_FK , product_id_FK) VALUES($1,$2,$3) RETURNING *;';
const getOrderProducts =
  'SELECT * FROM order_products where order_id_FK = ($1)';
export default {
  getOrders,
  getOrder,
  addOrder,
  addProduct,
  getOrderProducts,
  removeOrder,
};
