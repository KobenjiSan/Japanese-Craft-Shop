namespace API.src.Application.DTOs.Responses
{
    public class ProductResponseDto
    {
        public string Id { get; set; } = string.Empty;

        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; }

        public List<string> ImageUrls { get; set; } = new();
        public string Category { get; set; } = string.Empty;

        public bool IsFeatured { get; set; }
        public int Stock { get; set; }
        
        public DateTime LastUpdated { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}