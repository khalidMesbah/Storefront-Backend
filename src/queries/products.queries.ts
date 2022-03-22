const getProducts = 'SELECT * FROM products;';
const getProductsByCategory = 'SELECT * FROM products WHERE category = ($1);';
const getProduct = 'SELECT * FROM products WHERE products_id_PK=($1);';
const addProduct =
  'INSERT INTO products ( name, price, category) VALUES($1, $2, $3) RETURNING *;';
const removeProduct =
  'DELETE FROM products WHERE products_id_PK=($1) RETURNING *;';
const updateProduct =
  'UPDATE products SET name =($1), price = $2, category = ($3) WHERE products_id_PK = ($4) RETURNING *;';
export default {
  getProducts,
  getProduct,
  addProduct,
  removeProduct,
  updateProduct,
  getProductsByCategory,
};
