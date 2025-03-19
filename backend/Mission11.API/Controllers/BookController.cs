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
        [HttpGet]
        public IEnumerable<Book> GetBooks()
        {
            var bookList = _context.Books.ToList();
            return bookList;
        }


    }
}
