using MediatR;

namespace API.src.Application.Commands.Users.RegisterUser
{
    public class RegisterUserCommand : IRequest<Unit>
    {
        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}