using API.src.Application.DTOs.Queries;
using MediatR;

namespace API.src.Application.Queries.Products
{
    public class GetProductByIdQuery : IRequest<ProductResponseDto>
    {
        public string ProductId { get; set; } = string.Empty;
    }
}