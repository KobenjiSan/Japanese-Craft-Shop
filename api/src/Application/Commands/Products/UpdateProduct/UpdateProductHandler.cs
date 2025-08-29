using API.src.Application.Common.DTOs.Products;
using API.src.Application.Common.Exceptions;
using API.src.Application.Services.Products.Interfaces;
using API.src.Domain;
using Mapster;
using MediatR;

namespace API.src.Application.Commands.Products.UpdateProduct
{
    public class UpdateProductHandler : IRequestHandler<UpdateProductCommand, ProductResponseDto>
    {

        private readonly IProductReadService _productReadService;
        private readonly IProductWriteService _productWriteService;

        public UpdateProductHandler(
            IProductReadService productReadService,
            IProductWriteService productWriteService
        )
        {
            _productReadService = productReadService;
            _productWriteService = productWriteService;
        }

        public async Task<ProductResponseDto> Handle(UpdateProductCommand request, CancellationToken cancellationToken)
        {
            var originalProduct = await _productReadService.GetProductByIdAsync(request.ProductId);
            if (originalProduct == null)
                throw new NotFoundException("No Product Found with Id: " + request.ProductId);

            if (request.Title != null) originalProduct.Title = request.Title;
            if (request.Description != null) originalProduct.Description = request.Description;
            if (request.Price.HasValue) originalProduct.Price = request.Price.Value;
            if (request.Category != null) originalProduct.Category = request.Category;
            if (request.IsFeatured.HasValue) originalProduct.IsFeatured = request.IsFeatured.Value;
            if (request.Stock.HasValue) originalProduct.Stock = request.Stock.Value;

            var removeCount = request.RemoveImageUrls?.Count ?? 0;
            var addCount = request.AddImages?.Count ?? 0;

            if (removeCount > 0 || addCount > 0)
            {
                if (originalProduct.ImageUrls.Count - removeCount + addCount >= 1)
                {
                    var tempList = new List<string>(originalProduct.ImageUrls);
                    if (removeCount > 0)
                    {
                        var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");
                        foreach (var url in request.RemoveImageUrls!)
                        {
                            var fileName = Path.GetFileName(new Uri(url).LocalPath);
                            var filePath = Path.Combine(uploadsFolder, fileName);
                            if (File.Exists(filePath))
                                File.Delete(filePath);
                            tempList.Remove(url);
                        }
                    }
                    if (addCount > 0)
                    {
                        var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");
                        Directory.CreateDirectory(uploadsFolder);
                        foreach (var image in request.AddImages!)
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
                                var relativePath = $"http://localhost:5088/uploads/{uniqueFileName}";
                                tempList.Add(relativePath);
                            }
                        }
                    }
                    originalProduct.ImageUrls = tempList;
                }
                else throw new ArgumentException("At least one image is required");
            }

            await _productWriteService.UpdateProductAsync(originalProduct);

            return originalProduct.Adapt<ProductResponseDto>();
        }
    }
}