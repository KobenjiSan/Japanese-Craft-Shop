using MediatR;

namespace API.src.Application.Commands.Users.LikedProductUser
{
    public class LikeProductUserCommand : IRequest<LikeProductUserResponseDto>
    {
        public string ProductId { get; set; } = string.Empty;
    }
}