using API.src.Application.Services.Users.Interfaces;
using API.src.Domain;
using API.src.Infrastructure;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace API.src.Application.Services.Users
{
    public class UserReadService : IUserReadService
    {
        private readonly IMongoCollection<User> _usersCollection;

        public UserReadService(IOptions<MongoDBSettings> settings, IMongoDatabase database)
        {
            _usersCollection = database.GetCollection<User>(settings.Value.UsersCollectionName);
        }

        public async Task<bool> EmailExistsAsync(string email)
        {
            var filter = Builders<User>.Filter.Eq(u => u.Email, email);
            return await _usersCollection.Find(filter).AnyAsync();
        }

        public async Task<User?> GetUserByIdentifierAsync(string identifier)
        {
            var filter = Builders<User>.Filter.Or(
                Builders<User>.Filter.Eq(u => u.Email, identifier),
                Builders<User>.Filter.Eq(u => u.Username, identifier)
            );
            return await _usersCollection.Find(filter).FirstOrDefaultAsync();
        }

        public async Task<bool> UsernameExistsAsync(string username)
        {
            var filter = Builders<User>.Filter.Eq(u => u.Username, username);
            return await _usersCollection.Find(filter).AnyAsync();
        }

        public async Task<List<string>> GetAllLikedByUserAsync(string userId)
        {
            var filter = Builders<User>.Filter.Eq(u => u.Id, userId);
            var projection = Builders<User>.Projection.Expression(u => u.LikedProductIds);
            return await _usersCollection.Find(filter).Project(projection).FirstOrDefaultAsync();
        }

        public async Task<List<UserToId>> GetListUsersByIdsAsync(List<string> userIds)
        {
            var filter = Builders<User>.Filter.In(u => u.Id, userIds);
            var projection = Builders<User>.Projection.Expression(u => new UserToId
            {
                Id = u.Id,
                Username = u.Username
            });
            return await _usersCollection.Find(filter).Project(projection).ToListAsync();
        }

        public async Task<List<User>> GetAllUsersAsync()
        {
            return await _usersCollection.Find(_ => true).ToListAsync();
        }
    }
}