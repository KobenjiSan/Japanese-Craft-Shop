using API.src.Domain;

namespace API.src.Application.Services.Users.Interfaces
{
    public interface IUserWriteService
    {
        Task CreateUserAsync(User user);
    }
}