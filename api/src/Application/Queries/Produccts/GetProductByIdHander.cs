using API.src.Application.Common.Exceptions;
using API.src.Application.DTOs.Responses;
using API.src.Application.Services.Products.Interfaces;
using MediatR;
using Mapster;

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

            // Uses Mapper to auto map product into a new ProductResponseDto
            return product.Adapt<ProductResponseDto>();
        }
    }
}