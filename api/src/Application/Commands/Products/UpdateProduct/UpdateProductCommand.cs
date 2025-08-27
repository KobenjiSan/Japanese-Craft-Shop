using System.ComponentModel.DataAnnotations;
using MediatR;

namespace API.src.Application.Commands.Products.UpdateProduct
{
    public class UpdateProductCommand : IRequest<Unit>
    {
        [Required]
        public string ProductId { get; set; } = string.Empty;

        public string? Title { get; init; }
        public string? Description { get; init; }
        [Range(0.01, 9999.99)]
        public decimal? Price { get; init; }
        public List<IFormFile>? AddImages { get; init; }
        public List<string>? RemoveImageUrls { get; init; }
        public string? Category { get; init; }
        public bool? IsFeatured { get; init; }
        [Range(1, 9999)]
        public int? Stock { get; init; }
    }
}