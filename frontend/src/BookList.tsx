import { useEffect, useState } from 'react';
import { Book } from './types/Book';

function BookList() {
  // State variables to manage books data, pagination, and sorting
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [webPageNum, setWebPageNum] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>('');

  // Fetch data from API whenever pageSize, webPageNum, or sortBy changes
  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch(
        `https://localhost:5000/api/Book?pageNum=${pageSize}&webNum=${webPageNum}&sortBy=${sortBy}`
      );
      const data = await response.json();

      // Set state with retrieved data
      setBooks(data.books);
      setTotalItems(data.totalNumBooks);
      setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
    };

    fetchBooks();
  }, [pageSize, webPageNum, sortBy]); // Dependency array ensures re-fetching when these values change

  return (
    <>
      {/* Dropdown for sorting books */}
      <label className="form-label fw-bold">
        Sort by:
        <select
          className="form-select w-auto"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Default</option>
          <option value="name">Project Name (A-Z)</option>
          <option value="-name">Project Name (Z-A)</option>
          <br />
        </select>
      </label>

      <h1>Books</h1>
      <br />

      {/* Display list of books */}
      {books.map((b) => (
        <div id="bookCard" className="card" key={b.bookID}>
          <h3 className="card-title">{b.title}</h3>
          <div className="card-body">
            <ul className="list-unstyled">
              <li>
                <strong>Author: </strong>
                {b.author}
              </li>
              <li>
                <strong>Publisher: </strong>
                {b.publisher}
              </li>
              <li>
                <strong>ISBN: </strong>
                {b.isbn}
              </li>
              <li>
                <strong>Classification/Category: </strong>
                {b.classification} / {b.category}
              </li>
              <li>
                <strong>Number of Pages: </strong>
                {b.pageCount}
              </li>
              <li>
                <strong>Price: </strong>
                {b.price}
              </li>
            </ul>
          </div>
        </div>
      ))}

      <br />

      {/* Dropdown to select the number of results per page */}
      <label className="form-label fw-bold">
        Results per page:
        <select
          className="form-select w-auto"
          value={pageSize}
          onChange={(p) => setPageSize(Number(p.target.value))}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>
      </label>
      <br />

      {/* Pagination Controls */}
      <button
        className="btn btn-primary"
        onClick={() => setWebPageNum(webPageNum - 1)}
        disabled={webPageNum === 1}
      >
        Previous
      </button>

      {/* Page number buttons */}
      {[...Array(totalPages)].map((_, index) => (
        <button
          className="btn btn-outline-primary mx-1"
          key={index + 1}
          onClick={() => setWebPageNum(index + 1)}
        >
          {index + 1}
        </button>
      ))}

      <button
        className="btn btn-primary"
        onClick={() => setWebPageNum(webPageNum + 1)}
        disabled={webPageNum === totalPages}
      >
        Next
      </button>
    </>
  );
}

export default BookList;
