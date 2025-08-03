using API.src.Application.Services.Products;
using API.src.Application.Services.Products.Interfaces;
using API.src.Infrastructure;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

var builder = WebApplication.CreateBuilder(args);

// ----------------------
// Configuration Settings
// ----------------------

builder.Services.Configure<MongoDBSettings>(builder.Configuration.GetSection("MongoDBSettings"));

// ----------------------
// Infrastructure Services
// ----------------------

builder.Services.AddSingleton<IMongoDatabase>(sp =>
{
    var settings = sp.GetRequiredService<IOptions<MongoDBSettings>>().Value;
    var client = new MongoClient(settings.ConnectionString);
    return client.GetDatabase(settings.DatabaseName);
});

// ----------------------
// Application Services
// ----------------------

// MediatR
builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(Program).Assembly));

// Products
builder.Services.AddScoped<IProductWriteService, ProductWriteService>();
builder.Services.AddScoped<IProductReadService, ProductReadService>();

// ----------------------
// Framework Features
// ----------------------

builder.Services.AddControllers();

var app = builder.Build();

app.UseMiddleware<API.src.Api.Middleware.ExceptionHandlingMiddleware>();

app.UseHttpsRedirection();

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(Directory.GetCurrentDirectory(), "wwwroot")),
    RequestPath = ""
});

app.MapControllers();
app.MapGet("/", () => "API is running");

app.Run();
