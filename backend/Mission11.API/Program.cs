using Microsoft.EntityFrameworkCore;
using Mission11.API.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<BookDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("BookConnection")));

//builder.Services.AddCors(options =>
//{
//    options.AddPolicy("allowFrontend", policy =>
//    {
//        policy.WithOrigins("http://localhost:3000") // Allow frontend origin
//              .AllowCredentials() // Allow credentials (cookies, etc.)
//              .AllowAnyHeader()   // Allow any headers
//              .AllowAnyMethod()  // Allow any HTTP methods
//        .SetPreflightMaxAge(TimeSpan.FromMinutes(10));
//    });
//});

builder.Services.AddCors();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


//app.UseCors("allowFrontend");
app.UseCors(options => options.WithOrigins("http://localhost:3000"));

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
