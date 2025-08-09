using MediatR;

namespace API.src.Application.Commands.Users.LoginUser
{
    public class LoginUserCommand : IRequest<LoginUserResponseDto>
    {
        public string Identifier { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}