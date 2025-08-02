using API.src.Infrastructure;
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

var app = builder.Build();

app.UseHttpsRedirection();

app.MapGet("/", () => "API is running");

app.Run();
