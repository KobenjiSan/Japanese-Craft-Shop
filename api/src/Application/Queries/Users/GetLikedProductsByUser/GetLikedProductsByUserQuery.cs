using MediatR;

namespace API.src.Application.Queries.Users.GetLikedProductsByUser
{
    public class GetLikedProductsByUserQuery : IRequest<GetLikedProductsByUserResponseDto>
    {
        public string? UserId { get; set; }
    }
}