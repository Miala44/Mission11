import { Book } from '../types/Book';

interface FetchBooksResponse {
  books: Book[];
  totalNumBooks: number;
}

// const APIurl = 'https://localhost:5000/api';
//https://adams13backend-evakhnaneneveafv.eastus-01.azurewebsites.net/

// const APIurl =
//   'https://backendadams-dyh8f9arhtezdycc.eastus-01.azurewebsites.net/api/Book';

const APIurl =
  'https://adams13backend-evakhnaneneveafv.eastus-01.azurewebsites.net/api/Book';

export const fetchBooks = async (
  pageSize: number,
  webPageNum: number,
  sortBy: string,
  selectedCategories: string[]
): Promise<FetchBooksResponse> => {
  try {
    const categoryParameters = selectedCategories
      .map((cat) => `category=${encodeURIComponent(cat)}`)
      .join('&');
    const response = await fetch(
      `${APIurl}/AllBooks?pageNum=${pageSize}&webNum=${webPageNum}&sortBy=${sortBy}${selectedCategories.length ? `&${categoryParameters}` : ''}`
    );
    if (!response.ok) {
      throw new Error('failed to fetch books');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};

export const addBook = async (newBook: Book): Promise<Book> => {
  try {
    const response = await fetch(`${APIurl}/AddBook`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBook),
    });

    if (!response.ok) {
      throw new Error('Failed to add project');
    }

    return await response.json();
  } catch (error) {
    console.error('Error adding book', error);
    throw error;
  }
};

export const updateBook = async (
  bookId: number,
  updatedBook: Book
): Promise<Book> => {
  try {
    const response = await fetch(`${APIurl}/UpdateBook/${bookId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedBook),
    });

    return await response.json();
  } catch (error) {
    console.error('Error updating book', error);
    throw error;
  }
};

export const deleteBook = async (bookID: number): Promise<void> => {
  try {
    const response = await fetch(`${APIurl}/DeleteBook/${bookID}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('failed to delete this book');
    }
  } catch (error) {
    console.error('Error deleting book', error);
    throw error;
  }
};
