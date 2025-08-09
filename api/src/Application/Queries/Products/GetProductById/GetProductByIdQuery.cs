using API.src.Application.Common.DTOs.Products;
using MediatR;

namespace API.src.Application.Queries.Products.GetProductById
{
    public class GetProductByIdQuery : IRequest<ProductResponseDto>
    {
        public string ProductId { get; set; } = string.Empty;
    }
}