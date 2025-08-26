using API.src.Application.Common.DTOs.Products;
using API.src.Application.Common.Pagination;
using API.src.Application.Services.Products.Interfaces;
using API.src.Domain;
using DnsClient.Protocol;
using Mapster;
using MediatR;

namespace API.src.Application.Queries.Products.GetAllProducts
{
    public class GetAllProductsHandler : IRequestHandler<GetAllProductsQuery, PaginatedResult<ProductResponseDto>>
    {

        private readonly IProductReadService _readService;

        public GetAllProductsHandler(IProductReadService readService)
        {
            _readService = readService;
        }

        public async Task<PaginatedResult<ProductResponseDto>> Handle(GetAllProductsQuery request, CancellationToken cancellationToken)
        {
            var allProducts = await _readService.GetAllProductsAsync() ?? new List<Product>();

            // search 
            if (!string.IsNullOrWhiteSpace(request.SearchTerm))
            {
                var term = request.SearchTerm.Trim().ToLower();

                allProducts = allProducts.Where(p =>
                    p.Title.ToLower().Contains(term) ||
                    p.Category.ToLower().Contains(term) ||
                    p.Description.ToLower().Contains(term)
                ).ToList();
            }

            // Get by price
            allProducts = allProducts.Where(p => p.Price >= (decimal)request.MinimumPrice && p.Price <= (decimal)request.MaximumPrice).ToList();

            // Get by category
            if (!string.IsNullOrWhiteSpace(request.Category))
            {
                var category = request.Category.Trim().ToLower();
                allProducts = allProducts.Where(p => p.Category.ToLower().Contains(category)).ToList();
            }

            if (request.FilterStock)
                allProducts = allProducts.Where(p => p.Stock < 10).ToList();

            if (request.FilterFeatured)
                allProducts = allProducts.Where(p => p.IsFeatured == true).ToList();

            
            if (request.SortNewest)
                allProducts = allProducts.OrderByDescending(p => p.CreatedAt).ToList();
            
            // TODO: add sort by most popular

            var pagedProducts = allProducts
                .Skip((request.Page - 1) * request.PageSize)
                .Take(request.PageSize)
                .ToList();

            var dtoProducts = pagedProducts.Select(p => p.Adapt<ProductResponseDto>()).ToList();

            return new PaginatedResult<ProductResponseDto>(
                dtoProducts,
                allProducts.Count,
                request.Page,
                request.PageSize
            );
        }
    }
}