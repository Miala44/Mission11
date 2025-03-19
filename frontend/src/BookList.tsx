import { useEffect, useState } from 'react';
import { Book } from './types/Book';

function BookList() {
  //keep track of data and update as needed
  const [books, setBooks] = useState<Book[]>([]);

  //gets data from API. or passes empty array
  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch('https://localhost:5000/api/Book');
      const data = await response.json();
      setBooks(data); //set Books with the data received
    };

    fetchBooks();
  }, []);

  return (
    <>
      <h1>Books</h1>
      <br />
      {books.map((b) => (
        <div id="bookCard">
          <h3>{b.title}</h3>
          <ul>
            <li>Author: {b.author}</li>
          </ul>
        </div>
      ))}
    </>
  );
}

export default BookList;
