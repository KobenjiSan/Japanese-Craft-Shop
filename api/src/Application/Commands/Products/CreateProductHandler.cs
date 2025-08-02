using API.src.Application.DTOs.Queries;
using API.src.Application.Services.Products.Interfaces;
using API.src.Domain;
using MediatR;

namespace API.src.Application.Commands.Products
{
    public class CreateProductHandler : IRequestHandler<CreateProductCommand, ProductResponseDto>
    {
        private readonly IProductWriteService _writeService;

        public CreateProductHandler(
            IProductWriteService writeService
        )
        {
            _writeService = writeService;
        }

        public async Task<ProductResponseDto> Handle(CreateProductCommand request, CancellationToken cancellationToken)
        {
            // TODO : implement image check and upload
            List<string> imageUrls = new(); // temp

            // TODO : add automapper
            var newProduct = new Product
            {
                Title = request.Title,
                Description = request.Description,
                Price = request.Price,
                ImageUrls = imageUrls,  // TODO : fix
                Category = request.Category,
                IsFeatured = request.IsFeatured,
                Stock = request.Stock,
                LastUpdated = DateTime.UtcNow,
                CreatedAt = DateTime.UtcNow
            };

            var createdProduct = await _writeService.CreateProductAsync(newProduct);

            return new ProductResponseDto
            {
                Id = createdProduct.Id,
                Title = createdProduct.Title,
                Description = createdProduct.Description,
                Price = createdProduct.Price,
                ImageUrls = createdProduct.ImageUrls,
                Category = createdProduct.Category,
                IsFeatured = createdProduct.IsFeatured,
                Stock = createdProduct.Stock,
                LastUpdated = createdProduct.LastUpdated,
                CreatedAt = createdProduct.CreatedAt
            };
        }
    }
}