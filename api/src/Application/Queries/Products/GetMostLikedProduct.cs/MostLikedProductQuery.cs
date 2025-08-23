using API.src.Application.Common.DTOs.Products;
using MediatR;

namespace API.src.Application.Queries.Products.GetMostLikedProduct
{
    public class MostLikedProductQuery : IRequest<ProductResponseDto>{}
}