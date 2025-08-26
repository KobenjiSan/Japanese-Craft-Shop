using API.src.Application.Common.DTOs.Products;
using API.src.Application.Common.Pagination;
using MediatR;

namespace API.src.Application.Queries.Products.GetAllProducts
{
    public class GetAllProductsQuery : IRequest<PaginatedResult<ProductResponseDto>>
    {
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 10;

        public string? Category { get; set; }
        public int MinimumPrice { get; set; } = 0;
        public int MaximumPrice { get; set; } = int.MaxValue;
        public bool SortNewest { get; set; } = false;
        public bool FilterStock { get; set; } = false;
        public bool FilterFeatured { get; set; } = false;

        public string? SearchTerm { get; set; }
    }
}