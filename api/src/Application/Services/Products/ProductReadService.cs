using API.src.Application.Services.Products.Interfaces;
using API.src.Domain;
using API.src.Infrastructure;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace API.src.Application.Services.Products
{
    public class ProductReadService : IProductReadService
    {

        private readonly IMongoCollection<Product> _productsCollection;

        public ProductReadService(IOptions<MongoDBSettings> settings, IMongoDatabase database)
        {
            _productsCollection = database.GetCollection<Product>(settings.Value.ProductsCollectionName);
        }

        public async Task<Product?> GetProductByIdAsync(string productId)
        {
            return await _productsCollection.Find(p => p.Id == productId).FirstOrDefaultAsync();
        }
    }
}