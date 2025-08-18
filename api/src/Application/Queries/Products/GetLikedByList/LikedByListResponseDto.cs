using API.src.Domain;

namespace API.src.Application.Queries.Products.GetLikedByList
{
    public record LikedByListResponseDto(List<UserToId> LikedByUserIds);
}