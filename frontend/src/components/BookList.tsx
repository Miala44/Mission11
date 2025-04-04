import { useEffect, useState } from 'react';
import { Book } from '../types/Book';
import { useNavigate } from 'react-router-dom';
import { fetchBooks } from '../api/booksAPI';
import Pagination from './Pagination';

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
  // State variables to manage books data, pagination, and sorting
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [webPageNum, setWebPageNum] = useState<number>(1);
  // const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>('');
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch data from API whenever pageSize, webPageNum, or sortBy changes
  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        const data = await fetchBooks(
          pageSize,
          webPageNum,
          sortBy,
          selectedCategories
        );

        // Set state with retrieved data
        setBooks(data.books);
        // setTotalItems(data.totalNumBooks);
        setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, [pageSize, webPageNum, sortBy, selectedCategories]); // Dependency array ensures re-fetching when these values change

  if (loading) return <p>Loading books...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
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
          <option value="name">Book Name (A-Z)</option>
          <option value="-name">Book Name (Z-A)</option>
          {/* <br /> */}
        </select>
      </label>

      {/* <h1>Books</h1> */}
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

            <button
              onClick={() =>
                navigate(`/cart/${b.title}/${b.bookID}/${b.price}`)
              }
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Click to add this book to your cart!"
              className="btn btn-danger"
            >
              Add to cart
            </button>
          </div>
        </div>
      ))}

      <br />
      <Pagination
        currentPage={webPageNum}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={setWebPageNum}
        onPageSizeChange={(newSize) => {
          setPageSize(newSize);
          setWebPageNum(1);
        }}
      />
    </>
  );
}

export default BookList;
