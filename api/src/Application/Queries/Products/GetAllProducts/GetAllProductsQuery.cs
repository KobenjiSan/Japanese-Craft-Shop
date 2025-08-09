using API.src.Application.Common.DTOs.Products;
using MediatR;

namespace API.src.Application.Queries.Products.GetAllProducts
{
    public class GetAllProductsQuery : IRequest<List<ProductResponseDto>>
    {
        
    }
}