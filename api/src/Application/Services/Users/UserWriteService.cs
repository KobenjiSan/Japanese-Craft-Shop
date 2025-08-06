using API.src.Application.Services.Users.Interfaces;
using API.src.Domain;
using API.src.Infrastructure;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace API.src.Application.Services.Users
{
    public class UserWriteService : IUserWriteService
    {
        private readonly IMongoCollection<User> _usersCollection;

        public UserWriteService(IOptions<MongoDBSettings> settings, IMongoDatabase database)
        {
            _usersCollection = database.GetCollection<User>(settings.Value.UsersCollectionName);
        }

        public async Task CreateUserAsync(User user)
        {
            await _usersCollection.InsertOneAsync(user);
        }

        public async Task<bool> TryLikeProductAsync(string userId, string productId)
        {
            var filter = Builders<User>.Filter.Eq(u => u.Id, userId);
            var update = Builders<User>.Update.AddToSet(u => u.LikedProductIds, productId);
            var result = await _usersCollection.UpdateOneAsync(filter, update);
            return result.ModifiedCount == 0;
        }

        public async Task UnlikeProductAsync(string userId, string productId)
        {
            var filter = Builders<User>.Filter.Eq(u => u.Id, userId);
            var update = Builders<User>.Update.Pull(u => u.LikedProductIds, productId);
            await _usersCollection.UpdateOneAsync(filter, update);
        }
    }
}