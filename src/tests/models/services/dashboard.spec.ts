import Dashboard from '../../../models/services/dashboard';

const dashboard = new Dashboard();

describe('dashboard Model', () => {
  it('test the productsInOrders method', () =>
    expect(dashboard.productsInOrders).toBeDefined());

  it('test the mostExpProducts method', () =>
    expect(dashboard.mostExpProducts).toBeDefined());

  it('test the usersWithOrders method', () =>
    expect(dashboard.usersWithOrders).toBeDefined());

  it('test the mostPopProducts method', () =>
    expect(dashboard.mostPopProducts).toBeDefined());

  it('test the CurrentOrderByUser method', () =>
    expect(dashboard.currentOrderByUser).toBeDefined());

  it('test the getCompletedOrdersByUser method', () =>
    expect(dashboard.completedOrdersByUser).toBeDefined());
});
