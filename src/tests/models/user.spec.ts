import UsersTable from '../../models/user.model';
// import Client from '../../databases/database';
const usersTable = new UsersTable();

describe('Users Model', () => {
  it('test the index method', () => expect(usersTable.index).toBeDefined());

  it('test the show method', () => expect(usersTable.index).toBeDefined());

  it('test the create method', () => expect(usersTable.index).toBeDefined());

  it('test the update method', () => expect(usersTable.index).toBeDefined());

  it('test the delete method', () => expect(usersTable.index).toBeDefined());

  it('create method should add a user', async () => {
    const { first_name, last_name } = await usersTable.create({
      first_name: 'khaled',
      last_name: 'mesbah',
      password: 'password',
    });
    expect([first_name, last_name]).toEqual(['khaled', 'mesbah']);
  });

  it('index method should return a list of users', async () => {
    const results = await usersTable.index();
    expect({
      first_name: results[0].first_name,
      last_name: results[0].last_name,
    }).toEqual({
      first_name: 'khaled',
      last_name: 'mesbah',
    });
    expect(results.length).toBeGreaterThanOrEqual(1);
  });

  it('show method should return the correct user', async () => {
    const results = await usersTable.index();
    const result = await usersTable.show(results[0].id as string);
    const { first_name, last_name } = result;
    expect([first_name, last_name]).toEqual(['khaled', 'mesbah']);
  });

  it('delete method should remove the user', async () => {
    const results = await usersTable.index();
    const result = await usersTable.delete(results[0].id as string);
    expect(await usersTable.show(result.id as string)).toBeUndefined();
  });
});
