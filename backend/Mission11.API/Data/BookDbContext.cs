using Microsoft.EntityFrameworkCore;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace Mission11.API.Data
{

    //Declares a class named BookDbContext.
    //Inherits from DbContext, which is a built-in EF Core class used to interact with the database.
    public class BookDbContext : DbContext
    {
        //provides configuration settings for the database(like the connection string).
        public BookDbContext(DbContextOptions<BookDbContext> options) : base(options)
        {
        }

        //represents a table in the database where each row is a Book entity
        public DbSet<Book> Books { get; set; }
    }
}
