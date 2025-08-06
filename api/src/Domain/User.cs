using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace API.src.Domain
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = string.Empty;

        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;

        public List<string> LikedProductIds { get; set; } = new();
    }
}