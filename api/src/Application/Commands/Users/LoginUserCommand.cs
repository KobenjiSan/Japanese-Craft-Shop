using API.src.Application.DTOs.Users.Responses;
using MediatR;

namespace API.src.Application.Commands.Users
{
    public class LoginUserCommand : IRequest<LoginUserResponseDto>
    {
        public string Identifier { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}