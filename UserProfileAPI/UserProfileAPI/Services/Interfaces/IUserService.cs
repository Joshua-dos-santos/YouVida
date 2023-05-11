using UserProfileAPI.Models;

namespace UserProfileAPI.Services.Interfaces
{
    public interface IUserService
    {
        Task<List<User>> GetUsers();
        Task<User> GetUserById(string userId);
        Task<User> CreateUser(User user);
        Task<User> UpdateUser(User user);
        Task<bool> DeleteUser(string userId);
    }
}
