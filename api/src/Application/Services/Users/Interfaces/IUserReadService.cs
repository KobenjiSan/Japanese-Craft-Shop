using API.src.Domain;

namespace API.src.Application.Services.Users.Interfaces
{
    public interface IUserReadService
    {
        Task<bool> EmailExistsAsync(string email);
        Task<User?> GetUserByIdentifierAsync(string identifier);
        Task<bool> UsernameExistsAsync(string username);
        Task<List<string>> GetAllLikedByUserAsync(string userId);
    }
}