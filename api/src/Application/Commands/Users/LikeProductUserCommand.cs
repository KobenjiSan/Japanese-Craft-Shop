using API.src.Application.DTOs.Users.Responses;
using MediatR;

namespace API.src.Application.Commands.Users
{
    public class LikeProductUserCommand : IRequest<LikedProductUserResponseDto>
    {
        public string ProductId { get; set; } = string.Empty;
    }
}