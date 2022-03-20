import UsersTable from '../../models/user.model';
// import User from '../../types/user.type';
// import Client from '../../databases/database';

const usersTable = new UsersTable();

describe('Users Model', () => {
  it('should have an index method', () => {
    expect(usersTable.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(usersTable.index).toBeDefined();
  });

  it('should have a create method', () => {
    expect(usersTable.index).toBeDefined();
  });

  it('should have a update method', () => {
    expect(usersTable.index).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(usersTable.index).toBeDefined();
  });

  it('create method should add a book', async () => {
    const { firstname, lastname } = await usersTable.create({
      firstname: 'khaled',
      lastname: 'mesbah',
      password: 'password',
    });
    expect([firstname, lastname]).toEqual(['khaled', 'mesbah']);
  });

  it('index method should return a list of books', async () => {
    const results = await usersTable.index();
    expect({
      firstname: results[0].firstname,
      lastname: results[0].lastname,
    }).toEqual({
      firstname: 'khaled',
      lastname: 'mesbah',
    });
    expect(results.length).toBeGreaterThanOrEqual(1);
  });

  it('show method should return the correct book', async () => {
    const results = await usersTable.index();
    const result = await usersTable.show(results[0].id as string);
    const { firstname, lastname } = result;
    expect([firstname, lastname]).toEqual(['khaled', 'mesbah']);
  });

  it('delete method should remove the book', async () => {
    const results = await usersTable.index();
    const result = await usersTable.delete(results[0].id as string);
    expect(await usersTable.show(result.id as string)).toBeUndefined();
  });
});
