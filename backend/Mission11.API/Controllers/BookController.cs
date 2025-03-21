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
        public IActionResult GetBooks(int pageNum = 5, int webNum = 1, string? sortBy = null)
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

            // Apply sorting based on the sortBy parameter
            if (!string.IsNullOrEmpty(sortBy))
            {
                if (sortBy.ToLower() == "name")
                    books = books.OrderBy(b => b.Title); // Sort A-Z
                else if (sortBy.ToLower() == "-name")
                    books = books.OrderByDescending(b => b.Title); // Sort Z-A
            }

            var bookList = books
                .Skip((webNum-1)* pageNum)
                .Take(pageNum)
                .ToList();

            var totalNumBooks = _context.Books.Count();

           
            return Ok(new
            {
                Books = bookList,
                TotalNumBooks = totalNumBooks
            });
        }


    }
}
