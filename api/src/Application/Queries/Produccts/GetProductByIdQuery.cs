using API.src.Application.DTOs.Responses;
using MediatR;

namespace API.src.Application.Queries.Products
{
    public class GetProductByIdQuery : IRequest<ProductResponseDto>
    {
        public string ProductId { get; set; } = string.Empty;
    }
}