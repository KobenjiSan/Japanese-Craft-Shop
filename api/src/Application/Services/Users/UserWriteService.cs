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

        public async Task RemoveProductFromAllUsers(string productId)
        {
            var filter = Builders<User>.Filter.AnyEq(u => u.LikedProductIds, productId);
            var update = Builders<User>.Update.Pull(u => u.LikedProductIds, productId);
            await _usersCollection.UpdateManyAsync(filter, update);
        }

        public async Task<bool> ToggleLikeProductAsync(string userId, string productId)
        {
            var filter = Builders<User>.Filter.Eq(u => u.Id, userId);

            var addLike = Builders<User>.Update.AddToSet(u => u.LikedProductIds, productId);
            var tryLike = await _usersCollection.UpdateOneAsync(filter, addLike);
            if (tryLike.ModifiedCount != 0)
                return true;    // product is added and liked
            else
            {
                var removeLike = Builders<User>.Update.Pull(u => u.LikedProductIds, productId);
                await _usersCollection.UpdateOneAsync(filter, removeLike);
                return false;   // product was already liked and is now removed (disliked)
            }
        }

        public async Task UnlikeProductAsync(string userId, string productId)
        {
            var filter = Builders<User>.Filter.Eq(u => u.Id, userId);
            var update = Builders<User>.Update.Pull(u => u.LikedProductIds, productId);
            await _usersCollection.UpdateOneAsync(filter, update);
        }
    }
}