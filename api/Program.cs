using API.src.Application.Common.Authentication;
using API.src.Application.Services.Products;
using API.src.Application.Services.Products.Interfaces;
using API.src.Application.Services.Users;
using API.src.Application.Services.Users.Interfaces;
using API.src.Domain;
using API.src.Infrastructure;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

var builder = WebApplication.CreateBuilder(args);

// ----------------------
// Configuration Settings
// ----------------------

builder.Services.Configure<MongoDBSettings>(builder.Configuration.GetSection("MongoDBSettings"));

builder.Services.Configure<JwtSettings>(builder.Configuration.GetSection("Jwt"));

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

// Jwt
builder.Services.AddSingleton<JwtTokenGenerator>();

// Products
builder.Services.AddScoped<IProductWriteService, ProductWriteService>();
builder.Services.AddScoped<IProductReadService, ProductReadService>();

// Users
builder.Services.AddScoped<IUserWriteService, UserWriteService>();
builder.Services.AddScoped<IUserReadService, UserReadService>();

// ----------------------
// Framework Features
// ----------------------

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:4200").AllowAnyHeader().AllowAnyMethod();
    });
});

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

app.UseCors("AllowFrontend");

app.MapControllers();
app.MapGet("/", () => "API is running");

app.Run();
