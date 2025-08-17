using API.src.Application.Services.Products.Interfaces;
using API.src.Domain;
using API.src.Infrastructure;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace API.src.Application.Services.Products
{
    public class ProductWriteService : IProductWriteService
    {

        private readonly IMongoCollection<Product> _productCollection;

        public ProductWriteService(IOptions<MongoDBSettings> settings, IMongoDatabase database)
        {
            _productCollection = database.GetCollection<Product>(settings.Value.ProductsCollectionName);
        }

        public async Task<Product> CreateProductAsync(Product product)
        {
            await _productCollection.InsertOneAsync(product);
            return product;
        }

        public async Task UpdateLikedByUserAsync(string userId, string productId, bool isLiked)
        {
            var filter = Builders<Product>.Filter.Eq(p => p.Id, productId);

            if (isLiked)
            {
                var addUser = Builders<Product>.Update.AddToSet(p => p.LikedByUserIds, userId);
                await _productCollection.UpdateOneAsync(filter, addUser);
            }
            else
            {
                var removeUser = Builders<Product>.Update.Pull(p => p.LikedByUserIds, userId);
                await _productCollection.UpdateOneAsync(filter, removeUser);
            }
        }
    }
}