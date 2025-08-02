using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace API.src.Domain
{
    public class Product
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = string.Empty;
        
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; }

        public List<string> ImageUrls { get; set; } = new();
        public string Category { get; set; } = string.Empty;
        public List<string> LikedByUserIds { get; set; } = new();

        public bool IsFeatured { get; set; }
        public int Stock { get; set; }

        public DateTime LastUpdated { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}