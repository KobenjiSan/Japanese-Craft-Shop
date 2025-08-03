using API.src.Application.DTOs.Queries;
using MediatR;

namespace API.src.Application.Queries.Products
{
    public class GetAllProductsQuery : IRequest<List<ProductResponseDto>>
    {
        
    }
}