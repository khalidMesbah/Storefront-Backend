import ProductsTable from '../../models/product.model';

const productsTable = new ProductsTable();

describe('Products Model', () => {
  it('test the index method', () => expect(productsTable.index).toBeDefined());
  it('test the indexByCategory method', () =>
    expect(productsTable.indexByCategory).toBeDefined());

  it('test the show method', () => expect(productsTable.show).toBeDefined());

  it('test the create method', () =>
    expect(productsTable.create).toBeDefined());

  it('test the update method', () =>
    expect(productsTable.update).toBeDefined());

  it('test the delete method', () =>
    expect(productsTable.delete).toBeDefined());
});
