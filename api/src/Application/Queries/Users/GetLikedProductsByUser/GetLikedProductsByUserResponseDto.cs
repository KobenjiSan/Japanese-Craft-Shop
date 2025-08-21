using API.src.Application.Common.DTOs.Products;

namespace API.src.Application.Queries.Users.GetLikedProductsByUser
{
    public record GetLikedProductsByUserResponseDto(List<ProductResponseDto> LikedProductObjs);
}