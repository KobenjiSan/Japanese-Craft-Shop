namespace API.src.Application.Common.DTOs.Products
{
    public record ProductResponseDto
    {
        public string Id { get; init; } = string.Empty;

        public string Title { get; init; } = string.Empty;
        public string Description { get; init; } = string.Empty;
        public decimal Price { get; init; }

        public List<string> ImageUrls { get; init; } = new();
        public string Category { get; init; } = string.Empty;

        public bool IsFeatured { get; init; }
        public int Stock { get; init; }
        
        public DateTime LastUpdated { get; init; }
        public DateTime CreatedAt { get; init; }
    }
}