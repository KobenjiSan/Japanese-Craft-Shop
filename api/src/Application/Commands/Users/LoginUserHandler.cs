using API.src.Application.Common.Authentication;
using API.src.Application.Common.Exceptions;
using API.src.Application.DTOs.Users.Responses;
using API.src.Application.Services.Users.Interfaces;
using MediatR;

namespace API.src.Application.Commands.Users
{
    public class LoginUserHandler : IRequestHandler<LoginUserCommand, LoginUserResponseDto>
    {

        private readonly IUserReadService _readService;
        private readonly JwtTokenGenerator _tokenGenerator;

        public LoginUserHandler(IUserReadService readService, JwtTokenGenerator tokenGenerator)
        {
            _readService = readService;
            _tokenGenerator = tokenGenerator;
        }

        public async Task<LoginUserResponseDto> Handle(LoginUserCommand request, CancellationToken cancellationToken)
        {
            var user = await _readService.GetUserByIdentifierAsync(request.Identifier);
            if (user == null)
                throw new NotFoundException("Invalid credentials.");

            bool passwordMatch = BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash);
            if (!passwordMatch)
                throw new ArgumentException("Invalid password.");

            var (token, expiresAt) = _tokenGenerator.GenerateToken(user);

            return new LoginUserResponseDto
            {
                Token = token,
                ExpiresAt = expiresAt
            };
        }
    }
}