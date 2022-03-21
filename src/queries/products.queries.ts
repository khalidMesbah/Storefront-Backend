const getProducts = 'SELECT * FROM products;';
const getProduct = 'SELECT * FROM products WHERE id_PK=($1);';
const addProduct =
  'INSERT INTO products ( name , price) VALUES($1, $2) RETURNING *;';
const removeProduct =
  'DELETE FROM products WHERE id_PK=($1) RETURNING id_PK,name,price;';
export default {
  getProducts,
  getProduct,
  addProduct,
  removeProduct,
};
