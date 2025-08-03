using API.src.Application.Common.Exceptions;
using API.src.Application.DTOs.Queries;
using API.src.Application.Services.Products.Interfaces;
using MediatR;

namespace API.src.Application.Queries.Products
{
    public class GetProductByIdHandler : IRequestHandler<GetProductByIdQuery, ProductResponseDto>
    {
        private readonly IProductReadService _readService;

        public GetProductByIdHandler(IProductReadService readService)
        {
            _readService = readService;
        }

        public async Task<ProductResponseDto> Handle(GetProductByIdQuery request, CancellationToken cancellationToken)
        {
            var product = await _readService.GetProductByIdAsync(request.ProductId);

            if (product == null)
                throw new NotFoundException("Product not found.");

            return new ProductResponseDto
            {
                Id = product.Id,
                Title = product.Title,
                Description = product.Description,
                Price = product.Price,
                ImageUrls = product.ImageUrls,
                Category = product.Category,
                IsFeatured = product.IsFeatured,
                Stock = product.Stock,
                LastUpdated = product.LastUpdated,
                CreatedAt = product.CreatedAt
            };
        }
    }
}