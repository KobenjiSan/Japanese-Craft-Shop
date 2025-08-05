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
    }
}