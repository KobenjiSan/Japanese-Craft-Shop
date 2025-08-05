using API.src.Application.DTOs.Responses;
using API.src.Application.Services.Products.Interfaces;
using API.src.Domain;
using MediatR;
using Mapster;

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

                        var relativePath = $"http://localhost:5088/uploads/{uniqueFileName}"; // TODO: Fix later
                        imageUrls.Add(relativePath);
                    }
                }
            }

            var newProduct = request.Adapt<Product>();
            newProduct.ImageUrls = imageUrls;
            newProduct.LastUpdated = DateTime.UtcNow;
            newProduct.CreatedAt = DateTime.UtcNow;

            var createdProduct = await _writeService.CreateProductAsync(newProduct);

            // Uses Mapper to auto map createdProduct into a new ProductResponseDto
            return createdProduct.Adapt<ProductResponseDto>();
        }
    }
}