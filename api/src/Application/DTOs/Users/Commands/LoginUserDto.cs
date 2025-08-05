namespace API.src.Application.DTOs.Users.Commands
{
    public class LoginUserDto
    {
        public string Identifier { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}