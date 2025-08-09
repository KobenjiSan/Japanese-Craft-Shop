namespace API.src.Application.Commands.Users.LoginUser
{
    public record LoginUserResponseDto(string Token, DateTime ExpiresAt);
}