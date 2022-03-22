import UsersTable from '../../models/user.model';

const usersTable = new UsersTable();

describe('Users Model', () => {
  it('test the index method', () => expect(usersTable.index).toBeDefined());

  it('test the show method', () => expect(usersTable.show).toBeDefined());

  it('test the create method', () => expect(usersTable.create).toBeDefined());

  it('test the update method', () => expect(usersTable.update).toBeDefined());

  it('test the delete method', () => expect(usersTable.delete).toBeDefined());

  it('test the authenticate method', () =>
    expect(usersTable.authenticate).toBeDefined());

  it('test the getAll method', () => expect(usersTable.getAll).toBeDefined());
});
