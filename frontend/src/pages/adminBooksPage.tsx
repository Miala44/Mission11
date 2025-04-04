import { useEffect, useState } from 'react';
import { Book } from '../types/Book';
import { deleteBook, fetchBooks } from '../api/booksAPI';
import Pagination from '../components/Pagination';
import NewBookForm from '../components/NewBookForm';
import EditBookForm from '../components/EditBookForm';

const adminBooksPage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState<number>(5);
  const [webPageNum, setWebPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const data = await fetchBooks(pageSize, webPageNum, 'page', []);
        setBooks(data.books);
        setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    loadBooks();
  }, [pageSize, webPageNum]); //dependency array if something changes

  const handleDelete = async (bookId: number) => {
    const confirmDelete = window.confirm('Are you SURE you want to delete?');
    if (!confirmDelete) return;

    try {
      await deleteBook(bookId);
      setBooks(books.filter((b) => b.bookID !== bookId));
    } catch (error) {
      alert('failed to delete book');
    }
  };

  if (loading) return <p>loading the books...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Admin Books</h1>

      {!showForm && (
        <button
          className="btn btn-success mb-3"
          onClick={() => setShowForm(true)}
        >
          Add Project
        </button>
      )}

      {showForm && (
        <NewBookForm
          onSuccess={() => {
            //pass in
            setShowForm(false);
            fetchBooks(pageSize, webPageNum, 'page', []).then(
              (
                data //fetch books again
              ) => setBooks(data.books)
            );
          }}
          onCancel={() => setShowForm(false)} //hide form
        />
      )}

      {editingBook && (
        <EditBookForm
          book={editingBook}
          onSuccess={() => {
            setEditingBook(null);
            fetchBooks(pageSize, webPageNum, 'page', []).then((data) =>
              setBooks(data.books)
            );
          }}
          onCancel={() => setEditingBook(null)} //hide form
        />
      )}

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {books.map((b) => (
            <tr key={b.bookID}>
              <td>{b.bookID}</td>
              <td>{b.title}</td>
              <td>{b.author}</td>
              <td>{b.publisher}</td>
              <td>{b.isbn}</td>
              <td>{b.category}</td>
              <td>{b.classification}</td>
              <td>{b.pageCount}</td>
              <td>{b.price}</td>
              <td>
                <button onClick={() => setEditingBook(b)}>edit</button>
                <button onClick={() => handleDelete(b.bookID)}>delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
    </div>
  );
};

export default adminBooksPage;
