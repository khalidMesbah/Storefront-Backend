// Integration Test - Tests a flow or process in the application that spans multiple units of individual functions or classes.
import { BookStore } from '../../models/book';

const store = new BookStore();

describe('book store model', () => {
  it(`should have an index method`, () => {
    expect(store.index).toBeDefined();
  });
  it(`index method should return a list of products`, async () => {
    const res = await store.index();
    expect(res).toEqual([]);
  });
});

describe('Book Model', () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a update method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(store.index).toBeDefined();
  });

  it('create method should add a book', async () => {
    const result = await store.create({
      title: 'Bridge to Terabithia',
      total_pages: 250,
      author: 'Katherine Paterson',
      type: 'Childrens',
      id: 0,
      summary: '',
    });
    expect(result).toEqual({
      id: '1' as unknown as number,
      title: 'Bridge to Terabithia',
      total_pages: 250,
      author: 'Katherine Paterson',
      type: 'Childrens',
      summary: '',
    });
  });

  it('index method should return a list of books', async () => {
    const result = await store.index();
    expect(result).toEqual([
      {
        id: '1' as unknown as number,
        title: 'Bridge to Terabithia',
        total_pages: 250,
        author: 'Katherine Paterson',
        type: 'Childrens',
        summary: '',
      },
    ]);
  });

  it('show method should return the correct book', async () => {
    const result = await store.show('1');
    expect(result).toEqual({
      id: '1' as unknown as number,
      title: 'Bridge to Terabithia',
      total_pages: 250,
      author: 'Katherine Paterson',
      type: 'Childrens',
      summary: '',
    });
  });

  it('delete method should remove the book', async () => {
    store.delete('1');
    const result = await store.index();

    expect(result).toEqual([]);
  });
});
