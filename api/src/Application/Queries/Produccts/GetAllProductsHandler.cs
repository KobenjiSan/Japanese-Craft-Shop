using API.src.Application.DTOs.Queries;
using API.src.Application.Services.Products.Interfaces;
using API.src.Domain;
using Mapster;
using MediatR;

namespace API.src.Application.Queries.Products
{
    public class GetAllProductsHandler : IRequestHandler<GetAllProductsQuery, List<ProductResponseDto>>
    {

        private readonly IProductReadService _readService;

        public GetAllProductsHandler(IProductReadService readService)
        {
            _readService = readService;
        }

        public async Task<List<ProductResponseDto>> Handle(GetAllProductsQuery request, CancellationToken cancellationToken)
        {
            var allProducts = await _readService.GetAllProductsAsync() ?? new List<Product>();

            // TODO : add PFS logic here

            return allProducts.Select(p => p.Adapt<ProductResponseDto>()).ToList();
        }
    }
}