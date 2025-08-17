using MediatR;

namespace API.src.Application.Queries.Products.GetLikedByList
{
    public class GetLikedByListQuery : IRequest<LikedByListResponseDto>
    {
        public string ProductId { get; set; } = string.Empty;
    }
}