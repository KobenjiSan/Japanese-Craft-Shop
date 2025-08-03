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

            if (request.Images is null || !request.Images.Any())
                throw new ArgumentException("At least one image is required");

            List<string> imageUrls = new();

            if (request.Images != null && request.Images.Any())
            {
                var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");
                Directory.CreateDirectory(uploadsFolder);

                foreach (var image in request.Images)
                {
                    if (image.Length > 0)
                    {
                        var extension = Path.GetExtension(image.FileName);
                        var uniqueFileName = $"{Guid.NewGuid()}{extension}";
                        var filePath = Path.Combine(uploadsFolder, uniqueFileName);

                        using (var stream = new FileStream(filePath, FileMode.Create))
                        {
                            await image.CopyToAsync(stream);
                        }

                        var relativePath = $"/uploads/{uniqueFileName}";
                        imageUrls.Add(relativePath);
                    }
                }
            }

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