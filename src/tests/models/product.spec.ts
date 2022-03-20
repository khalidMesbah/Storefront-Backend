import ProductsTable from '../../models/product.model';
// import User from '../../types/user.type';
// import Client from '../../databases/database';

const productsTable = new ProductsTable();

describe('Products Model', () => {
  it('test the index method', () => expect(productsTable.index).toBeDefined());

  it('test the show method', () => expect(productsTable.index).toBeDefined());

  it('test the create method', () => expect(productsTable.index).toBeDefined());

  it('test the update method', () => expect(productsTable.index).toBeDefined());

  it('test the delete method', () => expect(productsTable.index).toBeDefined());

  it('create method should add a product', async () => {
    const { name, price } = await productsTable.create({
      name: 'mesbah',
      price: 10,
    });
    expect([name, price]).toEqual(['mesbah', 10]);
  });

  it('index method should return a list of products', async () => {
    const results = await productsTable.index();
    expect(results[0]).toEqual({
      id: results[0].id,
      name: 'mesbah',
      price: 10,
    });
    expect(results.length).toBeGreaterThanOrEqual(1);
  });

  it('show method should return the correct product', async () => {
    const results = await productsTable.index();
    const result = await productsTable.show(results[0].id as string);
    const { name, price } = result;
    expect([name, price]).toEqual(['mesbah', 10]);
  });

  it('delete method should remove the product', async () => {
    const results = await productsTable.index();
    const result = await productsTable.delete(results[0].id as string);
    expect(await productsTable.show(result.id as string)).toBeUndefined();
  });
});
