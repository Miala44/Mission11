using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mission11.API.Data;

namespace Mission11.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    //instance of context file
    public class BookController : ControllerBase
    {
        //storing the BookDbContext. The DbContext is what connects to the database and allows you to interact with it.
        private BookDbContext _context;
        public BookController(BookDbContext temp)
        {
            _context = temp;
            //Now, the controller can use _context to access the database and perform operations on books.
        }

        //method that goes to Books in _context and returns all the books in the database in a list.
        [HttpGet("AllBooks")]
        public IActionResult GetBooks(int pageNum = 5, int webNum = 1, string? sortBy = null, [FromQuery] List<string>? category = null)
        {
            //HttpContext.Response.Cookies.Append("BestBookPublisher", "Random House", new CookieOptions
            //{
            //    HttpOnly = false,
            //    Secure = false,
            //    //SameSite = SameSiteMode.Strict,
            //    Expires = DateTime.Now.AddMinutes(10)
            //}
            //    );

            var books = _context.Books.AsQueryable();

            //IQueryable bookQuery = _context.Books.AsQueryable();

            if (category != null && category.Any())
            {
                books = books.Where(b => category.Contains(b.Category));
            }

            // Apply sorting based on the sortBy parameter
            if (!string.IsNullOrEmpty(sortBy))
            {
                if (sortBy.ToLower() == "name")
                    books = books.OrderBy(b => b.Title); // Sort A-Z
                else if (sortBy.ToLower() == "-name")
                    books = books.OrderByDescending(b => b.Title); // Sort Z-A
            }

            var totalNumBooks = books.Count();

            var bookList = books
                .Skip((webNum-1)* pageNum)
                .Take(pageNum)
                .ToList();

           

           
            return Ok(new
            {
                Books = bookList,
                TotalNumBooks = totalNumBooks
            });
        }

        [HttpGet("GetBookCategory")]
        public IActionResult GetBookCategory() { 
            var bookCategory = _context.Books
                .Select(b => b.Category)
                .Distinct()
                .ToList();

            return Ok(bookCategory);
        }

        [HttpPost("AddBook")]
        public IActionResult AddBook([FromBody] Book newBook)
        {
            _context.Books.Add(newBook);
            _context.SaveChanges();

            return Ok(newBook);
        }

        [HttpPut("UpdateBook/{bookId}")]
        public IActionResult UpdateBook(int bookId, [FromBody] Book updatedBook)
        {
            var existingBook = _context.Books.Find(bookId);

            existingBook.Title = updatedBook.Title;
            existingBook.Author = updatedBook.Author;
            existingBook.Publisher = updatedBook.Publisher;
            existingBook.ISBN = updatedBook.ISBN;
            existingBook.Classification = updatedBook.Classification;
            existingBook.Category = updatedBook.Category;
            existingBook.PageCount = updatedBook.PageCount;
            existingBook.Price = updatedBook.Price;

            _context.Books.Update(existingBook);
            _context.SaveChanges();

            return Ok(existingBook);
        }

        [HttpDelete("DeleteBook/{bookId}")]
        public IActionResult DeleteBook(int bookId)
        {
            var existingBook = _context.Books.Find(bookId);
            if (existingBook == null)
            {
                return NotFound();
            }
            _context.Books.Remove(existingBook);
            _context.SaveChanges();
            return NoContent();
        }


    }
}
