import UsersTable from '../../models/user.model';
import User from '../../types/user.type';

const usersTable = new UsersTable();

describe('Users Model', () => {
  it('should have an index method', () => {
    expect(usersTable.index).toBeDefined();
  });

  it('index method should return a list of products', async () => {
    const result = await usersTable.index();
    expect(result).toEqual([]);
  });
});
