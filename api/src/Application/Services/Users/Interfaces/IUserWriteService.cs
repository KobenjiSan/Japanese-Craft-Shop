using API.src.Domain;

namespace API.src.Application.Services.Users.Interfaces
{
    public interface IUserWriteService
    {
        Task CreateUserAsync(User user);
        Task RemoveProductFromAllUsers(string productId);
        Task<bool> ToggleLikeProductAsync(string userId, string productId);
        Task UnlikeProductAsync(string userId, string productId);
    }
}