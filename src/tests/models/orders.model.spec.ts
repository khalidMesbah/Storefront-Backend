import OrdersTable from '../../models/order.model';

const ordersTable = new OrdersTable();

describe('Ordres Model', () => {
  it('test the index method', () => expect(ordersTable.index).toBeDefined());

  it('test the indexProducts method', () =>
    expect(ordersTable.indexProducts).toBeDefined());

  it('test the addProduct method', () =>
    expect(ordersTable.addProduct).toBeDefined());

  it('test the show method', () => expect(ordersTable.show).toBeDefined());

  it('test the create method', () => expect(ordersTable.create).toBeDefined());

  it('test the update method', () => expect(ordersTable.update).toBeDefined());

  it('test the delete method', () => expect(ordersTable.delete).toBeDefined());
});
