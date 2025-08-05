using API.src.Application.DTOs.Users.Responses;
using MediatR;

namespace API.src.Application.Commands.Users
{
    public class RegisterUserCommand : IRequest<Unit>
    {
        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}