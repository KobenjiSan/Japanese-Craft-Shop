using System.ComponentModel.DataAnnotations;
using API.src.Application.DTOs.Responses;
using MediatR;

namespace API.src.Application.Commands.Products
{
    public class CreateProductCommand : IRequest<ProductResponseDto>
    {
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;

        [Range(0.01, 9999.99)]
        public decimal Price { get; set; }

        public List<IFormFile> Images { get; set; } = new();
        public string Category { get; set; } = string.Empty;
        public bool IsFeatured { get; set; } = false; // Default
        public int Stock { get; set; }
    }
}