namespace API.src.Application.DTOs.Users.Responses
{
    public class LoginUserResponseDto
    {
        public string Token { get; set; } = string.Empty;
        public DateTime ExpiresAt { get; set; }     // NOTE: Used for auto refresh later
    }
}