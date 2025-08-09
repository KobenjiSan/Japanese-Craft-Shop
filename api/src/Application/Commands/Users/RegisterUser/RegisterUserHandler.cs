using API.src.Application.Services.Users.Interfaces;
using API.src.Domain;
using Mapster;
using MediatR;

namespace API.src.Application.Commands.Users.RegisterUser
{
    public class RegisterUserHandler : IRequestHandler<RegisterUserCommand, Unit>
    {

        private readonly IUserWriteService _writeService;
        private readonly IUserReadService _readService;

        public RegisterUserHandler(IUserWriteService writeService, IUserReadService readService)
        {
            _writeService = writeService;
            _readService = readService;
        }

        public async Task<Unit> Handle(RegisterUserCommand request, CancellationToken cancellationToken)
        {
            if (request.Username.Contains("@") || request.Username.Length < 3)
                throw new ArgumentException("Username must be at least 3 characters and cannot contain '@'.");

            if (request.Password.Length < 8 || !request.Password.Any(char.IsDigit) || !request.Password.Any(char.IsUpper))
                throw new ArgumentException("Password must be at least 8 characters and include an uppercase letter and a number.");

            if (await _readService.EmailExistsAsync(request.Email) || await _readService.UsernameExistsAsync(request.Username))
                throw new ArgumentException("Email or Username already exists");

            string hashedPassword = BCrypt.Net.BCrypt.HashPassword(request.Password);

            var user = request.Adapt<User>();
            user.PasswordHash = hashedPassword;

            await _writeService.CreateUserAsync(user);

            return Unit.Value;
        }
    }
}