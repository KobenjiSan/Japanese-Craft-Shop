namespace API.src.Application.Common.DTOs.Users
{
    public record UserResponseDto
    {
        public string UserId { get; set; } = string.Empty;
        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public List<string> LikedProductIds { get; set; } = new();
        public string Role { get; set; } = string.Empty;
    }
}